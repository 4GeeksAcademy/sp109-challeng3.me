import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


const CreateTeam = () => {
    const navigate = useNavigate();
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

    useEffect(() => {
        getUserInfo()
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

    return (
        <div className="container my-4">
                    <h3 className="display-5 mb-4">Crea tu Equipo</h3>
                    <div className="container text-center w-50 my-5 border p-4 d-flex flex-column">
                        <label htmlFor="name" className="mx-2">Nombre</label>
                        <input type="text" name="name" id="name" value={team.name} onChange={(e) => setTeam({ ...team, name: e.target.value })}/>
                        <label htmlFor="img" className="mx-2 mt-4">Link del logo del equipo</label>
                        <input type="text" name="img" id="img" value={team.img} onChange={(e) => setTeam({ ...team, img: e.target.value })}/>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-danger mx-2" onClick={() => navigate("/user/dashboard")}>Atras</button>
                            <button className="btn btn-success mx-2" onClick={addTeam}>Crear Equipo</button>
                    </div>
                </div>
    )
}

export default CreateTeam