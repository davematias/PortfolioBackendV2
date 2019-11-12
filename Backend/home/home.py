import os
import smtplib, ssl
from email.message import EmailMessage
from typing import Tuple
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from utils import dynamo

site_blueprint = Blueprint('site', __name__,)

@site_blueprint.route('/profile', methods=['GET'])
def profile():
    user = __getProfile()
    if not user:
        return jsonify({'error': 'User does not exist'}), 404

    return jsonify(user)

@site_blueprint.route('/contact', methods=['POST'])
def contact():
    req_data = request.get_json()

    if not req_data:
        return jsonify({'error': 'Invalid form data'}), 400

    isValid, err = __validateMessage(req_data)

    if not isValid:
        return jsonify({'error': err}), 400

    try:
        emailServer = os.getenv('EMAIL_SERVER')
        emailPort = os.getenv('EMAIL_PORT')
        emailSender = os.getenv('EMAIL_SENDER')
        emailSenderPassword = os.getenv('EMAIL_SENDER_PASSWORD')
        emailReceiver = os.getenv('EMAIL_RECEIVER')

        msg = EmailMessage()
        msg.set_content(__createMessage(req_data))

        msg['Subject'] = "Contact From Personal Website"
        msg['From'] = emailSender
        msg['To'] = emailReceiver

        context = ssl.create_default_context()

        with smtplib.SMTP_SSL(emailServer, int(emailPort), timeout=10, context=context) as server:
            server.login(emailSender, emailSenderPassword)
            server.send_message(msg)
            server.close()

        return jsonify(success=True)
    except Exception as e:
        print(e)
        return jsonify({'error': 'Unable to send the email'}), 500


def __getProfile() -> dict:
    table = dynamo.getTable(os.getenv('PROFILE_TABLE'))

    result = table.scan(Limit=1)

    item = None

    if 'Items' in result.keys() and len(result['Items']) > 0:
        item = result['Items'][0]

    return item


def __validateMessage(emailData: dict) -> Tuple[bool, str]:

    if 'name' not in emailData.keys():
        return False, 'Name is required'

    if 'email' not in emailData.keys():
        return False, 'Email is required'

    if 'subject' not in emailData.keys():
        return False, 'Subject is required'

    if 'message' not in emailData.keys():
        return False, 'Message is required'

    return True, ''

def __createMessage(emailData: dict) -> str:
    return 'Name: {}\nEmail: {} \nSubject: {} \nMessage: {}'.format(emailData['name'], emailData['email'], emailData['subject'], emailData['message'])