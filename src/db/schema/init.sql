CREATE DATABASE RecomendacionDb;
use RecomendacionDb;

CREATE USER 'user_api'@'localhost' IDENTIFIED WITH mysql_native_password BY '123';
GRANT ALL PRIVILEGES ON *.* TO 'user_api'@'localhost' WITH GRANT OPTION;
CREATE USER 'user_api'@'%' IDENTIFIED WITH mysql_native_password BY '123';
GRANT ALL PRIVILEGES ON *.* TO 'user_api'@'%' WITH GRANT OPTION;

CREATE TABLE IF NOT EXISTS `Genre` (
  `Id` INTEGER NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC))
  ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

  CREATE TABLE IF NOT EXISTS `Item` (
  `Id` INTEGER NOT NULL,
  `Unknown` INTEGER NOT NULL,
  `Action` INTEGER NOT NULL,
  `Adventure` INTEGER NOT NULL,
  `Animation` INTEGER NOT NULL,
  `Children` INTEGER NOT NULL,
  `Comedy` INTEGER NOT NULL,
  `Crime` INTEGER NOT NULL,
  `Documentary` INTEGER NOT NULL,
  `Drama` INTEGER NOT NULL,
  `Fantasy` INTEGER NOT NULL,
  `Film_Noir` INTEGER NOT NULL,
  `Horror` INTEGER NOT NULL,
  `Musical` INTEGER NOT NULL,
  `Mystery` INTEGER NOT NULL,
  `Romance` INTEGER NOT NULL,
  `SciFi` INTEGER NOT NULL,
  `Thriller` INTEGER NOT NULL,
  `War` INTEGER NOT NULL,
  `Western` INTEGER NOT NULL,
  `Movie` VARCHAR(1000) NOT NULL,
  `Image` VARCHAR(1000),
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC))
  ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE IF NOT EXISTS `User_type` (
  `Id` INTEGER NOT NULL AUTO_INCREMENT,
  `Description` VARCHAR(1000),
  `Unknown` INTEGER NOT NULL,
  `Action` INTEGER NOT NULL,
  `Adventure` INTEGER NOT NULL,
  `Animation` INTEGER NOT NULL,
  `Children` INTEGER NOT NULL,
  `Comedy` INTEGER NOT NULL,
  `Crime` INTEGER NOT NULL,
  `Documentary` INTEGER NOT NULL,
  `Drama` INTEGER NOT NULL,
  `Fantasy` INTEGER NOT NULL,
  `Film_Noir` INTEGER NOT NULL,
  `Horror` INTEGER NOT NULL,
  `Musical` INTEGER NOT NULL,
  `Mystery` INTEGER NOT NULL,
  `Romance` INTEGER NOT NULL,
  `SciFi` INTEGER NOT NULL,
  `Thriller` INTEGER NOT NULL,
  `War` INTEGER NOT NULL,
  `Western` INTEGER NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC))
  ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
  
CREATE TABLE IF NOT EXISTS `User` (
  `Id` INTEGER NOT NULL AUTO_INCREMENT,
  `Age` INTEGER NOT NULL,
  `Gender` VARCHAR(1) NOT NULL,
  `Occupation` VARCHAR(1000) NOT NULL,
  `Email` VARCHAR(89) NOT NULL,
  `Password` VARCHAR(500) NOT NULL,
  `User_type_id` INTEGER NOT NULL,
  `Preferences` JSON NOT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `fk_User_type_id`
    FOREIGN KEY (`User_type_id`)
    REFERENCES `User_type` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC))
  ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

  CREATE TABLE IF NOT EXISTS `Rated` (
  `Id` int(11) NOT NULL,
  `Id_user` int(11) NOT NULL,
  `Id_item` int(11) NOT NULL,
  `Rating` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC),
  CONSTRAINT `fk_Id_user`
    FOREIGN KEY (`Id_user`)
    REFERENCES `User` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_Id_item`
    FOREIGN KEY (`Id_item`)
    REFERENCES `Item` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

  CREATE TABLE IF NOT EXISTS `Type_item_ratio` (
  `Id` INTEGER NOT NULL AUTO_INCREMENT,
  `User_type_id` INTEGER NOT NULL,
  `Id_item` INTEGER NOT NULL,
  `Ratio` FLOAT NOT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `fk_User_type_id2`
    FOREIGN KEY (`User_type_id`)
    REFERENCES `User_type` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Id_item2`
    FOREIGN KEY (`Id_item`)
    REFERENCES `Item` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC))
  ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

  

  INSERT INTO User_type
  (Id, Description,Unknown,Action,Adventure,Animation,Children,Comedy,Crime,Documentary,Drama,Fantasy,Film_Noir,Horror,Musical,Mystery,Romance,SciFi,Thriller,War,Western)
  VALUES
  (NULL, 'Infantil','0','0','0','100','100','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
  (NULL, 'Adolescentes','0','0','100','80','0','0','0','70','70','80','0','0','90','60','70','0','0','0','0'),
  (NULL, 'Accion','0','100','70','0','0','0','100','0','60','0','0','0','0','0','0','0','0','100','90'),
  (NULL, 'Ficcion','0','60','70','0','0','0','50','0','0','80','0','0','0','0','0','0','0','0','0'),
  (NULL, 'Geek','60','0','0','70','0','70','70','100','0','80','0','0','0','100','0','0','0','0','0'),
  (NULL, 'Letters','0','0','0','0','0','90','0','100','90','0','0','70','80','70','100','0','0','70','0');
  

LOAD DATA INFILE '/docker-entrypoint-initdb.d/users.txt' INTO table User;
LOAD DATA INFILE '/docker-entrypoint-initdb.d/genre.txt' INTO table Genre;
LOAD DATA INFILE '/docker-entrypoint-initdb.d/items.txt' INTO table Item;
LOAD DATA INFILE '/docker-entrypoint-initdb.d/u1_base.txt' INTO table Rated;

source /docker-entrypoint-initdb.d/insert_type_1
source /docker-entrypoint-initdb.d/insert_type_2
source /docker-entrypoint-initdb.d/insert_type_3
source /docker-entrypoint-initdb.d/insert_type_4
source /docker-entrypoint-initdb.d/insert_type_5
source /docker-entrypoint-initdb.d/insert_type_6


GRANT ALL ON *.* TO 'user_api'@'%' ;



FLUSH PRIVILEGES;