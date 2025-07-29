import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleTeam= () => {
    const [team ,setTeam] = useState([])
    const { team_id } = useParams()

    const getTeam = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/team/' + team_id)
        .then(response => response.json())
        .then(data => {
            setTeam(data)
        })
    }

    useEffect(() => {getTeam()}, [])

    return (
        <div className="container text-center w-50 my-5 border p-4">
            <h3>{team.name}</h3>
            <p>Level: {team.level}</p>
            <p>Premium: {team.premium}</p>
            <p>Founder: {team.user_id}</p>
        </div>
    )
}

export default SingleTeam