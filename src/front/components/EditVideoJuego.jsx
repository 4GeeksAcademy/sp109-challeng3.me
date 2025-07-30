import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import PropTypes from "prop-types";

export const EditVideoJuego = () => {
  const { store } = useGlobalReducer();
  const { id } = useParams();

  const [editVideoJuego, setEditVideoJuego] = useState({
    videojuegos: "",
  });

  function getEditVideoJuego() {
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/videojuego/" + id)
      .then((response) => response.json())
      .then((data) => setEditVideoJuego(data));
  }

    useEffect(() => {
    getEditVideoJuego();
    }, []);


  function editarVideoJuego() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        videojuegos: editVideoJuego.videojuegos
      }),
    };

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/videojuego/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => window.location.href = "/videojuego")

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
                value={editVideoJuego.videojuegos}
                onChange={(e) =>
                  setEditVideoJuego({ ...editVideoJuego, videojuegos: e.target.value })
                }
              />
            </div>
            <Link className="text-center" to="/videojuego">
              <button
                className="btn btn-success m-1 w-50 mt-4"
                onClick={editarVideoJuego}
              >
                Save
              </button>
            </Link>
          </div>
        </li>
      </ul>
      <Link to="/videojuego">
        <button className="btn btn-primary mt-2">Back home</button>
      </Link>
    </div>
  );
};

EditVideoJuego.propTypes = {
  match: PropTypes.object
};