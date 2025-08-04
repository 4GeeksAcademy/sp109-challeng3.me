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
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        length: 0,
    })
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
            getUserInfo(userId)
            fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/game/' + userId)
                .then(res => res.json())
                .then(async (userGameLinks) => {
                    if (!Array.isArray(userGameLinks) || userGameLinks.length === 0) {
                        alert("No tienes juegos asociados.")
                        return
                    }

                    // Obtener detalles de todos los juegos por su ID
                    const gameDetailPromises = userGameLinks.map(link =>
                        fetch(import.meta.env.VITE_BACKEND_URL + '/api/game/' + link.videojuego_id)
                            .then(res => res.json())
                    )
                    const gameDetails = await Promise.all(gameDetailPromises);
                    setUserGames(userGameLinks)
                    setGameDetails(gameDetails)
                    console.log("Detalles de juegos del usuario:", gameDetails);

                })
                .catch(err => {
                    console.error("Error al cargar los juegos del usuario:", err);
                });
        }
    }, [])

    const getUserInfo = (userId) => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/' + userId)
            .then(res => res.json())
            .then(data => {
                setUser({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    level: data.level,
                })
            })
            .catch(err => console.error("Error al cargar la información del usuario:", err))
    }
       

    return (
        <div className="container">
            <h1 className="text-center">Welcome {user.name}</h1>
            <p className="text-center"><strong>Email: </strong>{user.email}</p>
            {/* Additional user dashboard content can be added here */}
            <div className="row my-4">
                <div className="col-4 text-center">
                    <h4>Mis juegos</h4>
                    <ul>
                        {gameDetails.length > 0 
                        ? (gameDetails.map((game) => (
                            <li key={game.id} className="border p-1 d-flex align-items-center flex-nowrap">
                                <img 
                                    src={game.img} 
                                    alt={game.name}
                                    className="mini-gameimg p-2 mx-2"
                                    />
                                <span>{game.name}</span>
                            </li>
                        )))
                        : <span className="m-auto">No tienes juegos vinculados,&nbsp;
                        <Link to="/select-game">selecciona tus juego favorito</Link></span>}
                    </ul>
                </div>
                <div className="col-4 text-center border-end border-start">
                    <h4>Mis Equipos</h4> 
                </div>
                <div className="col-4 text-center">
                    <h4>Mis Torneos</h4>
                </div>
            </div>
        </div>
    );
}