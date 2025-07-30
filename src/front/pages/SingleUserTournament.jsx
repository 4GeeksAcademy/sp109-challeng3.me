import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleUserTournament = () => {
    const [userTournament ,setUserTournament] = useState([])
    const { id } = useParams()

    const getUserTournament = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user/tournament/' + id)
        .then(response => response.json())
        .then(data => {
            setUserTournament(data)
        })
    }

    useEffect(() => {getUserTournament()}, [])

    return (
        <div className="container text-center w-50 my-5 border p-4">
            <h3 className="mb-3">ID: {userTournament.id}</h3>
            <p>Tournament: {userTournament.tournament_id}</p>
            <p>User: {userTournament.user_id}</p>
        </div>
    )
}

export default SingleUserTournament