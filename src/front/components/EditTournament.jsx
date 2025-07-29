import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import PropTypes from "prop-types";

export const EditTournament = () => {
  const { store } = useGlobalReducer();
  const { id } = useParams();

  const [editTorneo, setEditTorneo] = useState({
    name: "",
    level: "",
    prize: ""
  });
  
  function getEditTorneo() {
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/tournament/" + id)
      .then((response) => response.json())
      .then((data) => setEditTorneo(data));
  }

    useEffect(() => {
    getEditTorneo();
    }, []);


  function editarTorneo() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editTorneo.name,
        level: editTorneo.level,
        prize: editTorneo.prize
      }),
    };

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/tournament/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => window.location.href = "/tournament")
      
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
                value={editTorneo.name}
                onChange={(e) =>
                  setEditTorneo({ ...editTorneo, name: e.target.value })
                }
              />
            </div>
            <div className="col-8">
              Level:
              <input
                type="text"
                className="form-control mt-2"
                value={editTorneo.level}
                onChange={(e) =>
                  setEditTorneo({ ...editTorneo, level: e.target.value })
                }
              />
            </div>
            <div className="col-8">
              Prize:
              <input
                type="text"
                className="form-control mt-2"
                value={editTorneo.prize}
                onChange={(e) =>
                  setEditTorneo({ ...editTorneo, prize: e.target.value })
                }
              />
            </div>
            <Link className="text-center" to="/tournament">
              <button
                className="btn btn-success m-1 w-50 mt-4"
                onClick={editarTorneo}
              >
                Save
              </button>
            </Link>
          </div>
        </li>
      </ul>
      <Link to="/tournament">
        <button className="btn btn-primary mt-2">Back home</button>
      </Link>
    </div>
  );
};

EditTournament.propTypes = {
  match: PropTypes.object
};