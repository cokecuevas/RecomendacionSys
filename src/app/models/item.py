from app import db
import uuid,json
from datetime import datetime
from sqlalchemy.sql import expression
from marshmallow import Schema,fields

class Item(db.Model):
    
    __tablename__ = 'Item'
    Id = db.Column(db.Integer, primary_key=True)
    Unknown = db.Column(db.Integer())
    Action = db.Column(db.Integer())
    Adventure = db.Column(db.Integer())
    Animation = db.Column(db.Integer())
    Children = db.Column(db.Integer())
    Comedy = db.Column(db.Integer())
    Crime = db.Column(db.Integer())
    Documentary = db.Column(db.Integer())
    Drama = db.Column(db.Integer())
    Fantasy = db.Column(db.Integer())
    Film_Noir = db.Column(db.Integer())
    Horror = db.Column(db.Integer())
    Musical = db.Column(db.Integer())
    Mystery = db.Column(db.Integer())
    Romance = db.Column(db.Integer())
    SciFi = db.Column(db.Integer())
    Thriller = db.Column(db.Integer())
    War = db.Column(db.Integer())
    Western = db.Column(db.Integer())
    Movie = db.Column(db.String())
    Image = db.Column(db.String())
    Ratio = str()

class ItemSchema(Schema):
    Id = fields.Integer()
    Unknown = fields.Integer()
    Action = fields.Integer()
    Adventure = fields.Integer()
    Animation = fields.Integer()
    Children = fields.Integer()
    Comedy = fields.Integer()
    Crime = fields.Integer()
    Documentary = fields.Integer()
    Drama = fields.Integer()
    Fantasy = fields.Integer()
    Film_Noir = fields.Integer()
    Horror = fields.Integer()
    Musical = fields.Integer()
    Mystery = fields.Integer()
    Romance = fields.Integer()
    SciFi = fields.Integer()
    Thriller = fields.Integer()
    War = fields.Integer()
    Western = fields.Integer()
    Movie = fields.Str()

class ItemSchemaOnlyMovie(Schema):
    Id = fields.Integer()
    Movie = fields.Str()
    Image = fields.Str()
    Ratio = fields.Str()