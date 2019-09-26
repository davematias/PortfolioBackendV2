import pytest
import boto3
import os
import json

def test_get_token(insert_test_user, flask_test_client, test_user_data):
    result = flask_test_client.post('/auth', json=test_user_data)
    obj = json.loads(result.data)

    assert obj != None

def test_get_token_error(insert_test_user, flask_test_client, test_user_data):
    bad_user = test_user_data.copy()
    bad_user["password"] = 'badpassword'
    result = flask_test_client.post('/auth', json=bad_user)
    obj = json.loads(result.data)

    assert obj['ok'] == False

def test_bad_refresh_token(insert_test_user, flask_test_client):
    result = flask_test_client.post('/refresh', headers={'Authorization': 'Bearer dkskdsakd'})
    
    assert result.status_code != 200

def test_refresh_token(insert_test_user, flask_test_client, test_user_data):
    result = flask_test_client.post('/auth', json=test_user_data)
    obj = json.loads(result.data)

    refresh_result = flask_test_client.post('/refresh', 
        headers={'Authorization': 'Bearer {}'.format(obj['data']['refresh'])})

    refresh_obj = json.loads(refresh_result.data)

    assert refresh_obj['data']['token'] != None