import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const EditUserTournament = () => {
    const navigate = useNavigate();
    const [userTournament, setUserTournament] = useState([])
    const { id } = useParams()

    const getUserTournament = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user/tournament/' + id, {
        })
        .then(response => response.json())
        .then(data => setUserTournament(data))
    }

    useEffect(() => {getUserTournament()}, [])

    const editUserTournament = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user/tournament/' + id, {
            method: 'PUT',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(userTournament)
        })
        .then(response => {
            if (response.ok) {
                navigate("/user/tournament")
            }
        })
    }

    return (
        <div className="container my-4">
                    <h3 className="display-5 mb-4">Edita el User_Tournament {userTournament.id}</h3>
                    <div className="container text-center w-50 my-5 border p-4 d-flex flex-column">
                        <label htmlFor="tournament_id" className="mx-2">Tournament ID</label>
                        <input type="number" name="tournament_id" id="tournament_id" value={userTournament.tournament_id} onChange={(e) => setUserTournament({ ...userTournament, tournament_id: e.target.value })}/>
                        <label htmlFor="user_id" className="mx-2 mt-4">User ID</label>
                        <input type="number" name="user_id" id="user_id" value={userTournament.user_id} onChange={(e) => setUserTournament({ ...userTournament, user_id: e.target.value })}/>
                    </div>
                    <div className="text-center">
                            <button className="btn btn-success" onClick={editUserTournament}>Editar</button>
                    </div>
                </div>
    )
}

export default EditUserTournament