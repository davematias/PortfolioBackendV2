import pytest
import moto
import boto3

from app import app


@pytest.fixture
def flask_test_client():
    app.config['TESTING'] = True
    client = app.test_client()

    return client


@pytest.fixture(autouse=True)
def env_setup(monkeypatch):
    monkeypatch.setenv('IS_OFFLINE', '')  # moto mocks live dynamodb
    monkeypatch.setenv('PROFILE_TABLE', 'PROFILE-TEST')
    """Mocked AWS Credentials for moto."""
    monkeypatch.setenv('AWS_ACCESS_KEY_ID', 'testing')
    monkeypatch.setenv('AWS_SECRET_ACCESS_KEY', 'testing')
    monkeypatch.setenv('AWS_SECURITY_TOKEN', 'testing')
    monkeypatch.setenv('AWS_SESSION_TOKEN', 'testing')
    monkeypatch.setenv('AWS_DEFAULT_REGION', 'us-east-1')


@pytest.fixture
def create_profile_table():
    with moto.mock_dynamodb2():
        boto3.client('dynamodb').create_table(
            AttributeDefinitions=[
                {'AttributeName': 'id', 'AttributeType': 'S'}
            ],
            TableName='PROFILE-TEST',
            KeySchema=[{'AttributeName': 'id', 'KeyType': 'HASH'}],
            ProvisionedThroughput={
                'ReadCapacityUnits': 123,
                'WriteCapacityUnits': 123,
            },
        )
        yield boto3.resource('dynamodb').Table('PROFILE-TEST')
