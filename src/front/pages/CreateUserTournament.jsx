import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const CreateUserTournament = () => {
    const navigate = useNavigate();
    const [userTournament, setUserTournament] = useState({
        tournament_id: 0,
        user_id: 0
    })

    const addUserTournament = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user/tournament', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(userTournament)
        })
        .then(response => {
            if (response.ok) {
                setUserTournament({
                    tournament_id: 0,
                    user_id: 0
                })
                navigate("/user/tournament")
            }
            else {
                alert('No se puede crear ese user_tournament')
            }
        })
    }

    return (
        <div className="container my-4">
                    <h3 className="display-5 mb-4">Crea User_Tournament</h3>
                    <div className="container text-center w-50 my-5 border p-4 d-flex flex-column">
                        <label htmlFor="tournament_id" className="mx-2">Tournament ID</label>
                        <input type="number" name="tournament_id" id="tournament_id" value={userTournament.tournament_id} onChange={(e) => setUserTournament({ ...userTournament, tournament_id: e.target.value })}/>
                        <label htmlFor="user_id" className="mx-2 mt-4">User ID</label>
                        <input type="number" name="user_id" id="user_id" value={userTournament.user_id} onChange={(e) => setUserTournament({ ...userTournament, user_id: e.target.value })}/>
                    </div>
                    <div className="text-center">
                            <button className="btn btn-success" onClick={addUserTournament}>Crear</button>
                    </div>
                </div>
    )
}

export default CreateUserTournament