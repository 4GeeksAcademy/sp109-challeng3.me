// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect, useState } from "react";

export const CreateUserVideoJuego = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store } = useGlobalReducer();
  const [userVideoJuego, setUserVideoJuego] = useState({
    videojuego_id: "",
    user_id: "",
    ranking: ""
  });

  useEffect(() => {
    setUserVideoJuego(store.newUserVideoJuego);
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
        .then((data) => window.location.href = "/user/videojuego/")
}

  return (
    <div className="container m-auto mt-5">
      <ul className="list-group ">

            <li
              className="list-group-item d-flex justify-content-between"> 
  
              <div className="input-group input-group-sm mb-3 row d-flex justify-content-center">
                <div className="col-8">
                videojuego_id:
                 <input
                  type="text"
                  className="form-control mt-2"
                  value={userVideoJuego.videojuego_id}
                  onChange={(e) => setUserVideoJuego({...userVideoJuego, videojuego_id: e.target.value})}
                  />
                </div>
                <div className="col-8">
                User_Id:
                <input
                  type="text"
                  className="form-control mt-2"
                  value={userVideoJuego.user_id}
                  onChange={(e) => setUserVideoJuego({...userVideoJuego, user_id: e.target.value})}
                />
                </div>
                <div className="col-8">
                Ranking:
                <input
                  type="text"
                  className="form-control mt-2"
                  value={userVideoJuego.ranking}
                  onChange={(e) => setUserVideoJuego({...userVideoJuego, ranking: e.target.value})}
                />
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
      <Link to="/user/videojuego/">
        <button className="btn btn-primary mt-2">Back home</button>
      </Link>
    </div>
  );
};