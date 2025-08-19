// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; 
import { useNavigate } from "react-router-dom";

export const CreateUserVideoJuego = () => {
  const { store } = useGlobalReducer();
  const navigate = useNavigate()
  const [videojuegos, setVideojuegos] = useState([])
  const [userVideoJuego, setUserVideoJuego] = useState({
    videojuego_id: "",
    user_id: "",
    ranking: ""
  });
  

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      const decoded = jwtDecode(token)
      setUserVideoJuego((prev) => ({
        ...prev,
        user_id: decoded.sub || null,
        ranking: "0",
      }))
    } else {
      alert('No estás autenticado. Por favor, inicia sesión.')
      navigate('/user/login')
    }

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/game") 
    .then(res => res.json())
    .then(data => setVideojuegos(data.videojuego))
    .catch(err => console.error("Error al cargar videojuegos:", err))
  }, []);

    function newUserVideoJuego (id){
      const requestOptions = {
        method: "POST",
        headers: {'Content-Type': 'application/json' },
         body: JSON.stringify({
                  videojuego_id: id,
                  user_id: userVideoJuego.user_id,
                  ranking: userVideoJuego.ranking
              })
      };

      fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/videojuego/", requestOptions)
        .then((response) => response.json())
        .then((data) => navigate("/user/dashboard/"))
}

  return (
    <div className="container m-auto p-5 bg-body h-full">
      
      <div className="row">
        <div className="col-12 mb-4">
          <div className="page-title-box">
            <div className="page-title">
              <h5>Selecciona un juego para añadirlo a tu perfil</h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-7 d-flex flex-wrap gap-4">
            {videojuegos.map(g => (
              <div key={g.id} className="col-4" onClick={() => newUserVideoJuego(g.id)} style={{cursor: "pointer"}}>
                  <div className="card widget-flat bg-body-secondary p-1 text-center" style={{height: "auto"}}>
                      <div className="card-body">
                        <img 
                            src={g.img} 
                            alt={g.name}
                            className="mini-gameimg p-2 mx-auto row mb-2"
                        />
                        <span>{g.name}</span>
                      </div>
                  </div>
              </div>
            ))}
          </div>
          <div className="col-12 col-lg-5 d-flex justify-content-center flex-column">
            <i className="bi bi-joystick text-danger display-1 mx-auto mb-4"></i>
            <span className="text-muted mozilla-headline blackquote">Selecciona tus juegos competitivos favoritos y conéctate con jugadores que comparten tu pasión. Aquí podrás descubrir torneos, formar equipos y demostrar tu nivel en el campo de batalla de tu juego preferido.</span>
          </div>
        </div>
      </div>

      <Link to="/user/dashboard/">
        <button className="btn btn-danger mt-2">Atrás</button>
      </Link>
    </div>
  );
};