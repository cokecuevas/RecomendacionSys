from app import app,db
from  ..models.item import Item, ItemSchema
from ..models.rated import Rated, RatedSchema
from flask import Flask, jsonify, request, json
from flask_cors import CORS
from sqlalchemy import and_
CORS(app)

@app.route('/item/<item_id>', methods=['GET'])
def getItem(item_id):
    if not item_id:
        return jsonify({"Message":"It is necessary a Item Id"}),400
    item = Item.query.filter_by(Id=item_id).first()
    if not item:
        return jsonify({"Message":"Item doesn't exist"}),400
    item=ItemSchema().dump(item)
    return jsonify({"Message":"Item was found",'Data':item})

@app.route('/user/<user_id>/item/', methods=['GET'])
def getHistory(user_id):
    if not user_id:
        return jsonify({"Message":"It is necessary a User Id"}),400
    rated = Rated.query.filter(Rated.Id_user.in_((user_id))).all()
    print(len(rated))
    if not rated:
        return jsonify({"Message":"User doesn't have movies"}),400
    rated=RatedSchema(many=True).dump(rated)
    return jsonify({"Message":"Items were found",'Data':rated})