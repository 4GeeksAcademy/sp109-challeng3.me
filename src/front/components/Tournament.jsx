import React, { useEffect,useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

export const Tournament = () => {

    const { store, dispatch } = useGlobalReducer()
    const [tournaments, setTournaments] = useState ([])
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
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
    }, [])

    function getTournament (){
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/tournament")
        .then((response)=>response.json())
        .then((data) =>{
            setTournaments(data.tournament);
            dispatch({
                type: "list_tournament",
                payload: {torneo:data.tournament},
            });
        })
        
    }

    useEffect (()=>{
        getTournament ()
    },[]);

    function deleteTournament (tournament_id) {
        const requestOptions = {
        method: "DELETE",
        headers: { 
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        redirect: "follow"
        };

            fetch(import.meta.env.VITE_BACKEND_URL + "/api/tournament/" + tournament_id, requestOptions)
            .then((response) => response.text())
            .then((result) => getTournament())
    }



    return (
        <div className="text-center mt-5">
            <div className="d-flex justify-content-between w-50 m-auto">
            <h1 className="display-4">Tournament</h1>
                {isAdmin && (
                    <Link to="/form">
                    <button className="btn btn-success mt-4">Create tournament</button>
                    </Link>
                )}
            </div>
            {store.tournament.map((tournament) => (
                <div key={tournament.id} className="card mb-3 w-50 m-auto">
                    <div className="card-body">
                        <h5 className="card-title">Name : {tournament.name}</h5>
                        <h5 className="card-text">Level : {tournament.level}</h5>
                        <h5 className="card-text">Prize : {tournament.prize}</h5>
                    </div>
                    <div className="d-flex justify-content-center">
                    <Link to={`/card/${tournament.id}`}>
                       <button className="btn btn-primary m-1">Ver</button>
                    </Link>
                    {isAdmin && ( <>
                        <Link to={`/editTournament/${tournament.id}`}>
                        <button className="btn btn-secondary m-1">Editar</button>
                        </Link>
                    
                        <button className="btn btn-danger m-1" onClick={() => {
                            deleteTournament(tournament.id)
                        }}>Delete</button>
                    </>)}
                </div>
                </div>
            ))}
        </div>
    );
};

