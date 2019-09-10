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
CORS(app)

@app.route("/")
def index():
    return "Hello from backend!"