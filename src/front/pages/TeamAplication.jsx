import React, {useState, useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const TeamAplication = () => {
    const navigate = useNavigate()
    const [userTeams, setUserTeams] = useState([])
    const { team_id } = useParams()
    const [users, setUsers] = useState([])

    const getUserTeams = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/team/')
            .then(res => res.json())
            .then(data => {
                setUserTeams(data || [])
            })
    }

    const getUsers = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/')
            .then(res => res.json())
            .then(data => {
                setUsers(data || [])
            })
    }

    const aceptAplication = (id) => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/team/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: "accepted" })
        })
        .then(response => {
            if (response.ok) {
                alert("Solicitud aceptada correctamente.")
                getUserTeams()
            } else {
                alert("Error al aceptar la solicitud.")
            }
        })
    }

    const deniegAplication = (id) => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/team/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: "denied" })
        })
        .then(response => {
            if (response.ok) {
                alert("Solicitud denegada correctamente.")
                getUserTeams()
            } else {
                alert("Error al denegar la solicitud.")
            }
        })
    }

    useEffect(() => {
        getUserTeams()
        getUsers()
    }, [])

    const filteredTeams = userTeams.filter(team => team.team_id === parseInt(team_id) && team.status === "pending")

    return (
        <div className="container text-center my-5">
            <h1>Solicitudes de Equipo</h1>
            <p>Aquí podrás ver y gestionar las solicitudes de unirse a tu equipo.</p>
            <div>
                {filteredTeams.length > 0 ? (
                    <ul className="list-group">
                        {filteredTeams.map((team, index) => (
                            <li key={index} className="list-group-item">
                                <p><strong>Usuario:</strong> {users.find(user => user.id === team.user_id)?.username || "Desconocido"}</p>
                                <p>Estado: {team.status}</p>
                                <button className="btn btn-info mx-2" onClick={() => navigate(`/user/${team.user_id}`)}>Ver Usuario</button>
                                <button className="btn btn-success mx-2" onClick={() => aceptAplication(team.id)}>Aceptar</button>
                                <button className="btn btn-danger mx-2" onClick={() => deniegAplication(team.id)}>Denegar</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay solicitudes pendientes.</p>
                )}
                <Link to={`/team/${team_id}`}>
                    <button className="btn btn-danger">Atras</button>
                </Link>
            </div>
        </div>
    )
}

export default TeamAplication;