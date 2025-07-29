import React, {useEffect, useState} from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

const TeamCRUD = () => {
    const [teams, setTeams] = useState([])
    const {store, dispatch} = useGlobalReducer()

    const getTeams = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/team')
        .then(response => response.json())
        .then(data => {
            dispatch({ type: "get_teams", payload: data })
            setTeams(data)
        })
    }

    const deleteTeam = (id) => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/team/' + id, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                getTeams()
                dispatch({ type: "get_teams", payload: data })
            }
            else {
                alert('No se puede eliminar el equipo')
            }
        })
    }

    useEffect(() => {getTeams()}, [])

    return (
        <div className="container my-4">
            <h3 className="display-5 mb-4">Teams</h3>
            <div>
                {teams.map((team) => (
                    <p key={team.id} className="border p-2 d-flex justify-content-between">
                    <Link to={`/team/${team.id}`}>{team.name}</Link>
                    <span className="d-flex justify-content-between gap-2 align-items-center">
                        <span>
                            <Link to={`/team/edit/${team.id}`}><button className="btn btn-primary" >✎</button></Link>
                        </span>
                        <button className="btn btn-outline-danger align-self-end" onClick={() => deleteTeam(team.id)}>X</button>
                    </span>
                    </p>
                ))}
            </div>
            <div>
                <Link to="/team/create">
                    <button className="btn btn-success">Crear Equipo</button>
                </Link>
            </div>
        </div>
    )
}

export default TeamCRUD