import React, {useState, useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const TeamAplication = () => {
    const navigate = useNavigate()
    const [userTeams, setUserTeams] = useState([])
    const { team_id } = useParams()
    const [users, setUsers] = useState([])
    const [teams, setTeams] = useState([])

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

    const getTeams = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/team/')
            .then(res => res.json())
            .then(data => {
                setTeams(data || [])
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
        getTeams()
    }, [])

    const filteredTeams = userTeams.filter(team => team.team_id === parseInt(team_id) && team.status === "pending")
    console.log(users)

    return (
        <div className="container m-auto p-5 bg-body h-full">
      
            <div className="row">
                <div className="col-12 mb-4">
                <div className="page-title-box">
                    <div className="page-title">
                    <h5>Solicitudes de tu equipo</h5>
                    </div>
                </div>
                </div>
            </div>
                {filteredTeams.length > 0 ? (
                    filteredTeams.map((team, index) => (
                            <div className="card p-4 d-flex flex-row flex-wrap align-items-center justify-content-between" style={{ height: "auto" }} key={index}>
                                <div className="col-12 col-md-2 d-flex flex-column justify-content-center" >
                                <img src={users.find(user => user.id === team.user_id)?.img || "https://static.vecteezy.com/system/resources/previews/023/465/688/non_2x/contact-dark-mode-glyph-ui-icon-address-book-profile-page-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg"} alt="Team Logo" className="gameimg mb-3" />
                                <p className="text-danger text-center" style={{width: "100px"}}>{teams.find(t => t.id === team.team_id)?.name || "Desconocido"}</p>
                                </div>
                                <div className="col-12 col-md-5 d-flex flex-column">
                                    <h3 className="text-danger">{users.find(user => user.id === team.user_id)?.username || "Desconocido"}</h3>
                                    <div className="d-flex gap-3">
                                        <p>Nivel: {users.find(user => user.id === team.user_id)?.level || "Desconocido"}</p>
                                        <p>Premium: {users.find(user => (user.id === team.user_id)?.premium) ? "Premium" : "Free"}</p>
                                        <p>Puntos: {users.find(user => user.id === team.user_id)?.points}</p>
                                        <p>Estado: {team.status}</p>
                                    </div>

                                </div>
                                <div className="col-12 col-md-2 d-flex flex-column gap-3">
                                    <button className="btn btn-outline-danger mx-2" onClick={() => navigate(`/user/${team.user_id}`)}>Ver Usuario</button>
                                    <button className="btn btn-success mx-2" onClick={() => aceptAplication(team.id)}>Aceptar</button>
                                    <button className="btn btn-danger mx-2" onClick={() => deniegAplication(team.id)}>Denegar</button>
                                </div>
                            </div>
                        ))
                ) : (
                    <p>No hay solicitudes pendientes.</p>
                )}
                <Link to={(-1)}>
                    <button className="btn btn-danger">Atras</button>
                </Link>
        </div>
     
    )
}

export default TeamAplication;