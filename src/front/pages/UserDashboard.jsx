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
    const [filteredTournaments, setFilteredTournaments] = useState([])
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
                localStorage.removeItem("token")
                navigate('/user/login')
            }
        } else {
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

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const decoded = jwtDecode(token)
            const uid = decoded.sub || null
            
            fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/' + uid + '/videogame-tournaments')
            .then(res => res.json())
            .then(data => setFilteredTournaments(data))
        }
    }, [])

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

    const addUserTournament = (tournamentId) => {
        if (!user || !user.id) {
            alert("Error: No se ha podido identificar al usuario.");
            return;
        }

        const payload = {
        tournament_id: tournamentId,
        user_id: user.id
        };

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/tournament`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
        })
        .then((response) => {
            if (response.ok) {
            alert("¡Te has unido al torneo con éxito!")
            } else {
            response.json().then(err => alert(`No se pudo unir al torneo: ${err.message || 'Error desconocido'}`))
            }
        })
        .catch((err) => console.error("Error al unirse al torneo:", err))
    }

    const onlyInscribed = filteredTournaments.filter(t => t.is_registered == true)

    return (
        <div className="container bg-body">
            <div className="d-flex justify-content-center align-items-center gap-4 my-5 bg-body-secondary m-auto p-4 rounded shadow" style={{ width: "fit-content" }}>
                <div className="constainer border-end p-4">
                    <img
                        src={user.img ? user.img : "https://static.vecteezy.com/system/resources/previews/023/465/688/non_2x/contact-dark-mode-glyph-ui-icon-address-book-profile-page-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg"}
                        alt={user.username}
                        className="gameimg"
                    />
                </div>
                <div className="align-items-left text-emphasis">
                    <h1>Welcome {user.username}</h1>
                    <p><strong>Email: </strong>{user.email}</p>
                    <p><strong>Nivel: </strong>{user.level}</p>
                    <div className="text-center">
                        <button className="btn btn-danger h-25 text-8" onClick={() => navigate(`/edit/user/${user.id}`)}>Editar perfil</button>
                    </div>
                </div>
            </div>

            <div className="row my-4 d-flex flex-wrap">
                <div className="col-12 col-md-6 col-lg-4 text-center">
                    <h4 className="text-start text-uppercase">Mis juegos</h4>
                    <div className="row">
                        {gameDetails.length > 0 
                            ? gameDetails.map((game) => (
                                <div key={game.id} className="col-6">
                                <div className="card widget-flat bg-body-secondary p-1 text-center">
                                    <div className="card-body">
                                    <img 
                                        src={game.img} 
                                        alt={game.name}
                                        className="mini-gameimg p-2 mx-auto row mb-2"
                                    />
                                    <span>{game.name}</span>
                                    </div>
                                </div>
                                </div>
                            ))
                            : <span className="m-auto">No tienes juegos vinculados.</span>}
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 text-center b-md-start b-lg-end">
                    <h4 className="text-start text-uppercase">Mis Equipos</h4>
                    <div className="row g-3">
                        {userTeams.length > 0 
                            ? userTeams.map((team) => (
                                <div key={team.id} className="col-6">
                                    <Link to={`/team/${team.id}`} className="no-link">
                                        <div className="card widget-flat bg-body-secondary p-1 text-center">
                                            <div className="card-body">
                                                <img 
                                                    src={team.img} 
                                                    alt={team.name}
                                                    className="mini-gameimg p-2 mx-auto mb-2"
                                                />
                                                <span className="d-block fw-bold">{team.name}</span>
                                                <div className="mt-2">
                                                    <span className="small-text">Nivel: {team.level}</span>
                                                    &nbsp;
                                                    <span className="small-text">{team.premium ? "Premium" : "Free"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )) 
                            : <span className="m-auto">No tienes equipos creados</span>
                        }
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 text-center">
                    <h4 className="text-start text-uppercase">Otros Equipos</h4>
                    <div className="row g-3">
                        {otherTeams.length > 0 ? (
                            otherTeams.map((team, index) => {
                            const myOtherTeam = allTeams.find(
                                ut => ut.id === team.team_id && team.status === "accepted"
                            );

                            if (!myOtherTeam) return null;

                            return (
                                <div key={index} className="col-6">
                                <Link to={`/team/${team.id}`} className="no-link">
                                    <div className="card widget-flat bg-body-secondary p-1 text-center">
                                    <div className="card-body">
                                        <img
                                        src={myOtherTeam.img}
                                        alt={myOtherTeam.name}
                                        className="mini-gameimg p-2 mx-auto mb-2"
                                        />
                                        <span className="d-block fw-bold">{myOtherTeam.name}</span>
                                        <div className="mt-2">
                                        <span className="small-text">Nivel: {myOtherTeam.level}</span>
                                        &nbsp;
                                        <span className="small-text">{myOtherTeam.premium ? "Premium" : "Free"}</span>
                                        </div>
                                        {myOtherTeam.status === "pending" && (
                                        <div className="mt-2 text-warning">Solicitud pendiente</div>
                                        )}
                                    </div>
                                    </div>
                                </Link>
                                </div>
                            );
                            })
                        ) : (
                            <span className="m-auto">No participas en ningún otro equipo</span>
                    )}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center w-100 mb-3">
                <div className="w-100 mt-4">
                <h4 className="text-start text-uppercase">Torneos inscritos</h4>
                    <div className="table-responsive rounded shadow">
                        <table className="mb-0 table table-hover align-middle">
                            <tbody >
                                {onlyInscribed.map(t => (
                                <tr key={t.id} className="bg-body-secondary p-2">
                                        <td className="my-1 ">
                                            <h5 className="font-14 ps-3">{t.name}</h5>
                                            <span className="font-13 text-muted ps-3">{t.type}</span>
                                        </td>
                                        <td className="my-1">
                                            <span className="text-muted font-14">Nivel necesario: {t.level}</span>
                                        </td>
                                        <td >
                                            <img className="mini-gameimg mx-2" src={t.videojuego_img} alt={t.videojuego_name} />
                                        </td>
                                        <td className="text-end pe-3 font-14">
                                            {t.is_registered ? (
                                            <span className="text-danger"><i className="bi bi-check-circle-fill"></i> Inscrito</span>
                                            ) : (
                                            <button className="btn btn-light" onClick={() => addUserTournament(t.id)}>Unirse</button>
                                            )}                  
                                        </td>
                                    </tr>)
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}