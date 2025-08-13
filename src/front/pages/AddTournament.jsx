import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// No es necesario 'useGlobalReducer' si no lo usas para la autenticación aquí
// import useGlobalReducer from "../hooks/useGlobalReducer"; 

const AddTournament = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [filteredTournaments, setFilteredTournaments] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token");
    // La comprobación del token es suficiente, ya que si no hay token, no hay usuario autenticado.
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      navigate("/user/login");
      return;
    }

    const decoded = jwtDecode(token);
    const uid = decoded.sub;

    fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/' + uid + '/videogame-tournaments')
    .then(res => res.json())
    .then(data => setFilteredTournaments(data))
  } , [])

  const addUserTournament = (tournamentId) => {
    if (!user || !user.id) {
        alert("Error: No se ha podido identificar al usuario.");
        return;
    }

    const payload = {
      tournament_id: tournamentId,
      user_id: user.id
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/tournament`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (response.ok) {
          alert("¡Te has unido al torneo con éxito!")
        } else {
          response.json().then(err => alert(`No se pudo unir al torneo: ${err.message || 'Error desconocido'}`))
        }
      })
      .catch((err) => console.error("Error al unirse al torneo:", err))
  };

  console.log(filteredTournaments)

  return (
    <div className="container">
      <ul>
        {filteredTournaments.map(t => (
          <li key={t.id} className="border p-2">
            <div className="d-flex justify-content-between align-items-center flex-nowrap">
              <h4>{t.name}</h4>
                <div className="d-flex flex-column align-items-end">
                    <span>Nivel: {t.level}</span>
                    <span>Premium: {t.type}</span>
                </div>
                <img className="mini-gameimg" src={t.videojuego_img} alt={t.videojuego_name} />
                <span>{t.videojuego_name}</span>
                {t.is_registered ? (
                  <button className="btn btn-success" disabled>Inscrito</button>
                ) : (
                  <button className="btn btn-warning" onClick={() => addUserTournament(t.id)}>Unirse</button>
                )}                  
                    </div>
          </li>))}
      </ul>
    </div>
  )
}

export default AddTournament;