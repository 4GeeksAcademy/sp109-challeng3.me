import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { jwtDecode } from "jwt-decode";


const AddTournament = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const[tournaments, setTournaments] = useState([]);
    const [userTournament, setUserTournament] = useState({
        tournament_id: 0,
        user_id: 0
    })
      useEffect(() => {
        const token = localStorage.getItem("token")
    
        if (store.user_auth == true && token !== null) {
          const decoded = jwtDecode(token)
          userTournament.user_id = decoded.sub || null
        } else {
          alert('No estás autenticado. Por favor, inicia sesión.')
          navigate('/user/login')
        }
    
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/tournament") 
        .then(res => res.json())
        .then(data => setTournaments(data.tournament))
        .catch(err => console.error("Error al cargar torneos:", err))
      }, []);

    const addUserTournament = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user/tournament', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(userTournament)
        })
        .then(response => {
            if (response.ok) {
                setUserTournament({
                    tournament_id: 0,
                    user_id: 0
                })
                navigate("/user/dashboard/")
            }
            else {
                alert('No se puede crear ese user_tournament')
            }
        })
    }

    return (
        <div className="container my-4">
                    <h3 className="display-5 text-center mb-4">Inscripciones a Torneos</h3>
                    <div className="container text-center w-50 my-5 border p-4 d-flex flex-column">
                                         <select
                    className="form-control mt-2"
                    value={userTournament.tournament_id}
                    onChange={(e) =>
                      setUserTournament({ ...userTournament, tournament_id: e.target.value })
                    }
                 >
                  <option value="">Selecciona un torneo</option>
                  {tournaments.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                    ))}
                 </select>
                    <div className="text-center mt-3">
                            <button className="btn btn-success" onClick={addUserTournament}>Inscribirse</button>
                    </div>
                    
                    </div>
                    <Link className="d-flex justify-content-center" to="/user/dashboard">
                      <button className="btn btn-primary mt-2">Back home</button>
                    </Link>
                </div>
                
    )
  }
  
export default AddTournament