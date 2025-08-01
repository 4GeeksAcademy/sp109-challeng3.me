"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Admin, Tournament, Team, User_tournament, Videojuego, User_team, User_videojuego, Team_tournament
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, supports_credentials=True, expose_headers=["Authorization"])

@api.route('/user/videojuego', methods=['GET'])
def get_user_videojuego():

    all_user_videojuego = User_videojuego.query.all()
    results = list(map(lambda user_videojuego : user_videojuego.serialize(),all_user_videojuego))

    response_body = {
        "user_videojuego": results
    }

    return jsonify(response_body), 200

@api.route('/user/videojuego/<int:user_videojuego_id>', methods=['GET'])
def get_user_videojuego_by_id(user_videojuego_id):
    user_videojuego = db.session.get(User_videojuego, user_videojuego_id)
    if user_videojuego is None:
        return 'User_videojuego not found', 404

    return jsonify(user_videojuego.serialize()), 200

@api.route('/user/videojuego', methods=['POST'])
def add_user_videojuego():
    body = request.get_json()
    new_user_videojuego = User_videojuego(**body)
    db.session.add(new_user_videojuego)
    db.session.commit()

    response_body = {
        "user_videojuego": new_user_videojuego.serialize(),
        "msg": "nuevo user_videojuego"
    }

    return jsonify(response_body), 200

@api.route('/user/videojuego/<int:user_videojuego_id>', methods=['PUT'])
def edit_user_videojuego(user_videojuego_id):
    edit_user_videojuego = User_videojuego.query.get(user_videojuego_id)
    if edit_user_videojuego is None:
        return 'User_videojuego not found', 404

    body = request.get_json()
    for key, value in body.items():
        setattr(edit_user_videojuego, key, value)

    db.session.commit()

    response_body = {
        "user_videojuego": edit_user_videojuego.serialize(),
        "msg": "user_videojuego editado"
    }

    return jsonify(response_body), 200

@api.route('/user/videojuego/<int:user_videojuego_id>', methods=['DELETE'])
def delete_user_videojuego(user_videojuego_id):
    user_videojuego_delete = db.session.get(User_videojuego, user_videojuego_id)
    if user_videojuego_delete is None:
        return 'User_videojuego not found', 404

    response_body = {
        "msg": "se elimino user_videojuego"
    }

    db.session.delete(user_videojuego_delete)
    db.session.commit()

    return jsonify(response_body), 200

@api.route("/user/login", methods=["POST"])
def user_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(select(User).where(User.email == email)).scalar_one_or_none()
    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401
    if password != user.password:
       return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

@api.route('/videojuego', methods=['GET'])
def get_videojuego():

    all_videojuego = Videojuego.query.all()
    results = list(map(lambda videojuego : videojuego.serialize(),all_videojuego))

    response_body = {
        "videojuego": results
    }

    return jsonify(response_body), 200

@api.route('/videojuego/<int:videojuego_id>', methods=['GET'])
def get_videojuego_by_id(videojuego_id):
    videojuego = db.session.get(Videojuego, videojuego_id)
    if videojuego is None:
        return 'Videojuego not found', 404

    return jsonify(videojuego.serialize()), 200

@api.route('/videojuego', methods=['POST'])
def add_videojuego():
    body = request.get_json()
    new_videojuego = Videojuego(**body)
    db.session.add(new_videojuego)
    db.session.commit()

    response_body = {
        "videojuego": new_videojuego.serialize(),
        "msg": "nuevo videojuego"
    }

    return jsonify(response_body), 200

@api.route('/videojuego/<int:videojuego_id>', methods=['PUT'])
def edit_videojuego(videojuego_id):
    edit_videojuego = Videojuego.query.get(videojuego_id)
    if edit_videojuego is None:
        return 'Videojuego not found', 404

    body = request.get_json()
    for key, value in body.items():
        setattr(edit_videojuego, key, value)

    db.session.commit()

    response_body = {
        "videojuego": edit_videojuego.serialize(),
        "msg": "videojuego editado"
    }

    return jsonify(response_body), 200

@api.route('/videojuego/<int:videojuego_id>', methods=['DELETE'])
def delete_videojuego(videojuego_id):
    videojuego_delete = db.session.get(Videojuego, videojuego_id)
    if videojuego_delete is None:
        return 'Videojuego not found', 404

    response_body = {
        "msg": "se elimino videojuego"
    }

    db.session.delete(videojuego_delete)
    db.session.commit()

    return jsonify(response_body), 200

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
@jwt_required()
def add_tournament():
    claims = get_jwt()
    if claims.get("role") != "admin":
        return jsonify({"msg": "No autorizado"}), 403

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
@jwt_required()
def edit_tournament(tournament_id):
    claims = get_jwt()
    if claims.get("role") != "admin":
        return jsonify({"msg": "No autorizado"}), 403

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
@jwt_required()
def delete_tournament(tournament_id):
    claims = get_jwt()
    if claims.get("role") != "admin":
        return jsonify({"msg": "No autorizado"}), 403
    
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

@api.route('/user/tournament', methods=['GET'])
def get_user_tournaments():

    all_user_tournament =  db.session.execute(select(User_tournament)).scalars().all()
    if all_user_tournament is None:
        return 'Cant get User_tournament', 400
    
    result = list(map(lambda user_tournament: user_tournament.serialize(), all_user_tournament))

    return jsonify(result), 200

@api.route('/user/tournament/<int:id>', methods=['GET'])
def get_user_tournament(id):

    user_tournament =  db.session.execute(select(User_tournament).where(User_tournament.id == id)).scalars().first()
    if user_tournament is None:
        return 'Cant get the user tournament', 400

    return jsonify(user_tournament.serialize()), 200

@api.route('/user/tournament', methods=['POST'])
def add_user_tournament():

    body = request.get_json()

    if body is None:
        return 'El cuerpo debe seguir la siguiente estructura, {"tournament_id": int, "tournament_id": int}', 400
    if 'tournament_id' not in body:
        return 'Debes especificar tournament_id', 400
    if 'user_id' not in body:
        return 'Debes especificar user_id', 400

    
    new_user_tournament =  User_tournament(
        tournament_id = body['tournament_id'],
        user_id = body['user_id']
    )

    db.session.add(new_user_tournament)
    db.session.commit()
    
    return 'User_tournament successful created', 200

@api.route('/user/tournament/<int:id>', methods=['PUT'])
def edit_user_tournament(id):

    body = request.get_json()
    user_tournament = db.session.execute(select(User_tournament).where(User_tournament.id == id)).scalars().first()

    if user_tournament is None:
        return 'user_tournament dont exist', 400

    if body is None:
        return 'El cuerpo debe seguir la siguiente estructura, {"tournament_id": int, "user_id": int}', 400
    if 'tournament_id' in body:
        user_tournament.tournament_id = body['tournament_id']
    if 'user_id' in body:
        user_tournament.user_id = body['user_id']
    
    db.session.commit()
    
    return 'user_tournament with id ' + str(id) + ' has been edited', 200

@api.route('/user/tournament/<int:id>', methods=['DELETE'])
def delete_user_tournament(id):

    user_tournament = db.session.execute(select(User_tournament).where(User_tournament.id == id)).scalars().first()

    if user_tournament is None:
        return 'user_tournament dont exist', 400

    db.session.delete(user_tournament)
    db.session.commit()

    return 'user_tournament with id ' + str(id) + ' has been deleted', 200

@api.route('/user/team', methods=['GET'])
def get_user_teams():

    all_user_team =  db.session.execute(select(User_team)).scalars().all()
    if all_user_team is None:
        return 'Cant get User_team', 400
    
    result = list(map(lambda user_team: user_team.serialize(), all_user_team))

    return jsonify(result), 200

@api.route('/user/team/<int:id>', methods=['GET'])
def get_user_team(id):

    user_team =  db.session.execute(select(User_team).where(User_team.id == id)).scalars().first()
    if user_team is None:
        return 'Cant get the user team', 400

    return jsonify(user_team.serialize()), 200

@api.route('/user/team', methods=['POST'])
def add_user_team():

    body = request.get_json()

    if body is None:
        return 'El cuerpo debe seguir la siguiente estructura, {"team_id": int, "user_id": int}', 400
    if 'team_id' not in body:
        return 'Debes especificar team_id', 400
    if 'user_id' not in body:
        return 'Debes especificar user_id', 400

    
    new_user_team =  User_team(
        team_id = body['team_id'],
        user_id = body['user_id']
    )

    db.session.add(new_user_team)
    db.session.commit()
    
    return 'User_team successful created', 200

@api.route('/user/team/<int:id>', methods=['PUT'])
def edit_user_team(id):

    body = request.get_json()
    user_team = db.session.execute(select(User_team).where(User_team.id == id)).scalars().first()

    if user_team is None:
        return 'user_team dont exist', 400

    if body is None:
        return 'El cuerpo debe seguir la siguiente estructura, {"team_id": int, "user_id": int}', 400
    if 'team_id' in body:
        user_team.team_id = body['team_id']
    if 'user_id' in body:
        user_team.user_id = body['user_id']
    
    db.session.commit()
    
    return 'user_team with id ' + str(id) + ' has been edited', 200

@api.route('/user/team/<int:id>', methods=['DELETE'])
def delete_user_team(id):

    user_team = db.session.execute(select(User_team).where(User_team.id == id)).scalars().first()

    if user_team is None:
        return 'user_teamt dont exist', 400

    db.session.delete(user_team)
    db.session.commit()

    return 'user_team with id ' + str(id) + ' has been deleted', 200

@api.route('/admin/login', methods=['POST'])
def admin_login():
    body = request.get_json()

    if body is None:
        return 'El cuerpo debe seguir la siguiente estructura, {"username": username, "password": password}', 400
    if 'username' not in body:
        return 'Debes especificar username', 400
    if 'password' not in body:
        return 'Debes especificar password', 400

    admin = db.session.execute(select(Admin).where(Admin.username == body['username'], Admin.password == body['password'])).scalars().first()

    if admin is None:
        return 'Admin not found', 404

    access_token = create_access_token(
        identity=str(admin.id),
        additional_claims={"role": "admin"}
    )

    response_body = {
        "msg": "Login successful",
        "access_token": access_token
    }

    return jsonify(response_body), 200

@api.route('/team/tournament', methods=['GET'])
def get_teams_tournament():

    all_team_tournament =  db.session.execute(select(Team_tournament)).scalars().all()
    if all_team_tournament is None:
        return 'Cant get Team_tournament', 400
    
    result = list(map(lambda team_tournament: team_tournament.serialize(), all_team_tournament))

    return jsonify(result), 200

@api.route('/team/tournament/<int:id>', methods=['GET'])
def get_team_tournament(id):

    team_tournament =  db.session.execute(select(Team_tournament).where(Team_tournament.id == id)).scalars().first()
    if team_tournament is None:
        return 'Cant get the team_tournament', 400

    return jsonify(team_tournament.serialize()), 200

@api.route('/team/tournament', methods=['POST'])
def add_team_tournament():

    body = request.get_json()

    if body is None:
        return 'El cuerpo debe seguir la siguiente estructura, {"team_id": int, "tournament_id": int}', 400
    if 'team_id' not in body:
        return 'Debes especificar team_id', 400
    if 'tournament_id' not in body:
        return 'Debes especificar tournament_id', 400

    
    new_team_tournament =  Team_tournament(
        team_id = body['team_id'],
        tournament_id = body['tournament_id']
    )

    db.session.add(new_team_tournament)
    db.session.commit()
    
    return 'Team_Tournament successful created', 200

@api.route('/team/tournament/<int:id>', methods=['PUT'])
def edit_team_tournament(id):

    body = request.get_json()
    team_tournament = db.session.execute(select(Team_tournament).where(Team_tournament.id == id)).scalars().first()

    if team_tournament is None:
        return 'team_tournament dont exist', 400

    if body is None:
        return 'El cuerpo debe seguir la siguiente estructura, {"team_id": int, "tournament_id": int}', 400
    if 'team_id' in body:
        team_tournament.team_id = body['team_id']
    if 'tournament_id' in body:
        team_tournament.user_id = body['tournament_id']
    
    db.session.commit()
    
    return 'user_team with id ' + str(id) + ' has been edited', 200

@api.route('/team/tournament/<int:id>', methods=['DELETE'])
def delete_team_tournament(id):

    team_tournament = db.session.execute(select(Team_tournament).where(Team_tournament.id == id)).scalars().first()

    if team_tournament is None:
        return 'team_tournament dont exist', 400

    db.session.delete(team_tournament)
    db.session.commit()

    return 'team_tournament with id ' + str(id) + ' has been deleted', 200
