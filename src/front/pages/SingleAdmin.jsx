import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleAdmin = () => {
    const [admin ,setAdmin] = useState([])
    const { admin_id } = useParams()

    const getAdmin = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/admin/' + admin_id)
        .then(response => response.json())
        .then(data => {
            setAdmin(data)
        })
    }

    useEffect(() => {getAdmin()}, [])

    return (
        <div className="container text-center w-50 my-5 border p-4">
            <h3>{admin.username}</h3>
            <p>{admin.email}</p>
        </div>
    )
}

export default SingleAdmin