from flask import Blueprint

blog_blueprint = Blueprint('blog', __name__,)

@blog_blueprint.route('/blog')
def index():
    return "Hello from blog!"