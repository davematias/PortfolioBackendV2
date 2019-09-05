from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound

site_blueprint = Blueprint('site', __name__,)

@site_blueprint.route('/profile')
def profile():
    return "Hello from profile!"