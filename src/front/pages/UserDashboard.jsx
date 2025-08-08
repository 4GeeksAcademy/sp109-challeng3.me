import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { jwtDecode } from "jwt-decode";
import { use } from "react";
import EditUserModal from "../components/EditUserModal.jsx"

export default function UserDashboard() {
    const { store } = useGlobalReducer()
    const [isUser, setIsUser] = useState(store.user_auth)
    const [userTeams, setUserTeams] = useState([])
    const [otherTeams, setOtherTeams] = useState([])
    const [userGames, setUserGames] = useState([])
    const [gameDetails, setGameDetails] = useState([])
    const [allTeams, setAllTeams] = useState([])
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        length: 0,
    })
    const navigate = useNavigate()

    const checkToken = () => {
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
    }

    const fetchUserGames = () => {
        const token = localStorage.getItem("token")
        if (token) {
            const decoded = jwtDecode(token)
            const userId = decoded.sub || null
            getUserInfo(userId)
            fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/game/' + userId)
                .then(res => res.json())
                .then(async (userGameLinks) => {
                    if (!Array.isArray(userGameLinks) || userGameLinks.length === 0) {
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
                })
        }
    }

    const getUserInfo = (userId) => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/' + userId)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
            .catch(err => console.error("Error al cargar la información del usuario:", err))
    }
    const fetchUserTeams = () => {
        const token = localStorage.getItem("token")
        if (token) {
            const decoded = jwtDecode(token)
            const userId = decoded.sub || null
            fetch(import.meta.env.VITE_BACKEND_URL + '/api/team/user/' + userId)
                .then(res => res.json())
                .then(data => {
                    setUserTeams(data)
                })
                .catch(err => console.error("Error al cargar los equipos del usuario:", err))
        }
    }

    const getUserTeams = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/team-by-user/' + user.id)
            .then(res => res.json())
            .then(data => {
                setOtherTeams(data || [])
            })
    }

    const getAllTeams = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/team/')
            .then(res => res.json())
            .then(data => {
                setAllTeams(data || [])
            })
    }

    useEffect(() => {
        checkToken()
        fetchUserGames()
        fetchUserTeams()
        getAllTeams()
    }, [navigate])


    useEffect(() => {
    if(user.id) {
        getUserTeams()
    }
    }, [user.id])

       

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center gap-4 my-4">
                <div className="constainer border-end p-4">
                    <img
                        src={user.img}
                        alt={user.username}
                        className="gameimg"
                    />
                </div>
                <div className="align-items-left">
                    <h1>Welcome {user.username}</h1>
                    <p><strong>Email: </strong>{user.email}</p>
                    <p><strong>Nivel: </strong>{user.level}</p>
                    <div className="text-center">
                        <EditUserModal userId={user.id} onUserModified={getUserInfo}/>
                    </div>
                </div>
            </div>
            
            {/* Additional user dashboard content can be added here */}
            <div className="row my-4">
                <div className="col-4 text-center">
                    <h4 className="text-start text-uppercase">Mis juegos</h4>
                    <ul className="m-0 p-0">
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
                    {gameDetails.length > 0 && (
                    <button className="btn btn-success mt-2" onClick={() => navigate("/select-game")}>Selecciona más juegos</button>)}
                </div>
                <div className="col-4 text-center border-end border-start">
                    <h4 className="text-start text-uppercase">Mis Equipos</h4>
                    <ul className="m-0 p-0">
                        {userTeams.length > 0 
                        ? (userTeams.map((team) => (
                            <Link to={`/team/${team.id}`} className="no-link" key={team.id}>
                                <li key={team.id} className="border p-1 d-flex align-items-center flex-nowrap justify-content-between">
                                    <img 
                                        src={team.img} 
                                        alt={team.name}
                                        className="mini-gameimg p-2 mx-2"
                                        />
                                    <span>{team.name}</span>
                                    <div className="d-flex flex-column mx-2">
                                        <span className="mx-2 small-text">Nivel: {team.level}</span>
                                        <span className="mx-2 small-text">{team.premium ? "Premium" : "Free"}</span>
                                    </div>
                                </li>
                            </Link>
                        ))) 
                        : <span className="m-auto">No tienes equipos creados</span>}
                    </ul>
                    <div className="d-flex justify-content-around mt-3">
                        <Link to="/team/create">
                            <button className="btn btn-success">Crear Equipo</button>
                        </Link>
                    </div>
                </div>
                <div className="col-4 text-center">
                    <h4 className="text-start text-uppercase">Otros Equipos</h4>
                    <ul className="m-0 p-0">
                        {otherTeams.length > 0 ? (
                            otherTeams.map((team, index) => {
                                const myOtherTeam = allTeams.find(ut => ut.id === team.team_id && team.status == "accepted")

                                if (!myOtherTeam) return null

                                return (
                                    <Link to={`/team/${team.id}`} className="no-link" key={index}>
                                        <li key={index} className="border p-1 d-flex align-items-center flex-nowrap justify-content-between">
                                            <img 
                                                src={myOtherTeam.img} 
                                                alt={myOtherTeam.name}
                                                className="mini-gameimg p-2 mx-2"
                                            />
                                            <span>{myOtherTeam.name}</span>
                                            <div className="d-flex flex-column mx-2">
                                                <span className="mx-2 small-text">Nivel: {myOtherTeam.level}</span>
                                                <span className="mx-2 small-text">{myOtherTeam.premium ? "Premium" : "Free"}</span>
                                            </div>
                                            {myOtherTeam && myOtherTeam.status === "pending" && (
                                                <span className="text-warning">Solicitud pendiente</span>
                                            )}
                                        </li>
                                    </Link>
                                )
                            })    
                        ) : (
                            <span className="m-auto">No participas en ningún otro equipo</span>
                        )}
                    </ul>
                    <Link to="/search/team">
                        <button className="btn btn-info my-2">Unirse a un Equipo</button>
                    </Link>
                </div>
            </div>
            <div className="container">
                <h4>Mis Torneos</h4>
                <div>

                </div>
                <button className="btn btn-info">Buscar Torneos</button>
            </div>
        </div>
    );
}