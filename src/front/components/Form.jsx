// Import necessary components from react-router-dom and other parts of the application.
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect, useState } from "react";

export const Form = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate()
  const [torneoNuevo, setTorneoNuevo] = useState({
    name: "",
    level: 0,
    prize: 0
  });

  useEffect(() => {
    setTorneoNuevo(store.newTournament);
  }, []);

  function newTournament (){
      fetch(import.meta.env.VITE_BACKEND_URL + "/api/tournament", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"

            },
        body: JSON.stringify(torneoNuevo)
        })
      .then(response => response.json())
      .then(result => navigate("/tournament"))
  }

  return (
    <div className="container m-auto mt-5">
      <ul className="list-group ">

            <li
              className="list-group-item d-flex justify-content-between"> 
  
              <div className="input-group input-group-sm mb-3 row d-flex justify-content-center">
                <div className="col-8">
                Name:
                <input
                  type="text"
                  className="form-control mt-2"
                  value={torneoNuevo.name}
                  onChange={(e) => setTorneoNuevo({...torneoNuevo, name: e.target.value})}
                />
                </div>
                <div className="col-8">
                Level:
                  <input
                    type="text"
                    className="form-control mt-2"
                    value={torneoNuevo.level}
                    onChange={(e) => setTorneoNuevo({...torneoNuevo, level: e.target.value})}
                  />
                </div>
                <div className="col-8">
                Prize:
                  <input
                    type="text"
                    className="form-control mt-2"
                    value={torneoNuevo.prize}
                    onChange={(e) => setTorneoNuevo({...torneoNuevo, prize: e.target.value})}
                  />
                </div>
                <Link className="text-center" to="/tournament">
                <button className="btn btn-success m-1 w-50 mt-4" 
                  onClick={newTournament}>
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
