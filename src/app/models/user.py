from app import db
import uuid,json
from datetime import datetime
from sqlalchemy.sql import expression
from marshmallow import Schema,fields

class User(db.Model):
    
    __tablename__ = 'User'
    Id = db.Column(db.Integer, primary_key=True,nullable=True)
    Age = db.Column(db.Integer)
    Gender = db.Column(db.String(1))
    Occupation = db.Column(db.String(1000))
    Email = db.Column(db.String(1000))
    Password = db.Column(db.String(1000))
    User_type_id = db.Column(db.Integer)
    Preferences = db.Column(db.JSON())

    def __repr__(self):
        return 'User< Id: {}, Age: {},Occupation: {}, User_type_id: {}, Preferences: {}>'.format(self.Id,self.Age,self.Occupation,self.User_type_id,self.Preferences)

class UserSchema(Schema):
    Id = fields.Integer()
    Age = fields.Integer()
    Gender = fields.Str()
    Occupation = fields.Str()
    Email = fields.Str()
    User_type_id = fields.Integer()
    Preferences = fields.Str()