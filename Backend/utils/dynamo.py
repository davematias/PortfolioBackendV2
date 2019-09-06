import boto3
import os

def getClient():    
    #get env cant be global as it needs to work with pytest
    IS_OFFLINE = os.getenv('IS_OFFLINE')
    if IS_OFFLINE:
        client = boto3.client(
            'dynamodb',
            region_name='localhost',
            endpoint_url='http://localhost:8000'
        )
    else:
        client = boto3.client('dynamodb')
    return client
