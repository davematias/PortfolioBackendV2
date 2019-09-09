import boto3
import os


def getTable(tableName: str):
    # get env cant be global as it needs to work with pytest
    IS_OFFLINE = os.getenv('IS_OFFLINE')

    if IS_OFFLINE:
        client = boto3.resource(
            'dynamodb',
            region_name='localhost',
            endpoint_url='http://localhost:8000'
        )
    else:
        client = boto3.resource('dynamodb')

    table = client.Table(tableName)

    return table
