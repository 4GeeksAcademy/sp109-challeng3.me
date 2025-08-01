import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleTeamTournament = () => {
    const [teamTournament ,setTeamTournament] = useState([])
    const { id } = useParams()

    const getTeamTournament = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/team/tournament/' + id)
        .then(response => response.json())
        .then(data => {
            setTeamTournament(data)
        })
    }

    useEffect(() => {getTeamTournament()}, [])

    return (
        <div className="container text-center w-50 my-5 border p-4">
            <h3 className="mb-3">ID: {teamTournament.id}</h3>
            <p>Team: {teamTournament.team_id}</p>
            <p>Tournament: {teamTournament.tournament_id}</p>
        </div>
    )
}

export default SingleTeamTournament