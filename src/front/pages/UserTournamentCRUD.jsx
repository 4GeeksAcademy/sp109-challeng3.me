import React, {useEffect, useState} from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

const UserTournamentCRUD = () => {
    const [userTournament, setUserTournament] = useState([])
    const {store, dispatch} = useGlobalReducer()
    const [isAdmin, setIsAdmin] = useState(false)

    const getUserTournament = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user/tournament')
        .then(response => response.json())
        .then(data => {
            dispatch({ type: "get_user_tournament", payload: data })
            setUserTournament(data)
        })
    }

    const deleteUserTournament = (id) => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/tournament/' + id, {
            method: 'DELETE',
            headers: { 
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        })
        .then(response => {
            if (response.ok) {
                getUserTournament()
                dispatch({ type: "get_user_tournament", payload: data })
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
        getUserTournament()
    }, [])

    return (
        <div className="container my-4">
            <h3 className="display-5 mb-4">User_Tournament</h3>
            <div>
                {userTournament.map((user_tournament) => (
                    <p key={user_tournament.id} className="border p-2 d-flex justify-content-between">
                    <Link to={`/user/tournament/${user_tournament.id}`}>{user_tournament.id}</Link>
                    <span className="d-flex justify-content-between gap-2 align-items-center">
                        <span>
                        {isAdmin && (
                            <Link to={`/user/tournament/edit/${user_tournament.id}`}><button className="btn btn-primary" >✎</button></Link>
                        )}
                        </span>
                        {isAdmin && (
                            <button className="btn btn-outline-danger align-self-end" onClick={() => deleteUserTournament(user_tournament.id)}>X</button>
                        )}
                    </span>
                    </p>
                ))}
            </div>
            <div>
                <Link to="/user/tournament/create">
                    {isAdmin && (
                        <button className="btn btn-success">Crear User_Tournament</button>
                    )}
                </Link>
            </div>
        </div>
    )
}

export default UserTournamentCRUD