import React, {useEffect, useState} from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

const TeamTournamentCRUD = () => {
    const [teamTournament, setTeamTournament] = useState([])
    const {store, dispatch} = useGlobalReducer()
    const [isAdmin, setIsAdmin] = useState(false)

    const getTeamTournament = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/team/tournament')
        .then(response => response.json())
        .then(data => {
            dispatch({ type: "get_team_tournament", payload: data })
            setTeamTournament(data)
        })
    }

    const deleteTeamTournament = (id) => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/team/tournament/' + id, {
            method: 'DELETE',
            headers: { 
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        })
        .then(response => {
            if (response.ok) {
                getTeamTournament()
                dispatch({ type: "get_Team_tournament", payload: data })
            }
            else {
                alert('No se puede eliminar el user tournament')
            }
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.role === "admin") {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error("Invalid token", error);
            }
        }
        getTeamTournament()
    }, [])

    return (
        <div className="container my-4">
            <h3 className="display-5 mb-4">Team_Tournament</h3>
            <div>
                {teamTournament.map((team_tournament) => (
                    <p key={team_tournament.id} className="border p-2 d-flex justify-content-between">
                    <Link to={`/team/tournament/${team_tournament.id}`}>{team_tournament.id}</Link>
                    <span className="d-flex justify-content-between gap-2 align-items-center">
                        <span>
                            {isAdmin && (
                            <Link to={`/team/tournament/edit/${team_tournament.id}`}><button className="btn btn-primary" >✎</button></Link>
                            )}
                        </span>
                        {isAdmin && (
                            <button className="btn btn-outline-danger align-self-end" onClick={() => deleteTeamTournament(team_tournament.id)}>X</button>
                        )}
                    </span>
                    </p>
                ))}
            </div>
            <div>
                <Link to="/team/tournament/create">
                    {isAdmin && (
                        <button className="btn btn-success">Crear Team_Tournament</button>
                    )}
                </Link>
            </div>
        </div>
    )
}

export default TeamTournamentCRUD