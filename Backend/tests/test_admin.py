from add_admin import createAdmin
from utils import dynamo

def test_create_user(create_user_table):
    createAdmin('', "us-east-1", "TEST", "somemail@mail.com", "qwerty123")

    table = dynamo.getTable('USER-TEST')

    result = table.scan(Limit=1)

    assert len(result) > 0 and result['Items'][0]['email'] == "somemail@mail.com"
