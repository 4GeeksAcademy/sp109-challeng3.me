import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleUserTeam= () => {
    const [userTeam ,setUserTeam] = useState([])
    const { id } = useParams()

    const getUserTeam = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user/team/' + id)
        .then(response => response.json())
        .then(data => {
            setUserTeam(data)
        })
    }

    useEffect(() => {getUserTeam()}, [])

    return (
        <div className="container text-center w-50 my-5 border p-4">
            <h3 className="mb-3">ID: {userTeam.id}</h3>
            <p>Team: {userTeam.team_id}</p>
            <p>User: {userTeam.user_id}</p>
        </div>
    )
}

export default SingleUserTeam