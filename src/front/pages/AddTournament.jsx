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

    fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/' + uid )
    .then(res => res.json())
    .then(data => {
      setUser(data)
    })
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
          getTournaments()
        } else {
          response.json().then(err => alert(`No se pudo unir al torneo: ${err.message || 'Error desconocido'}`))
        }
      })
      .catch((err) => console.error("Error al unirse al torneo:", err))
  }

   const getTournaments = (id) => {
      if (!user || !user.id) return;  // 🚨 evita error si user todavía no está listo

      fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/' + user.id + '/videogame-tournaments')
        .then(res => res.json())
        .then(data => setFilteredTournaments(data))
  }

    useEffect(() => {
      if (user && user.id) {
        getTournaments();
      }
    }, [user])

  return (
     <div className="container m-auto p-5 bg-body h-full">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="page-title-box">
            <div className="page-title">
              <h5>Selecciona un Torneo para inscribirte</h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex flex-wrap gap-4">
            <table className="mb-0 table table-hover">
                <tbody >
                    {filteredTournaments.map(t => (
                    <tr key={t.id} className="bg-body-secondary p-2">
                            <td className="my-1">
                                <h5 className="font-14 pt-2 ps-2">{t.name}</h5>
                                <span className="text-muted font-13 ps-2">{t.type}</span>
                            </td>
                            <td className="my-1 pt-2">
                                <span className="text-muted font-13">Nivel necesario: {t.level}</span>
                                <p className="text-muted font-13 mb-0 mt-2">Premio: {t.prize}</p>
                            </td>
                            <td className="pt-3">
                                <img className="mini-gameimg mx-2" src={t.videojuego_img} alt={t.videojuego_name} />
                            </td>
                            <td className="text-end p-4 font-14">
                                {t.is_registered ? (
                                  <span className="text-danger ">
                                    <i className="bi bi-check-circle-fill"></i> Inscrito
                                  </span>
                                ) : t.level > user.level ? (
                                  <span className="text-warning">
                                    <i className="bi bi-exclamation-triangle-fill"></i> Nivel insuficiente
                                  </span>
                                ) : (
                                  <button
                                    className="btn btn-danger mx-auto"
                                    onClick={() => addUserTournament(t.id)}
                                  >
                                    Unirse
                                  </button>
                                )}                  
                            </td>
                        </tr>)
                    )}
                </tbody>
            </table>
          </div>
         </div>
      </div>
    </div>
  )
}

export default AddTournament;