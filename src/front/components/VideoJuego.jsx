import React, { useEffect,useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

export const Videojuego = () => {

 const { store, dispatch } = useGlobalReducer()
 const [videojuegos, setVideojuegos] = useState ([])
 const [isAdmin, setIsAdmin] = useState(false)

      function getVideojuego (){
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/game")
        .then((Response)=>Response.json())
        .then((data) =>{
            setVideojuegos(data.videojuego);
            dispatch({
                type: "list_videojuego",
                payload: {juego:data.videojuego},
            });
        })
        
    }

    useEffect (()=>{
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.role === "admin") {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error("Invalid token", error);
            }
        }   
        getVideojuego ()
        console.log(store.videojuego)
    },[]);

    function deleteVideojuego (videojuego_id) {
        const token = localStorage.getItem('token');
        const requestOptions = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         },
        redirect: "follow"
        };

            fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/" + videojuego_id, requestOptions)
            .then((response) => response.text())
            .then((result) => getVideojuego())
    }

    return (
        <div className="text-center mt-5">
            <div className="d-flex justify-content-between w-50 m-auto">
            <h1 className="display-4">Videojuegos</h1>
              <Link to="/createVideoJuego">
            {isAdmin && (
                <button className="btn btn-success mt-4">Create videojuego</button>
            )}
              </Link>
            </div>
            {videojuegos.map((videojuego) => (
                <div key={videojuego.id} className="card mb-3 w-50 m-auto">
                    <div className="d-flex align-items-center position-relative">
                        <img
                        src={videojuego.img}
                        className="rounded-circle gameimg m-3 position-absolute "
                        alt={videojuego.name || "Videojuego"}
                        style={{ width: '75px',
                                height: '75px',
                                objectFit: 'cover',
                                top: '50%',
                                left: '20px',
                                transform: 'translateY(-50%)' }}
                        />
                        <div className="card-body">
                        <h5 className="card-title mb-0">{videojuego.name}</h5>
                        
                        <span>ID: {videojuego.id}</span>
                    </div>
                    </div>
                    <div className="d-flex justify-content-center">
                    <Link to={`/cardVideojuego/${videojuego.id}`}>
                       <button className="btn btn-primary m-1">Ver</button>
                    </Link>
                    <Link to={`/editVideojuego/${videojuego.id}`}>
                    {isAdmin && (
                       <button className="btn btn-secondary m-1">Editar</button>
                    )}
                    </Link>
                    <div>
                    {isAdmin && (
                    <button className="btn btn-danger m-1" onClick={() => {
                        deleteVideojuego(videojuego.id)
                    }}>Delete</button>
                    )}
                    </div>
                </div>
                </div>
            ))}
        </div>
    );
};