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
                navigate("/user/dashboard")
            }
        })
    }

    return (
        <div className="container my-4">
                    <h3 className="display-5 mb-4">Edita tu Equipo</h3>
                    <div className="container text-center w-50 my-5 border p-4 d-flex flex-column">
                        <label htmlFor="name" className="mx-2">Nombre</label>
                        <input type="text" name="name" id="name" value={team.name} onChange={(e) => setTeam({ ...team, name: e.target.value })}/>
                        <label htmlFor="img" className="mx-2 mt-4">Imágen</label>
                        <input type="text" name="img" id="img" value={team.img} onChange={(e) => setTeam({ ...team, img: e.target.value })}/>
                    </div>
                    <div className="text-center">
                            <button className="btn btn-success" onClick={editTeam}>Edita Equipo</button>
                    </div>
                </div>
    )
}

export default EditTeam