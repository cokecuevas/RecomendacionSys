from app import db
import uuid,json
from datetime import datetime
from sqlalchemy.sql import expression
from marshmallow import Schema,fields

class TypeItemRatio(db.Model):
    
    __tablename__ = 'Type_item_ratio'
    Id = db.Column(db.Integer, primary_key=True)
    User_type_id = db.Column(db.Integer)
    Id_item = db.Column(db.Integer)
    Ratio = db.Column(db.Integer)

    def __repr__(self):
        return 'Ratio< Id: {},User_type_id: {}, Id_item: {}, Ratio: {}>'.format(self.Id,self.User_type_id,self.Id_item,self.Ratio)

class TypeItemRatioSchema(Schema):
    Id = fields.Integer()
    User_type_id = fields.Integer()
    Id_item = fields.Integer()
    Ratio = fields.Integer()