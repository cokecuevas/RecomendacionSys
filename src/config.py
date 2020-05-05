import os
import time
from datetime import timedelta
#from sqlalchemy.dialects.mssql import pymssql
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    # ...
    DATABASE = 'RecomendacionDb'
    PASSWORD = '123'
    USER = 'user_api'
    HOSTNAME = 'db-recomendacion'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://%s:%s@%s/%s'%(USER, PASSWORD, HOSTNAME, DATABASE)
    #SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://user_api:123@db/UserDb'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True
    SECRET_KEY = 'p9Bv<3Eid9%$i01'
    
    JWT_SECRET_KEY = 'p9Bv<3Mid9%$i02'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']

    REDIS_HOST = os.getenv('REDIS_HOST', 'redis')
    REDIS_PORT = os.getenv('REDIS_PORT', 6379)
    REDIS_DB = os.getenv('REDIS_DB', 0)
    ERROR_INCLUDE_MESSAGE = False
    