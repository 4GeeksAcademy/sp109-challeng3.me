import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import PropTypes from "prop-types";

export const EditUserVideoJuego = () => {
  const { store } = useGlobalReducer();
  const { id } = useParams();

  const [editUserVideoJuego, setEditUserVideoJuego] = useState({
    videojuego_id: "",
    user_id: "",
    ranking: ""
  });

  function getEditUserVideoJuego() {
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/videojuego/" + id)
      .then((response) => response.json())
      .then((data) => setEditUserVideoJuego(data));
  }

    useEffect(() => {
    getEditUserVideoJuego();
    }, []);


  function editarUserVideoJuego() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        videoJuego_id: editUserVideoJuego.videojuego_id,
        user_id: editUserVideoJuego.user_id,
        ranking: editUserVideoJuego.ranking
      }),
    };

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/videojuego/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => window.location.href = "/user/videojuego/")

  }

  return (
    <div className="container mt-5"> 
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <div className="input-group input-group-sm mb-3 row d-flex justify-content-center">
            <div className="col-8">
              VideoJuego_id:
              <input
                type="text"
                className="form-control mt-2"
                value={editUserVideoJuego.videojuego_id}
                onChange={(e) =>
                  setEditUserVideoJuego({ ...editUserVideoJuego, videojuego_id: e.target.value })
                }
              />
            </div>
            <div className="col-8">
              User_id:
              <input
                type="text"
                className="form-control mt-2"
                value={editUserVideoJuego.user_id}
                onChange={(e) =>
                  setEditUserVideoJuego({ ...editUserVideoJuego, user_id: e.target.value })
                }
              />
            </div>
            <div className="col-8">
              Ranking:
              <input
                type="text"
                className="form-control mt-2"
                value={editUserVideoJuego.ranking}
                onChange={(e) =>
                  setEditUserVideoJuego({ ...editUserVideoJuego, ranking: e.target.value })
                }
              />
            </div>
            <Link className="text-center" to="/user/videojuego">
              <button
                className="btn btn-success m-1 w-50 mt-4"
                onClick={editarUserVideoJuego}
              >
                Save
              </button>
            </Link>
          </div>
        </li>
      </ul>
      <Link to="/user/videojuego">
        <button className="btn btn-primary mt-2">Back home</button>
      </Link>
    </div>
  );
};

EditUserVideoJuego.propTypes = {
  match: PropTypes.object
};