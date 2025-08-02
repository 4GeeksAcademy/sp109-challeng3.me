// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import rigoImageUrl from "../assets/img/rigo-baby.jpg"  // Import an image asset
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useEffect, useState } from "react";

// Define and export the Single component which displays individual item details.
export const CardVideoJuego = props => {
  // Access the global state using the custom hook.
  const { store } = useGlobalReducer()
  const [videojuego, setVideojuego] = useState({});

  const { id } = useParams();
  console.log(videojuego)
  useEffect(() => {
            fetch(import.meta.env.VITE_BACKEND_URL + "/api/game/" + id)
            .then((response) => response.json())
            .then((data) => 
              setVideojuego(data))
            },[]);

  return (
    <div className="container text-center w-50 m-auto mt-5 border p-5 rounded shadow">
      <img
        src={videojuego.img}
        className='rounded-circle gameimg m-2'
        alt={videojuego.name || "Videojuego"}
      />
      <h1 className="mb-4">{videojuego.name} </h1>
      <p>{videojuego.description}</p>
      <p>{videojuego.platforms}</p>
      <p>{videojuego.release_date}</p>
      <Link to="/videojuego">
        <span className="btn btn-primary btn-sm" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};

CardVideoJuego.propTypes = {
  match: PropTypes.object
};