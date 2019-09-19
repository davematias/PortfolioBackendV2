import os
import flask_bcrypt

from flask import Blueprint, jsonify, request
from utils import dynamo
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from boto3.dynamodb.conditions import Key

auth_blueprint = Blueprint('auth', __name__,)

@auth_blueprint.route('/auth', methods=['POST'])
def auth_user():
    ''' auth endpoint '''
    credentials = request.get_json()
    user = __validateUser(credentials)

    if user is None:
        return jsonify({'ok': False, 'message': 'invalid email'}), 401

    if user and flask_bcrypt.check_password_hash(user['password'], credentials['password']):
        del user['password']
        access_token = create_access_token(identity=credentials)
        refresh_token = create_refresh_token(identity=credentials)
        user['token'] = access_token
        user['refresh'] = refresh_token
        return jsonify({'ok': True, 'data': user}), 200
    else:
        return jsonify({'ok': False, 'message': 'invalid password'}), 401

@auth_blueprint.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    ''' refresh token endpoint '''
    current_user = get_jwt_identity()
    ret = {
        'token': create_access_token(identity=current_user)
    }
    return jsonify({'ok': True, 'data': ret}), 200

def __validateUser(userData: dict) -> dict:
    if userData is None:
        return None
    if 'email' not in userData.keys():
        return None
   
    tableName = os.getenv('USER_TABLE')
    table = dynamo.getTable(tableName)
    
    result = table.query(
        KeyConditionExpression=Key('email').eq(userData['email'])
    )   

    item = None

    if 'Items' in result.keys() and len(result['Items']) > 0:
        item = result['Items'][0]

    return item