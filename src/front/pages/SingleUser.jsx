import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleUser = () => {
    const [user ,setUser] = useState([])
    const { user_id } = useParams()

    const getUser = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user/' + user_id)
        .then(response => response.json())
        .then(data => {
            setUser(data)
        })
    }

    useEffect(() => {getUser()}, [])

    return (
        <div className="container text-center w-50 my-5 border p-4">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            <p>level: {user.level}</p>
            <p>points: {user.points}</p>
            <p>premium: {user.premium}</p>
            <p>premium_end_date: {user.premium_end_date}</p>
        </div>
    )
}

export default SingleUser