# profile.py
import os
import boto3

from flask import Flask, jsonify, request
from flask_cors import CORS
from home import home
from blog import blog

# create api
app = Flask(__name__)
app.register_blueprint(home.site_blueprint)
app.register_blueprint(blog.blog_blueprint)
# setup cors
CORS(app, resources={r"/*": {"origins": "*"}})


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
