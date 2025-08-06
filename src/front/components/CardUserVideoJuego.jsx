// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import rigoImageUrl from "../assets/img/rigo-baby.jpg"  // Import an image asset
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useEffect, useState } from "react";

// Define and export the Single component which displays individual item details.
export const CardUserVideoJuego = props => {
  // Access the global state using the custom hook.
  const { store } = useGlobalReducer()
  const [userVideoJuego, setUserVideoJuego] = useState({});

  const { id } = useParams();

  useEffect(() => {
            fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/videojuego/" + id)
            .then((response) => response.json())
            .then((data) => 
              setUserVideoJuego(data))
            },[]);

  return (
    <div className="container text-center w-50 m-auto mt-5">
      <hr className="my-4" />
      <h5>VideoJuego Id: {userVideoJuego.videojuego_id} </h5>
      <h5>User Id: {userVideoJuego.user_id} </h5>
      <h5>Ranking: {userVideoJuego.ranking} </h5>
      <Link to="/user/dashboard">
        <span className="btn btn-primary btn-sm" href="#" role="button">
          Atras
        </span>
      </Link>
    </div>
  );
};

CardUserVideoJuego.propTypes = {
  match: PropTypes.object
};