import React, { useEffect,useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const UserVideoJuego = () => {

 const { store, dispatch } = useGlobalReducer()
 const [userVideoJuego, setUserVideoJuego] = useState ([])

      function getUserVideoJuego (){
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/videojuego")
        .then((Response)=>Response.json())
        .then((data) =>{
            setUserVideoJuego(data.user_videojuego);
            dispatch({
                type: "list_user_videojuego",
                payload: {userVideoJuego:data.user_videojuego},
            });
        })
        
    }

    useEffect (()=>{
        getUserVideoJuego ()
    },[]);

    function deleteUserVideoJuego (user_videojuego_id) {
        const requestOptions = {
        method: "DELETE",
        redirect: "follow"
        };

            fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/videojuego/" + user_videojuego_id, requestOptions)
            .then((response) => response.text())
            .then((result) => getUserVideoJuego())
    }

    return (
        <div className="text-center mt-5">
            <div className="d-flex justify-content-between w-50 m-auto">
            <h1 className="display-4">Usuarios-Videojuegos</h1>
              <Link to="/user/videojuego/create">
                <button className="btn btn-success mt-4 btn-sm">Create User/videojuego</button>
              </Link>
            </div>
            {store.userVideoJuego.map((userVideoJuego) => (
                <div key={userVideoJuego.id} className="card mb-3 w-50 m-auto">
                    <div className="card-body">
                        <h5 className="card-title">VideoJuego_id : {userVideoJuego.videojuego_id}</h5>
                        <p className="card-text">User_id : {userVideoJuego.user_id}</p>
                        <p className="card-text">Ranking : {userVideoJuego.ranking}</p>
                    </div>
                    <div className="d-flex justify-content-center">
                    <Link to={`/user/videojuego/${userVideoJuego.id}`}>
                       <button className="btn btn-primary m-1">Ver</button>
                    </Link>
                    <Link to={`/user/videojuego/edit/${userVideoJuego.id}`}>
                       <button className="btn btn-secondary m-1">Editar</button>
                    </Link>
                
                    <div>
                    <button className="btn btn-danger m-1" onClick={() => {
                        deleteUserVideoJuego(userVideoJuego.id)
                    }}>Delete</button>
                    </div>
                </div>
                </div>
            ))}
        </div>
    );
};