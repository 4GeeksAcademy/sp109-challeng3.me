import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const CreateTeamTournament = () => {
    const navigate = useNavigate();
    const [teamTournament, setTeamTournament] = useState({
        team_id: 0,
        tournament_id: 0
    })

    const addTeamTournament = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/team/tournament', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(teamTournament)
        })
        .then(response => {
            if (response.ok) {
                setTeamTournament({
                    team_id: 0,
                    tournament_id: 0
                })
                navigate("/team/tournament")
            }
            else {
                alert('No se puede crear ese team_tournament')
            }
        })
    }

    return (
        <div className="container my-4">
                    <h3 className="display-5 mb-4">Crea Team_Tournament</h3>
                    <div className="container text-center w-50 my-5 border p-4 d-flex flex-column">
                        <label htmlFor="team_id" className="mx-2">Team ID</label>
                        <input type="number" name="team_id" id="team_id" value={teamTournament.team_id} onChange={(e) => setTeamTournament({ ...teamTournament, team_id: e.target.value })}/>
                        <label htmlFor="tournament_id" className="mx-2 mt-4">Tournament ID</label>
                        <input type="number" name="tournament_id" id="tournament_id" value={teamTournament.tournament_id} onChange={(e) => setTeamTournament({ ...teamTournament, tournament_id: e.target.value })}/>
                    </div>
                    <div className="text-center">
                            <button className="btn btn-success" onClick={addTeamTournament}>Crear</button>
                    </div>
                </div>
    )
}

export default CreateTeamTournament