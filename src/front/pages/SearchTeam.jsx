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

    const gamesPlayedByThisUser = userGames.filter(g => user.id == g.user_id)
    const userGameIds = gamesPlayedByThisUser.map(g => g.videojuego_id);

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
    <div className="container m-auto p-5 bg-body h-full">
        <div className="row">
            <div className="col-12 mb-4">
                <div className="page-title-box">
                    <div className="page-title">
                        <h5>Selecciona un Equipo para solicitar unirte</h5>
                 </div>
                 </div>
            </div>
        </div>
        <div className="row">
            <div className="table-responsive rounded shadow px-0">
                <table className="mb-0 table table-hover align-middle">
                    <tbody >
                        {filteredTeams.map(t => {
                            const game = games.find(g => g.id === t.videojuego_id);
                            const pendingRequest = userTeams.some(ut => ut.team_id === t.id && ut.status === "pending")
                            return (
                            <tr key={t.id} className="bg-body-secondary p-2" onClick={() => navigate(`/team/${t.id}`)}>
                                <td className="pt-3">
                                    <img className="mini-gameimg mx-2" src={t.img} alt={t.name} style={{border: "0.5px solid grey"}} />
                                </td>
                                <td className="my-1">
                                    <h5 className="font-14 pt-2 ps-2">{t.name}</h5>
                                    <span className="font-13 text-muted ps-2">{game ? game.name : "Desconocido"}</span>
                                </td>
                                <td className="my-1 ">
                                    <h5 className="text-muted font-14">Nivel del equipo: {t.level}</h5>
                                    <span className="text-muted font-14">Premium: {t.premium ? "Sí" : "No"}</span>
                                </td>
                                <td className="text-end p-4 font-14">
                                        {pendingRequest ? (
                                        <span className="text-danger">Solicitud pendiente</span>
                                    ) : (
                                        <button className="btn btn-danger" onClick={() => inscribirseAlEquipo(team.id)}>Solicitar unirse</button>   
                                    )}             
                                </td>
                            </tr>)}
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    )
}