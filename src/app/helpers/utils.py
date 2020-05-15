from app import app,db
from flask import jsonify
import json,jwt
from collections import namedtuple
from  ..models.rated import Rated, RatedSchema
from  ..models.user import User, UserSchema
import ast 

class Utils:
    def calculateRatio(user_type_id,vector_demografico):
        query_and = ""
        for w in sorted(vector_demografico, key=vector_demografico.get, reverse=True):
            if vector_demografico[w] > 0 and w != "Id":
                query_and = query_and + w +' = 1 OR ' 
        query_and = query_and[:len(query_and)-3]
        query = 'SELECT * FROM Item WHERE '+query_and
        query = db.session.execute(query)
        items = query.fetchall()
        vector_demografico_values = [int(vector_demografico[w]) for w in vector_demografico]
        f = open("insert_type_"+str(user_type_id)+".txt", "a")
        for item in items:
            rate = sum([x*y for x,y in zip(vector_demografico_values,item[1:20])])
            rate = rate*0.8 + Utils.getMovieRate(item[0])*0.2
            query = "INSERT INTO Type_item_ratio (Id, User_type_id,Id_item,Ratio) VALUES (NULL,"+str(user_type_id)+","+str(item.Id)+","+str(rate)+");"
            f.write(str(query)+"\n")
        f.close()
        return 0
    def jsonToObject(data,objectName):
        return json.loads(data, object_hook=lambda d: namedtuple(objectName, d.keys())(*d.values()))

    def getMovieRate(movieId):
        movies = Rated.query.filter_by(Id_item=movieId).all()
        if len(movies) > 0:
            return sum(c.Rating for c in movies)/len(movies)
        return 0

    def calcularAfinidad(user_id,diff_ratio,sim_minima):
        users = User.query.all()
        user = User.query.filter_by(Id=user_id).first()
        vector_user = user.Preferences
        vector_user = ast.literal_eval(vector_user)
        neighborns = []
        for user in users:
            vector=ast.literal_eval(user.Preferences)
            similitud = 0
            for preference in vector_user:
                if vector_user[preference] > 0 and vector[preference] > 0:
                    diference = abs(int(vector_user[preference])-int(vector[preference]))
                    if diference <= diff_ratio:
                        similitud = similitud + 1
            if similitud > sim_minima:
                user.Similitud=similitud
                neighborns.append(user)
        return neighborns

                
