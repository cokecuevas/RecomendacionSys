from app import app
import requests,json
from functools import wraps
from flask import abort,request,jsonify
from flask_jwt_extended import (decode_token)

def authorize(f):
    @wraps(f)
    def decorated_function(*args, **kws):
        if not 'Authorization' in request.headers:
            return jsonify({"Message":"Token is expected"}),401
        token = request.headers['Authorization']
        headers = {'Content-Type':'application/json','Authorization':token}
        responseStatus = requests.request('GET', app.config.get("AUTH_URL"), headers = headers)
        response = json.loads(responseStatus.text)
        if responseStatus.status_code is not 200 or 'Id' not in response or not response["Id"]:
            return jsonify({"Message":"Token does not valid"}), 401
        return f(*args, **kws) 
    return decorated_function