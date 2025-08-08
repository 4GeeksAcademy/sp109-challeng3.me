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

    if (store.user_auth == true && token !== null) {
      const decoded = jwtDecode(token)
      userVideoJuego.user_id = decoded.sub || null
      userVideoJuego.ranking = "0"
    } else {
      alert('No estás autenticado. Por favor, inicia sesión.')
      navigate('/user/login')
    }

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/game") 
    .then(res => res.json())
    .then(data => setVideojuegos(data.videojuego))
    .catch(err => console.error("Error al cargar videojuegos:", err))
  }, []);

    function newUserVideoJuego (){
      const requestOptions = {
        method: "POST",
        headers: {'Content-Type': 'application/json' },
         body: JSON.stringify({
                  videojuego_id: userVideoJuego.videojuego_id,
                  user_id: userVideoJuego.user_id,
                  ranking: userVideoJuego.ranking
              })
      };

      fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/videojuego/", requestOptions)
        .then((response) => response.json())
        .then((data) => navigate("/user/dashboard/"))
}

  return (
    <div className="container m-auto mt-5">
      <ul className="list-group ">

            <li
              className="list-group-item d-flex justify-content-between"> 
  
              <div className="input-group input-group-sm mb-3 row d-flex justify-content-center">
                <div className="col-8">
                videojuego_id:
                 <select
                    className="form-control mt-2"
                    value={userVideoJuego.videojuego_id}
                    onChange={(e) =>
                      setUserVideoJuego({ ...userVideoJuego, videojuego_id: e.target.value })
                    }
                 >
                  <option value="">Selecciona un videojuego</option>
                  {videojuegos.map((vj) => (
                    <option key={vj.id} value={vj.id}>
                      {vj.name}
                    </option>
                    ))}
                 </select>
                </div>
                <Link className="text-center" to="/user/videojuego/">
                <button className="btn btn-success m-1 w-50 mt-4" 
                  onClick={newUserVideoJuego}>
                  Save
                </button>
                </Link>
              </div>
            </li>
      </ul>
      <Link to="/user/dashboard">
        <button className="btn btn-primary mt-2">Back home</button>
      </Link>
    </div>
  );
};