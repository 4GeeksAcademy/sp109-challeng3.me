import React, { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const SingleTeam = () => {
    const [team ,setTeam] = useState([])
    const { team_id } = useParams()
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const [owner, setOwner] = useState(true)
    const [ownerData, setOwnerData] = useState([])

    const getTeam = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/team/' + team_id)
        .then(response => response.json())
        .then(data => {
            setTeam(data)
        })
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

    const deleteTeam = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/team/' + team_id, {
            method: 'DELETE'
        })
    }

    const getOwner = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/' + team.user_id)
        .then(res => res.json())
        .then(data => {
            setOwnerData(data)
        })
    }

    useEffect(() => {
        getTeam()
        getUserInfo()

    }, [])

    useEffect(() => {
    if (team && user && team.user_id !== user.id) {
        setOwner(false)
        getOwner()
    } else if (team && user && team.user_id === user.id) {
        setOwner(true)
    }
    }, [team, user])

    return (
        <div className="container text-center w-50 my-5 border p-4">
            {team === null ? <Navigate to="/user/dashboard" /> : null}
            <img src={team.img} alt="Team Logo" className="gameimg mb-3" />
            <h3>{team.name}</h3>
            <p>Level: {team.level}</p>
            <p>Premium: {team.premium ? "Premium" : "Free"}</p>
            {owner ? (
                <p>Founder: {user.username}</p>
            ) : (
                <p>Founder: {ownerData.username}</p>
            )}
            <p>Members: </p>
            <ul></ul>
            <button className="btn btn-primary mx-2" onClick={() => navigate("/user/dashboard")}>Atras</button>
            {owner && (<>
                <button className="btn btn-secondary mx-2" onClick={() => navigate("/team/edit/" + team_id)}>Editar Equipo</button>
                <button className="btn btn-danger mx-2" onClick={() => navigate("/team/aplication/" + team_id)}>Solicitudes</button>
                <button className="btn btn-danger mx-2" onClick={() => navigate("/user/dashboard")}>Eliminar</button>
            </>)}

        </div>
    )
}

export default SingleTeam