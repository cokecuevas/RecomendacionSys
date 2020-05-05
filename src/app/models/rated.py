from app import db
import uuid,json
from datetime import datetime
from sqlalchemy.sql import expression
from marshmallow import Schema,fields

class Rated(db.Model):
    
    __tablename__ = 'Rated'
    Id = db.Column(db.Integer, primary_key=True)
    Id_user = db.Column(db.Integer)
    Id_item = db.Column(db.Integer)
    Rating = db.Column(db.Integer)

    def __repr__(self):
        return 'Rated< Id_user: {},Id_Item: {}, Rating: {}>'.format(self.Id_user,self.Id_item,self.Rating)
    def __eq__(self, other):
        if self.Id_item == other.Id_item:
            return True
        return False

class RatedSchema(Schema):
    Id = fields.Integer()
    Id_user = fields.Integer()
    Id_item = fields.Integer()
    Rating = fields.Integer()