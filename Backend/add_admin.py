#pylint: disable = no-value-for-parameter
import click
import os
import flask_bcrypt

from utils import dynamo

@click.command()
@click.option('--offline', '-o', default='')
@click.option('--region', '-r', required=True)
@click.option('--stage', '-g', required=True)
@click.option('--email', '-e', required=True)
@click.option('--password', '-p', required=True)
def main(offline, region, stage, email, password):
    os.environ["IS_OFFLINE"] = offline
    os.environ["AWS_DEFAULT_REGION"] = region
    table = dynamo.getTable("user-"+stage)
    user = {
        "email" : email,
        "password": flask_bcrypt.generate_password_hash(password).decode('utf-8')
    }

    table.put_item(Item=user)
    
    print("User inserted")

if __name__ == "__main__":
    main()