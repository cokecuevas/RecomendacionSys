from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
import pymysql
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from redis import StrictRedis

pymysql.install_as_MySQLdb()

app = Flask(__name__)
app.config.from_object(Config)
app.debug = True
db = SQLAlchemy(app)
jwt = JWTManager(app)

#Redis DB object
redis_store = StrictRedis(host=app.config['REDIS_HOST'],
                          port=app.config['REDIS_PORT'],
                          db=app.config['REDIS_DB'],
                          decode_responses=True)

from app.routes import user,item
from app.models import user,item
