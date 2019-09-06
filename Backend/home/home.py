import os
from flask import Blueprint, jsonify
from utils import dynamo

site_blueprint = Blueprint('site', __name__,)

@site_blueprint.route('/profile')
def profile():
    user = __getProfile()
    if not user:
        return jsonify({'error': 'User does not exist'}), 404

    return jsonify({
        'userId': user.get('userId').get('S'),
        'name': user.get('name').get('S')
    })

def __getProfile():    
    USERS_TABLE = os.getenv('PROFILE_TABLE')    
    client = dynamo.getClient()
    resp = client.get_item(
        TableName=USERS_TABLE,
        Key={
            'id': { 'S': "user_id" }
            }
    )
    item = resp.get('Item')

    return item