import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { jwtDecode } from "jwt-decode";

export default function UserDashboard() {
    const { store } = useGlobalReducer()
    const [isUser, setIsUser] = useState(store.user_auth)
    const [userTeams, setUserTeams] = useState([])
    const [userGames, setUserGames] = useState([])
    const [gameDetails, setGameDetails] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const decoded = jwtDecode(token)
            const currentTime = Math.floor(Date.now() / 1000); // tiempo actual en segundos

            if (decoded.exp && decoded.exp < currentTime) {
                alert('Token expirado. Por favor, inicia sesión nuevamente.');
                localStorage.removeItem("token")
                navigate('/user/login')
            }
        } else {
            alert('No estás autenticado. Por favor, inicia sesión.');
            navigate('/user/login')
        }
    }, [navigate])

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const decoded = jwtDecode(token)
            const userId = decoded.sub || null
            fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/game/' + userId)
                .then(res => res.json())
                .then(async (userGameLinks) => {
                    console.log(userGameLinks)
                    if (!Array.isArray(userGameLinks) || userGameLinks.length === 0) {
                        alert("No tienes juegos asociados.")
                        return
                    }

                    // Obtener detalles de todos los juegos por su ID
                    const gameDetailPromises = userGameLinks.map(link =>
                        fetch(import.meta.env.VITE_BACKEND_URL + '/api/game/' + link.game_id)
                            .then(res => res.json())
                    );

                    const gameDetails = await Promise.all(gameDetailPromises);
                    setUserGames(gameDetails);
                })
                .catch(err => {
                    console.error("Error al cargar los juegos del usuario:", err);
                });
        }
    }, [])

    return (
        <div className="container">
            <h1 className="text-center">User Dashboard</h1>
            <p className="text-center">Welcome to your dashboard! Here you can manage your profile, view your activities, and more.</p>
            {/* Additional user dashboard content can be added here */}
            <div className="row">
                <div className="col-4 text-center">
                    <h4>Mis juegos</h4>
                    <ul>
                        {userGames.length > 0 
                        ? (userGames.map((game, index) => (
                            <li key={index}>
                                <h3>{game.name}</h3>
                                <p>{game.description}</p>
                            </li>
                        )))
                        : <span className="m-auto">No tienes juegos vinculados, 
                        <Link to="/select-game">selecciona tus juego favorito</Link></span>}
                    </ul>
                </div>
                <div className="col-4">
                    
                </div>
                <div className="col-4">
                    
                </div>
            </div>
        </div>
    );
}