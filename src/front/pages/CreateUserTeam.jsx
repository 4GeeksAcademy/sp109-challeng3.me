import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const CreateUserTeam = () => {
    const navigate = useNavigate();
    const [userTeam, setUserTeam] = useState({
        team_id: 0,
        user_id: 0
    })

    const addUserTeam = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user/team', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(userTeam)
        })
        .then(response => {
            if (response.ok) {
                setUserTeam({
                    team_id: 0,
                    user_id: 0
                })
                navigate("/user/team")
            }
            else {
                alert('No se puede crear ese user_team')
            }
        })
    }

    return (
        <div className="container my-4">
                    <h3 className="display-5 mb-4">Crea User_Team</h3>
                    <div className="container text-center w-50 my-5 border p-4 d-flex flex-column">
                        <label htmlFor="team_id" className="mx-2">Team ID</label>
                        <input type="number" name="team_id" id="team_id" value={userTeam.team_id} onChange={(e) => setUserTeam({ ...userTeam, team_id: e.target.value })}/>
                        <label htmlFor="user_id" className="mx-2 mt-4">User ID</label>
                        <input type="number" name="user_id" id="user_id" value={userTeam.user_id} onChange={(e) => setUserTeam({ ...userTeam, user_id: e.target.value })}/>
                    </div>
                    <div className="text-center">
                            <button className="btn btn-success" onClick={addUserTeam}>Crear</button>
                    </div>
                </div>
    )
}

export default CreateUserTeam