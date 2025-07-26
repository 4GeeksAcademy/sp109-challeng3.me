"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Tournament
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

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

@api.route('/tournament/<int:tournament_id>', methods=['DELETE'])
def delete_tournament(tournament_id):
    tournament_delete = db.session.get(Tournament,tournament_id)
    response_body ={
        "msg":"se elimino torneo"
    }

    db.session.delete(tournament_delete)
    db.session.commit()

    return jsonify(response_body), 200


