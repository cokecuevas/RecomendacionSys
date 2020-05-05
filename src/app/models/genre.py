from app import db
import uuid,json
from datetime import datetime
from sqlalchemy.sql import expression
from marshmallow import Schema,fields

class Genre(db.Model):
    
    __tablename__ = 'Genre'
    Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(45))

    def __repr__(self):
        return 'Genre< Id: {}, Name: {}>'.format(self.Id,self.Name)

class GenreSchema(Schema):
    Id = fields.Integer()
    Name = fields.Str()