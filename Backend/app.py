# profile.py
import os
import boto3
import datetime
from flask_jwt_extended import JWTManager

from flask import Flask, jsonify, request
from flask_cors import CORS
from home import home
from auth import auth

JWT_SECRET = os.getenv('JWT_SECRET')
JWT_TOKEN_DURATION_DAYS = os.getenv('JWT_TOKEN_DURATION_DAYS')

if JWT_TOKEN_DURATION_DAYS is None:
    JWT_TOKEN_DURATION_DAYS = '1'

# create api
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = JWT_SECRET
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=int(JWT_TOKEN_DURATION_DAYS))

app.register_blueprint(home.site_blueprint)
app.register_blueprint(auth.auth_blueprint)
# setup cors
CORS(app, resources={r"/*": {"origins": "*"}})

jwt = JWTManager(app)

@app.route("/")
def index():
    return "Hello from backend!"

@app.errorhandler(404)
def resource_not_found(e):    
    return jsonify(error=str(e)), 404

@app.errorhandler(500)
def server_error(e):
    print(str(e))
    return jsonify(error=str(e)), 500

@jwt.unauthorized_loader
def unauthorized_response(callback):
    return jsonify({
        'ok': False,
        'message': 'Missing Authorization Header'
    }), 401