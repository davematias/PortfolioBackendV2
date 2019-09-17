import pytest
import moto
import boto3
from unittest.mock import MagicMock
import smtplib

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
    """Mocked email send credentials"""
    monkeypatch.setenv('EMAIL_SERVER', 'localhost')
    monkeypatch.setenv('EMAIL_PORT', '25025')
    monkeypatch.setenv('EMAIL_SENDER', 'test.sender@mydomain.com')
    monkeypatch.setenv('EMAIL_SENDER_PASSWORD', 'test123')
    monkeypatch.setenv('EMAIL_RECEIVER', 'test.recipient2@mydomain.com')

    smtp_mock = MagicMock()
    smtp_mock.sendmail.return_value = {}
    smtp_mock.send_message.return_value = {}

    monkeypatch.setattr(smtplib, 'SMTP', MagicMock(return_value=smtp_mock))
    monkeypatch.setattr(smtplib, 'SMTP_SSL', MagicMock(return_value=smtp_mock))

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
