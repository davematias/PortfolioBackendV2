#pylint: disable = no-value-for-parameter
import click
import os
import flask_bcrypt

from utils import dynamo

@click.command()
@click.option('--offline', '-o')
@click.option('--stage', '-g')
@click.option('--email', '-e')
@click.option('--password', '-p')
def main(offline, stage, email, password):
    os.environ["IS_OFFLINE"] = offline
    table = dynamo.getTable("user-"+stage)
    user = {
        "email" : email,
        "password": flask_bcrypt.generate_password_hash(password) 
    }

    table.put_item(Item=user)
    
    print("User inserted")

if __name__ == "__main__":
    main()