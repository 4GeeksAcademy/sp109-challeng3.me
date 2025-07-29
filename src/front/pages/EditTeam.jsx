import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const EditTeam = () => {
    const navigate = useNavigate();
    const [team, setTeam] = useState([])
    const { team_id } = useParams()

    const getTeam = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/team/' + team_id, {
        })
        .then(response => response.json())
        .then(data => setTeam(data))
    }

    useEffect(() => {getTeam()}, [])

    const editTeam = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/team/' + team_id, {
            method: 'PUT',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(team)
        })
        .then(response => {
            if (response.ok) {
                navigate("/team")
            }
        })
    }

    return (
        <div className="container my-4">
                    <h3 className="display-5 mb-4">Edita tu Equipo</h3>
                    <div className="container text-center w-50 my-5 border p-4 d-flex flex-column">
                        <label htmlFor="name" className="mx-2">Name</label>
                        <input type="text" name="name" id="name" value={team.name} onChange={(e) => setTeam({ ...team, name: e.target.value })}/>
                        <label htmlFor="user_id" className="mx-2 mt-4">User ID</label>
                        <input type="number" name="user_id" id="user_id" value={team.user_id} onChange={(e) => setTeam({ ...team, user_id: e.target.value })}/>
                    </div>
                    <div className="text-center">
                            <button className="btn btn-success" onClick={editTeam}>Edita Equipo</button>
                    </div>
                </div>
    )
}

export default EditTeam