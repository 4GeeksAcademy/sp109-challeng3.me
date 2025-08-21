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
        <div className="container p-5 bg-body h-full d-flex justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className="card p-4 d-flex flex-column align-items-center" style={{ height: "auto" }}>
                            <img src={user.img} alt="user img" className="gameimg mb-3 mt-3" />
                            <h3 className="text-danger">{user.username}</h3>
                            <div className="row mt-2">
                                <div className="col">
                                    <p><strong>Nivel: </strong>{user.level}</p>
                                    <p>{user.premium ? "Premium" : "Free"}</p>
                                </div>
                                <div className="col">
                                    <p><strong>Puntos: </strong>{user.points}</p>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                            <div className="d-flex gap-4 w-50 flex-wrap justify-content-center my-2">
                                <button className="btn btn-outline-danger mb-2" onClick={() => navigate(-1)}>Atras</button>
                            </div>
                        </div>
        
                    </div>
                </div>
    )
}

export default SingleUser