import pytest
import boto3
import os
import json

test_profile = {'id': '123123', 'name':  'testuser'}
edited_profile = {'id': '123123', 'name':  'gin'}
edited_profile_wrong = {'id': '123123', 'name':  'gin'}

@pytest.fixture
def insert_test_profile(create_profile_table):
    client = boto3.resource('dynamodb')
    table = client.Table(os.getenv('PROFILE_TABLE'))
    table.put_item(Item=test_profile)


def test_get_profile(insert_test_profile, flask_test_client):
    result = flask_test_client.get('/profile')
    obj = json.loads(result.data)

    assert obj == test_profile

def test_save_profile_unauthorized(insert_test_user, flask_test_client):
    result = flask_test_client.post('/profile', json=edited_profile)
    obj = json.loads(result.data)

    assert result.status_code == 401

def test_post_contact(flask_test_client):
    post_data = {
        'name': 'testuser',
        'email': 'testuser@mail.com',
        'subject': 'contacting you',
        'message': 'please call be back'
    }

    result = flask_test_client.post('/contact',
                                    data=json.dumps(post_data),
                                    content_type='application/json')

    assert result.status_code == 200


def test_post_contact_no_data(flask_test_client):
    result = flask_test_client.post('/contact',
                                    data=None,
                                    content_type='application/json')

    assert result.status_code == 400


def test_post_contact_invalid_data(flask_test_client):
    result = flask_test_client.post('/contact',
                                    data=json.dumps(dict(foo='bar')),
                                    content_type='application/json')

    assert result.status_code == 400
