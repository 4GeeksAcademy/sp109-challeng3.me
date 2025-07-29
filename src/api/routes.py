"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Admin, Tournament, Team
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/tournament', methods=['GET'])
def get_tournament():

    all_tournaments = Tournament.query.all()
    results = list(map(lambda tournament : tournament.serialize(),all_tournaments))

    response_body = {
        "tournament": results
    }

    return jsonify(response_body), 200

@api.route('/tournament/<int:tournament_id>', methods=['GET'])
def get_tournament_by_id(tournament_id):
    tournament = db.session.get(Tournament, tournament_id)

    return jsonify(tournament.serialize()), 200

@api.route('/tournament', methods=['POST'])
def add_tournament():
    body = request.get_json()
    new_torneo = Tournament(**body)
    db.session.add(new_torneo)
    db.session.commit()

    response_body = {
        "tournament": new_torneo.serialize(),
        "msg": "nuevo torneo"
    }

    return jsonify(response_body), 200

@api.route('/tournament/<int:tournament_id>', methods=['PUT'])
def edit_tournament(tournament_id):
    edit_torneo = Tournament.query.get(tournament_id)
    if edit_torneo is None:
        return 'Tournament not found', 404

    body = request.get_json()
    for key, value in body.items():
        setattr(edit_torneo, key, value)

    db.session.commit()

    response_body = {
        "tournament": edit_torneo.serialize(),
        "msg": "torneo editado"
    }

    return jsonify(response_body), 200

@api.route('/tournament/<int:tournament_id>', methods=['DELETE'])
def delete_tournament(tournament_id):
    tournament_delete = db.session.get(Tournament,tournament_id)
    response_body ={
        "msg":"se elimino torneo"
    }

    db.session.delete(tournament_delete)
    db.session.commit()

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

@api.route('/admin', methods=['GET'])
def get_admins():

    all_admins =  db.session.execute(select(Admin)).scalars().all()
    if all_admins is None:
        return 'Cant get Admins', 400
    
    result = list(map(lambda admin: admin.serialize(), all_admins))

    return jsonify(result), 200

@api.route('/admin/<int:admin_id>', methods=['GET'])
def get_admin(admin_id):

    admin =  db.session.execute(select(Admin).where(Admin.id == admin_id)).scalars().first()
    if admin is None:
        return 'Cant get the admin', 400

    return jsonify(admin.serialize()), 200

@api.route('/admin', methods=['POST'])
def add_admin():

    body = request.get_json()

    if body is None:
        return 'El cuerpo debe seguir la siguiente estructura, {"username": username, "password": password, "email": email}', 400
    if 'username' not in body:
        return 'Debes especificar username', 400
    if 'password' not in body:
        return 'Debes especificar password', 400
    if 'email' not in body:
        return 'Debes especificar email', 400
    
    new_admin =  Admin(
        username = body['username'],
        password = body['password'],
        email = body['email'],
    )

    db.session.add(new_admin)
    db.session.commit()
    
    return 'Admin successful created', 200

@api.route('/admin/<int:admin_id>', methods=['PUT'])
def edit_admin(admin_id):

    body = request.get_json()
    admin = db.session.execute(select(Admin).where(Admin.id == admin_id)).scalars().first()

    if admin is None:
        return 'User dont exist', 400

    if body is None:
        return 'El cuerpo debe seguir la siguiente estructura, {"username": username, "password": password, "email": email, "level": level, "points": points, "premium": premium, "premium_end_date": premium_end_date}', 400
    if 'username' in body:
        admin.username = body['username']
    if 'password' in body:
        admin.password = body['password']
    if 'email' in body:
        admin.email = body['email']
    
    db.session.commit()
    
    return 'Admin with id ' + str(admin_id) + ' has been edited', 200

@api.route('/admin/<int:admin_id>', methods=['DELETE'])
def delete_admin(admin_id):

    admin = db.session.execute(select(Admin).where(Admin.id == admin_id)).scalars().first()

    if admin is None:
        return 'Admin dont exist', 400

    db.session.delete(admin)
    db.session.commit()

    return 'Admin with id ' + str(admin_id) + ' has been deleted', 200

@api.route('/team', methods=['GET'])
def get_teams():

    all_teams =  db.session.execute(select(Team)).scalars().all()
    if all_teams is None:
        return 'Cant get Teams', 400
    
    result = list(map(lambda team: team.serialize(), all_teams))

    return jsonify(result), 200

@api.route('/team/<int:team_id>', methods=['GET'])
def get_team(team_id):

    team =  db.session.execute(select(Team).where(Team.id == team_id)).scalars().first()
    if team is None:
        return 'Cant get the team', 400

    return jsonify(team.serialize()), 200

@api.route('/team', methods=['POST'])
def add_team():

    body = request.get_json()

    if body is None:
        return 'El cuerpo debe seguir la siguiente estructura, {"name": name, "user_id": user_id}', 400
    if 'name' not in body:
        return 'Debes especificar name', 400
    if 'user_id' not in body:
        return 'Debes especificar user_id', 400

    
    new_team =  Team(
        name = body['name'],
        level = 1,
        premium = False,
        user_id = body['user_id']
    )

    db.session.add(new_team)
    db.session.commit()
    
    return 'Team successful created', 200

@api.route('/team/<int:team_id>', methods=['PUT'])
def edit_team(team_id):

    body = request.get_json()
    team = db.session.execute(select(Team).where(Team.id == team_id)).scalars().first()

    if team is None:
        return 'Team dont exist', 400

    if body is None:
        return 'El cuerpo debe seguir la siguiente estructura, {"name": name, "level": level, "premium": premium, "user_id": user_id}', 400
    if 'name' in body:
        team.name = body['name']
    if 'level' in body:
        team.level = body['level']
    if 'premium' in body:
        team.premium = body['premium']
    if 'user_id' in body:
        team.user_id = body['user_id']
    
    db.session.commit()
    
    return 'Team with id ' + str(team_id) + ' has been edited', 200

@api.route('/team/<int:team_id>', methods=['DELETE'])
def delete_team(team_id):

    team = db.session.execute(select(Team).where(Team.id == team_id)).scalars().first()

    if team is None:
        return 'Team dont exist', 400

    db.session.delete(team)
    db.session.commit()

    return 'Team with id ' + str(team_id) + ' has been deleted', 200
