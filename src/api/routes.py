"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['GET'])
def get_users():

    all_users =  db.session.execute(select(User)).scalars().all()
    if all_users is None:
        return 'Cant get users', 400
    
    result = list(map(lambda user: user.serialize(), all_users))

    return jsonify(result), 200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):

    user =  db.session.execute(select(User).where(User.id == user_id)).scalars().first()
    if user is None:
        return 'Cant get the user', 400

    return jsonify(user.serialize()), 200

@api.route('/user', methods=['POST'])
def add_users():

    body = request.get_json()

    if body is None:
        return 'El cuerpo debe seguir la siguiente estructura, {"username": username, "password": password, "email": email}', 400
    if 'username' not in body:
        return 'Debes especificar username', 400
    if 'password' not in body:
        return 'Debes especificar password', 400
    if 'email' not in body:
        return 'Debes especificar email', 400
    
    new_user =  User(
        username = body['username'],
        password = body['password'],
        email = body['email'],
        level = 0,
        points = 0,
        premium = False,
        is_active = True
    )

    db.session.add(new_user)
    db.session.commit()
    

    return 'User successful created', 200

@api.route('/user/<int:user_id>', methods=['PUT'])
def edit_users(user_id):

    body = request.get_json()
    user = db.session.execute(select(User).where(User.id == user_id)).scalars().first()

    if user is None:
        return 'User dont exist', 400

    if body is None:
        return 'El cuerpo debe seguir la siguiente estructura, {"username": username, "password": password, "email": email, "level": level, "points": points, "premium": premium, "premium_end_date": premium_end_date}', 400
    if 'username' in body:
        user.username = body['username']
    if 'password' in body:
        user.password = body['password']
    if 'email' in body:
        user.email = body['email']
    if 'level' in body:
        user.level = body['level']
    if 'points' in body:
        user.points = body['points']
    if 'premium' in body:
        user.premium = body['premium']
    if 'premium_end_date' in body:
        user.premium_end_date = body['premium_end_date']
    
    db.session.commit()
    
    return 'User with id ' + str(user_id) + ' has been edited', 200

@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_users(user_id):

    user = db.session.execute(select(User).where(User.id == user_id)).scalars().first()

    if user is None:
        return 'User dont exist', 400

    db.session.delete(user)
    db.session.commit()

    return 'User with id ' + str(user_id) + ' has been deleted', 200