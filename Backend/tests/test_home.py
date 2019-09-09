import pytest
import boto3
import os
import json

test_profile = {'id': '123123', 'name':  'testuser'}

@pytest.fixture
def insert_test_profile(create_profile_table):
    client = boto3.resource('dynamodb')
    table = client.Table(os.getenv('PROFILE_TABLE'))
    table.put_item(Item=test_profile)


def test_python_function(insert_test_profile, flask_test_client):    
    result = flask_test_client.get('/profile')
    obj = json.loads(result.data)

    assert obj == test_profile
