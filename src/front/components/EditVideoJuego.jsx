import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import PropTypes from "prop-types";

export const EditVideoJuego = () => {
  const { store } = useGlobalReducer();
  const { id } = useParams();
  const navigate = useNavigate()

  const [editVideoJuego, setEditVideoJuego] = useState({
    name: "",
    description: "",
    platforms: "",
    release_date: ""
  });

  function getEditVideoJuego() {
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/" + id)
      .then((response) => response.json())
      .then((data) => setEditVideoJuego(data));
  }

    useEffect(() => {
    getEditVideoJuego();
    }, []);


  function editarVideoJuego() {
    const requestOptions = {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(editVideoJuego),
    };

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("/videojuego"))

  }

  return (
    <div className="container">
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <div className="input-group input-group-sm mb-3 row d-flex justify-content-center">
            <div className="col-8">
              Name:
              <input
                type="text"
                className="form-control mt-2"
                value={editVideoJuego.name}
                onChange={(e) =>
                  setEditVideoJuego({ ...editVideoJuego, name: e.target.value })
                }
              />
            </div>
            <div className="col-8 mb-5">
              Description:
              <textarea
                type="text"
                className="form-control mt-2 h-100"
                value={editVideoJuego.description}
                onChange={(e) =>
                  setEditVideoJuego({ ...editVideoJuego, description: e.target.value })
                }
              />
            </div>
            <div className="col-8">
              Platforms:
              <input
                type="text"
                className="form-control mt-2"
                value={editVideoJuego.platforms}
                onChange={(e) =>
                  setEditVideoJuego({ ...editVideoJuego, platforms: e.target.value })
                }
              />
            </div>
            <div className="col-8">
              Release Date:
              <input
                type="text"
                className="form-control mt-2"
                value={editVideoJuego.release_date}
                onChange={(e) =>
                  setEditVideoJuego({ ...editVideoJuego, release_date: e.target.value })
                }
              />
            </div>
            <Link className="text-center" to="/videojuego">
              <button
                className="btn btn-success m-1 w-50 mt-4"
                onClick={editarVideoJuego}
              >
                Guardar
              </button>
            </Link>
          </div>
        </li>
      </ul>
      <Link to="/videojuego">
        <button className="btn btn-primary mt-2">Atrás</button>
      </Link>
    </div>
  );
};

EditVideoJuego.propTypes = {
  match: PropTypes.object
};