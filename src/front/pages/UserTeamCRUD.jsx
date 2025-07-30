import React, {useEffect, useState} from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

const UserTeamCRUD = () => {
    const [userTeam, setUserTeam] = useState([])
    const {store, dispatch} = useGlobalReducer()

    const getUserTeam = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user/team')
        .then(response => response.json())
        .then(data => {
            dispatch({ type: "get_user_team", payload: data })
            setUserTeam(data)
        })
    }

    const deleteUserTeam = (id) => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/team/' + id, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                getUserTeam()
                dispatch({ type: "get_user_team", payload: data })
            }
            else {
                alert('No se puede eliminar el user team')
            }
        })
    }

    useEffect(() => {getUserTeam()}, [])

    return (
        <div className="container my-4">
            <h3 className="display-5 mb-4">User_Team</h3>
            <div>
                {userTeam.map((user_team) => (
                    <p key={user_team.id} className="border p-2 d-flex justify-content-between">
                    <Link to={`/user/team/${user_team.id}`}>{user_team.id}</Link>
                    <span className="d-flex justify-content-between gap-2 align-items-center">
                        <span>
                            <Link to={`/user/team/edit/${user_team.id}`}><button className="btn btn-primary" >✎</button></Link>
                        </span>
                        <button className="btn btn-outline-danger align-self-end" onClick={() => deleteUserTeam(user_team.id)}>X</button>
                    </span>
                    </p>
                ))}
            </div>
            <div>
                <Link to="/user/team/create">
                    <button className="btn btn-success">Crear User_Team</button>
                </Link>
            </div>
        </div>
    )
}

export default UserTeamCRUD