from app import app
import requests,json
from flask import request,jsonify
from ..helpers.utils import Utils

def teams_validation(token,teamIds):
        headers = {'Content-Type':'application/json','Authorization':token}
        data = json.dumps({"TeamIds":teamIds})
        responseStatus = requests.request('GET', app.config.get("USER_URL")+"team/validate", 
                                          headers = headers, data =data )
        response = json.loads(responseStatus.text)
        if responseStatus.status_code is 200 and response["Quantity"] > 0:
            return Utils.jsonToObject(json.dumps(response["Data"]),"Team")
        else:
            return None

def getTeam(token,teamId):
        headers = {'Content-Type':'application/json','Authorization':token}
        responseStatus = requests.request('GET', app.config.get("USER_URL")+"team/"+str(teamId), 
                                          headers = headers)
        response = json.loads(responseStatus.text)
        if responseStatus.status_code is 200:
            return response["Data"]
        else:
            return None