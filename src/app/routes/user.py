from app import app, db, redis_store
from ..models.user import User, UserSchema
from ..models.rated import Rated, RatedSchema
from ..models.item import Item, ItemSchema, ItemSchemaOnlyMovie
from ..models.type_item_ratio import TypeItemRatio, TypeItemRatioSchema
from ..models.user_type import UserType, UserTypeSchema, UserTypeSchemaId
import uuid
import datetime
from flask import Flask, jsonify, request, json
from flask_cors import CORS
from ..helpers.utils import Utils
from sqlalchemy import and_
from datetime import date
from passlib.hash import sha256_crypt
import operator
from sqlalchemy import text
import random
from itertools import groupby
from flask_jwt_extended import create_access_token, create_refresh_token, get_jti, jwt_required, get_raw_jwt, decode_token
from collections import Counter
import itertools

CORS(app)


@app.route('/login', methods=['POST'])
def userLogin():
    if not request.json or not 'Email' in request.json or not 'Password' in request.json:
        return jsonify({"Message": "Please complete all the information"}), 400
    email, password = request.get_json()['Email'].lower(), request.get_json()[
        'Password'].lower()
    user = User.query.filter_by(Email=email).first()
    if user:
        if sha256_crypt.verify(password, user.Password):
            access_token = create_access_token(
                identity={'Email': user.Email, 'Id': user.Id})
            refresh_token = create_refresh_token(
                identity={'Email': user.Email, 'Id': user.Id})
            access_jti = get_jti(encoded_token=access_token)
            refresh_jti = get_jti(encoded_token=refresh_token)
            redis_store.set(access_jti, 'false',
                            app.config['JWT_ACCESS_TOKEN_EXPIRES'])
            redis_store.set(refresh_jti, 'false',
                            app.config['JWT_REFRESH_TOKEN_EXPIRES'])
            return {'access_token': access_token, 'refresh_token': refresh_token}
        else:
            return jsonify({"Message": "Invalid username and password"}), 400
    else:
        return jsonify({"Message": "Email does not exist"}), 400


@app.route('/user/register', methods=['POST'])
def userRegister():
    if not 'Password' in request.json or not 'Email' in request.json or not 'Age' in request.json or not 'Gender' in request.json or not 'Occupation' in request.json or not 'Preferences' in request.json:
        return jsonify({"Message": "Please complete all the information"}), 400
    age = request.get_json()['Age']
    gender = request.get_json()['Gender']
    occupation = request.get_json()['Occupation']
    email = request.get_json()['Email']
    preferences_user = request.get_json()['Preferences']
    preferences = json.loads(
        '{"Unknown":0,"Action":0,"Adventure":0,"Animation":0,"Children":0,"Comedy":0,"Crime":0,"Documentary":0,"Drama":0,"Fantasy":0,"Film_Noir":0,"Horror":0,"Musical":0,"Mystery":0,"Romance":0,"SciFi":0,"Thriller":0,"War":0,"Western":0}')
    for r in preferences_user:
        preferences[r['value']] = random.randint(50, 100)
    preferences = json.dumps(preferences, sort_keys=True)
    password = sha256_crypt.encrypt(request.get_json()['Password'])
    user = User.query.filter_by(Email=email).first()
    if user:
        return jsonify({"Message": "Email is already registred"}), 400
    user_type_id = calcularUserType(age, gender, occupation)
    print(user_type_id)
    user = User(Id=None,
                Age=age,
                Gender=gender,
                Occupation=occupation,
                Password=password,
                Email=email,
                Preferences=preferences,
                User_type_id=user_type_id
                )
    db.session.add(user)
    db.session.commit()
    user = User.query.filter_by(Email=email).first()
    user = UserSchema().dump(user)
    return jsonify({"Message": "User has been creted", 'Data': user})


@app.route('/user/<user_id>', methods=['GET'])
def getProfile(user_id):
    if not user_id:
        return jsonify({"Message": "It is necessary a User Id"}), 400
    user = User.query.filter_by(Id=user_id).first()
    if not user:
        return jsonify({"Message": "User doesn't have profile"}), 400
    # DEMOGRAFICO
    #rated = Rated.query.filter(Rated.Id_user.in_((user_id))).all()
    limit = 30
    print(user.User_type_id)
    query = db.session.execute("SELECT Id_item,Ratio FROM Type_item_ratio where User_type_id = " +
                               str(user.User_type_id)+" order by Ratio desc limit "+str(limit))
    items_id = query.fetchall()
    items_demografico = []
    for x in items_id:
        print(x)
        item = Item.query.filter_by(Id=x[0]).first()
        item.Ratio = x[1]
        item = ItemSchemaOnlyMovie().dump(item)
        items_demografico.append(item)
    # COLABORATIVO
    if request.json and 'Ratio' in request.json:
        diff_ratio = request.get_json()['Ratio']
    else:
        diff_ratio = 30
    if request.json and 'Simulitud' in request.json:
        sim_minima = request.get_json()['Simulitud']
    else:
        sim_minima = 3
    items_id, neighborns = colaborativo(user_id, diff_ratio, sim_minima)
    items_colaborativo = []
    for x in items_id[0:limit]:
        item = Item.query.filter_by(Id=x[0]).first()
        item.Ratio = x[1]
        item = ItemSchemaOnlyMovie().dump(item)
        items_colaborativo.append(item)

    # MIXTO
    rate = []
    for i in range(0, len(items_colaborativo)):
        rate.append((items_colaborativo[i], limit-i))
    for i in range(0, len(items_demografico)):
        rate.append((items_demografico[i], limit-i))
    items_mix = sorted(rate, key=lambda tup: tup[1], reverse=True)
    # tengo ids
    ids_tuple = [(item[0]["Id"], item[1]) for item in items_mix]
    ids = [(item[0]["Id"]) for item in items_mix]
    # los cuento
    c = Counter(ids)
    # elimino duplicados
    seen = set()
    ids = [(a, b) for a, b in ids_tuple if not (a in seen or seen.add(a))]
    # sumo
    for id in c:
        for i in range(0, len(ids)):
            if ids[i][0] == id and c[id] > 1:
                ids[i] = (id, ids[i][1]+c[id])

    ids = sorted(ids, key=lambda tup: tup[1], reverse=True)
    items_mixed = []
    for item in items_mix:
        for count in ids:
            if item[0]["Id"] == count[0]:
                items_mixed.append((item[0], count[1]))
    items_mixed = sorted(items_mixed, key=lambda tup: tup[1], reverse=True)
    items_mixed = [item[0] for item in items_mixed]
    if len(items_colaborativo) < 1:
        items_colaborativo = famous(limit)
    user_response = {
        "Age": user.Age,
        "Gender": user.Gender,
        "Occupation": user.Occupation,
        "Items_demografico": items_demografico,
        "Items_colaborativo": items_colaborativo,
        "Items_mixed": items_mixed,
        "Demographic_preference": user.Preferences,
    }
    return jsonify({"Message": "Profile was found", 'Data': user_response})


'''@app.route('/user/<user_id>/preferences/', methods=['GET'])
def createPreferences(user_id):
    if not user_id:
        return jsonify({"Message":"It is necessary a User Id"}),400
    num_prefences = 9
    users = User.query.all()
    f = open("Preferences.txt", "a")
    for user in users:
        preferences = json.loads('{"Unknown":0,"Action":0,"Adventure":0,"Animation":0,"Children":0,"Comedy":0,"Crime":0,"Documentary":0,"Drama":0,"Fantasy":0,"Film_Noir":0,"Horror":0,"Musical":0,"Mystery":0,"Romance":0,"SciFi":0,"Thriller":0,"War":0,"Western":0}')
        preference_tuples = tuple(preferences.items())
        for i in range(0,num_prefences):
            x = random.randint(0, 18)
            preferences[preference_tuples[x][0]] = random.randint(0, 100)
        f.write(str(preferences)+"\n")
    f.close()
    return jsonify({"Message":"Profile was found",'Data':"coucou"})
    '''




def colaborativo(user_id, diff_ratio, sim_minima):
    if not user_id:
        return jsonify({"Message": "It is necessary a User Id"}), 400
    # vecinos con diferencia menor de 30 por cada categorías
    # tupla(vecino,afinidad)
    neighborns = Utils.calcularAfinidad(user_id, diff_ratio, sim_minima)
    # traer todas las peliculas de los vecinos entre 4 y 5 de puntuación
    items_rated = []
    items_total = []
    for neighborn in neighborns:
        item_rated = Rated.query.filter(
            and_(Rated.Id_user == neighborn.Id, Rated.Rating > 3)).all()
        for item in item_rated:
            items_total.append(item)
            if item not in items_rated:
                # se tiene neighborns, items vistos por el vecino (items_rated)
                # OK calcular ratio de peliculas
                item.Ratio_colaborativo = neighborn.Similitud*0.6 + \
                    item.Rating*0.2  # + cuantos vecinos vieron la peli
                items_rated.append(item)
    items_total = [x.Id_item for x in items_total]
    items_total = [
        {"Id": x, "Counter": items_total.count(x)} for x in set(items_total)]
    # Eliminar peliculas que ya vi
    items_vistos = Rated.query.filter(Rated.Id_user == user_id).all()
    recomendacion = []
    for item in items_rated:
        if item not in items_vistos:
            recomendacion.append(item)
    # OK ¿Cuanto vecinos han recomendado la película?
    for item in recomendacion:
        item.Ratio_colaborativo = 0.2 * \
            int(list(filter(lambda x: x['Id'] == item.Id_item, items_total))[
                0]['Counter']) + item.Ratio_colaborativo
    # OK ordeno por ratio de películas
    recomendacion = [(x.Id_item, x.Ratio_colaborativo) for x in recomendacion]
    recomendacion = sorted(recomendacion, key=lambda tup: tup[1], reverse=True)
    return recomendacion, neighborns
    # return jsonify({"Message":"Profile was found",'Data':"coucou"})


def famous(limit):
    query = db.session.execute(
        "select Id_item,avg(Rating) as 'promedio' from Rated group by Id_item order by promedio desc limit "+str(limit))
    items_id = query.fetchall()
    best_items = []
    for x in items_id:
        item = Item.query.filter_by(Id=x[0]).first()
        item.Ratio = x[1]
        item = ItemSchemaOnlyMovie().dump(item)
        best_items.append(item)
    return best_items


def calcularUserType(age, gender, occupation):
    age = int(age)
    accion = ["programmer", "technician", "executive",
            "homemaker", "retired", "salesman"]
    ciencia = ["administrator", "doctor", "marketing", "student", "none"]
    geek = ["scientist", "engineer", "healthcare", "other"]
    letters = ["educator", "artist", "lawyer",
            "librarian", "writer", "entertainment"]
    if age < 12:
        return 1
    if age >= 13 and age <= 18:
        return 2
    if age >= 18 and age <= 100 and occupation in accion:
        return 3
    if age >= 18 and occupation in ciencia:
        return 4
    if age >= 16 and occupation in geek:
        return 5
    if age >= 15 and occupation in letters:
        return 6


@app.route('/user/ratios/', methods=['POST'])
def createPreferences():
    Utils.calculateRatio(1,{"Unknown":0,"Action":0,"Adventure":0,"Animation":100,"Children":100,"Comedy":0,"Crime":0,"Documentary":0,"Drama":0,"Fantasy":0,"Film_Noir":0,"Horror":0,"Musical":0,"Mystery":0,"Romance":0,"SciFi":0,"Thriller":0,"War":0,"Western":0})
    return jsonify({"Message":"Profile was found",'Data':"coucou"})
    
