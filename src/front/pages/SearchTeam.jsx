import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function SearchTeam() {
    const [teams, setTeams] = useState([])
    const [user, setUser] = useState({})
    const [userGames, setUserGames] = useState([])
    const [games, setGames] = useState([])
    const [userTeams, setUserTeams] = useState([])
    const navigate = useNavigate()


    const getTeams = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/team")
            .then(res => res.json())
            .then(data => {
                setTeams(data)
            })
            .catch(err => console.error("Error al cargar equipos:", err));
    }

    const getUserInfo = () => {
        const token = localStorage.getItem("token")
        if (token) {
            const decoded = jwtDecode(token)
            const userId = decoded.sub || null
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/' + userId)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
        }
    }

    const getGames = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game")
            .then(res => res.json())
            .then(data => {
                setGames(data.videojuego || [])
            })
        }
    
    const getUserGames = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/videojuego/')
            .then(res => res.json())
            .then(data => {
                setUserGames(data.user_videojuego || [])
            })
            .catch(err => console.error("Error al cargar los juegos del usuario:", err));
    }

    const getUserTeams = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/team/')
            .then(res => res.json())
            .then(data => {
                setUserTeams(data || [])
            })
    }
    const inscribirseAlEquipo = (teamId) => {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("Debes iniciar sesión para unirte a un equipo.")
            navigate("/user/login")
            return;
        }
        fetch(import.meta.env.VITE_BACKEND_URL + `/api/user/team/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                user_id: user.id,
                team_id: teamId,
            })
        })
        .then(response => {
            getUserTeams()
        })
    }

    useEffect(() => {
        getTeams()
        getUserInfo()
        getUserGames()
        getGames()
        getUserTeams()
    }, []);

    const userGameIds = userGames.map(g => g.videojuego_id);

    const filteredTeams = teams.filter(team => {
        // Evitar mostrar los equipos del propio usuario
        if (team.user_id === user.id) return false;

        // Ocultar equipos donde el usuario ya fue aceptado
        const alreadyAccepted = userTeams.some(ut => ut.team_id === team.id && ut.status === "accepted");
        if (alreadyAccepted) return false;

        // Solo mostrar equipos que juegan a los mismos juegos que el usuario
        return userGameIds.includes(team.videojuego_id);
    });

    return (
        <div className="container mt-5">
            <h1 className="text-center">Buscar Equipos</h1>
            <p className="text-center">Aquí podrás buscar equipos que jueguen los mismos juegos que tu.</p>
            <ul>
                {
                filteredTeams.map(team => {
                    const game = games.find(g => g.id === team.videojuego_id);
                    const pendingRequest = userTeams.some(ut => ut.team_id === team.id && ut.status === "pending");

                    return (
                        <li key={team.id} className="border p-2">
                            <div className="d-flex justify-content-between align-items-center flex-nowrap">
                                <img src={team.img} alt={team.name} className="mini-gameimg p-2 mx-2" />
                                <h4>{team.name}</h4>
                                <div className="d-flex flex-column align-items-end">
                                    <span>Nivel: {team.level}</span>
                                    <span>Premium: {team.premium ? "Sí" : "No"}</span>
                                </div>
                                <p>{game ? game.name : "Desconocido"}</p>

                                {pendingRequest ? (
                                    <span className="text-warning">Solicitud pendiente</span>
                                ) : (
                                    <button className="btn btn-warning" onClick={() => inscribirseAlEquipo(team.id)}>Solicitar unirse</button>   
                                )}

                                <Link to={`/team/${team.id}`} className="btn btn-primary">
                                    <i className="fa-solid fa-eye"></i>
                                </Link>   
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>

    )
}