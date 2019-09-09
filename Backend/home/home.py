import os
from flask import Blueprint, jsonify
from utils import dynamo

site_blueprint = Blueprint('site', __name__,)


@site_blueprint.route('/profile')
def profile():
    user = __getProfile()
    if not user:
        return jsonify({'error': 'User does not exist'}), 404

    return jsonify(user)


def __getProfile():    
    table = dynamo.getTable(os.getenv('PROFILE_TABLE'))

    result = table.scan(Limit=1)

    item = None

    if len(result['Items']) > 0:
        item = result['Items'][0]

    return item
