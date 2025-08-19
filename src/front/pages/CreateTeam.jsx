import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


const CreateTeam = () => {
    const navigate = useNavigate();
    const [videojuegos, setVideojuegos] = useState([])
    const [userGames, setUserGames] = useState([])
    const [uploading, setUploading] = useState(false)
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
    })
    const [team, setTeam] = useState({
        name: "",
        level: 1,
        premium: false,
        user_id: 0,
        img: "",
        videojuego_id: 0
    })

    const getUserInfo = () => {
        const token = localStorage.getItem("token")
        if (token) {
            const decoded = jwtDecode(token)
            const userId = decoded.sub || null
            fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/' + userId)
                .then(res => res.json())
                .then(data => {
                    setUser({
                        user: data.id,
                        name: data.name,
                        email: data.email,
                    })
                    setTeam({
                        ...team,
                        user_id: data.id
                    })
                })
            }
        else {
            alert('No estás autenticado. Por favor, inicia sesión.')
            navigate('/user/login')
        }
    }

    const getGames = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game") 
        .then(res => res.json())
        .then(data => setVideojuegos(data.videojuego))
        .catch(err => console.error("Error al cargar videojuegos:", err))
    }

    const getUserGames = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/videojuego") 
        .then(res => res.json())
        .then(data => setUserGames(data.user_videojuego))
        .catch(err => console.error("Error al cargar videojuegos:", err))
    }

    useEffect(() => {
        getUserInfo()
        getGames()
        getUserGames()
    }, [])

    const addTeam = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/team', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(team)
        })
        .then(response => {
            if (response.ok) {
                setTeam({
                    name: "",
                    level: 1,
                    premium: false,
                    user_id: 0
                })
                navigate("/user/dashboard")
            }
            else {
                alert('No se puede crear ese equipo')
            }
        })
    }

    const handleImageUpload = async (file) => {
        setUploading(true);
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "Challeng3.me")
        formData.append("cloud_name", "da35l3kmn")

        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/da35l3kmn/image/upload",
                {
                    method: "POST",
                    body: formData
                }
            )
            const data = await res.json()
            setTeam(prev => ({ ...prev, img: data.secure_url }))
        } catch (err) {
            console.error("Error subiendo imagen", err)
        } finally {
            setUploading(false)
        }
    }

    const userGameIds = userGames
    .filter(ug => ug.user_id === user.user)
    .map(ug => ug.videojuego_id)

    const filteredGames = videojuegos.filter(g => userGameIds.includes(g.id))

    return (
        <div className="container m-auto p-5 bg-body h-full">
      
            <div className="row">
                <div className="col-12 mb-4">
                <div className="page-title-box">
                    <div className="page-title">
                    <h5>Crea tu Equipo:</h5>
                    </div>
                </div>
                </div>
            </div>
        
        <div className="row">
            <div className="col-12 col-md-6 d-flex flex-column p-5">
                <i className="fas fa-users text-danger display-1 mx-auto mb-4"></i>
                <span className="text-muted mozilla-headline blackquote mb-2">Forma un grupo con amigos o conoce nuevos compañeros que comparten tu misma pasión por los videojuegos. Diseña tu logo, elige tu nombre y prepárate para enfrentarte a otros equipos en torneos y desafíos.</span>
                <span className="text-muted mozilla-headline blackquote">Tu equipo puede ser pequeño hoy, pero con esfuerzo, estrategia y unión… ¡puede convertirse en una verdadera leyenda!</span>
            </div>
            <div className="col-12 col-md-6">
                <form 
                    className="card p-4"
                    onSubmit={(e) => {
                        e.preventDefault()
                        addTeam()
                    }}
                    style={{ height: "auto" }}>
                    <div class="mb-3">
                        <label class="form-label" htmlFor="name">Nombre del equipo</label>
                        <input class="form-control" type="text" name="name" id="name" value={team.name}
                            onChange={(e) => setTeam({ ...team, name: e.target.value })}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" htmlFor="img">Logo del equipo</label>
                        <input 
                            class="form-control" 
                            type="file" 
                            value="" 
                            name="img" 
                            id="img"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e.target.files[0])}/>
                            {uploading && <p>Subiendo imagen...</p>}
                            {team.img && (
                                <img
                                    src={team.img}
                                    alt="Avatar preview"
                                    style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                                />
                            )}
                    </div>
                    <div class="mb-3">
                        <label class="form-label" htmlFor="game">Nombre del equipo</label>
                        <select
                            className="form-control mt-2"
                            value={team.videojuego_id}
                            onChange={(e) => setTeam({ ...team, videojuego_id: parseInt(e.target.value) })}
                            >
                                <option value="">Selecciona un videojuego</option>
                                {filteredGames.map((vj) => (
                                    <option key={vj.id} value={vj.id}>
                                        {vj.name}
                                    </option>
                                ))}
                            </select>
                    </div>
                    <button className="btn btn-danger mt-3" type="submit">Crear equipo</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default CreateTeam
