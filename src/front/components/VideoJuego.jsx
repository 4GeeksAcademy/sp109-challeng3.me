import React, { useEffect,useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

export const Videojuego = () => {

 const { store, dispatch } = useGlobalReducer()
 const [videojuegos, setVideojuegos] = useState ([])
 const [isAdmin, setIsAdmin] = useState(false)

      function getVideojuego (){
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/videojuego")
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
    },[]);

    function deleteVideojuego (videojuego_id) {
        const requestOptions = {
        method: "DELETE",
        headers: { 
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        redirect: "follow"
        };

            fetch(import.meta.env.VITE_BACKEND_URL + "/api/videojuego/" + videojuego_id, requestOptions)
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
            {store.videojuego.map((videojuego) => (
                <div key={videojuego.id} className="card mb-3 w-50 m-auto">
                    <div className="card-body">
                        <h5 className="card-title">{videojuego.videojuegos}</h5>
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