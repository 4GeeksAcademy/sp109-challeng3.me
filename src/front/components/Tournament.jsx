import React, { useEffect,useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Tournament = () => {

 const { store, dispatch } = useGlobalReducer()
 const [tournaments, setTournaments] = useState ([])

      function getTournament (){
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/tournament")
        .then((Response)=>Response.json())
        .then((data) =>{
            setTournaments(data.tournament);
            dispatch({
                type: "list_tournament",
                payload: {newTournament:data.tournament},
            });
        })
        
    }

    useEffect (()=>{
        getTournament ()
    },[]);

    // function deleteTournament (tournament_id) {
    //     const requestOptions = {
    //     method: "DELETE",
    //     redirect: "follow"
    //     };

    //         fetch(import.meta.env.VITE_BACKEND_URL + "/api/tournament/" + tournament_id, requestOptions)
    //         .then((response) => response.text())
    //         .then((result) => getTournament())
    // }

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Tournament</h1>
            {store.tournament.map((item, index) => (
                <div key={index} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{item.name}20</h5>
                        <p className="card-text">{item.prize}30</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
