// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import rigoImageUrl from "../assets/img/rigo-baby.jpg"  // Import an image asset
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useEffect, useState } from "react";

// Define and export the Single component which displays individual item details.
export const Card = props => {
  // Access the global state using the custom hook.
  const { store } = useGlobalReducer()
  const [torneo, setTorneo] = useState({});

  const { id } = useParams();

  useEffect(() => {
            fetch(import.meta.env.VITE_BACKEND_URL + "/api/tournament/" + id)
            .then((response) => response.json())
            .then((data) => 
              setTorneo(data))
            },[]);

  return (
    <div className="container text-center">
      <hr className="my-4" />
      <h5>Name: {torneo.name} </h5>
      <h5>Level: {torneo.level} </h5>
      <h5>Prize: {torneo.prize} </h5>
      <Link to="/tournament">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};

Card.propTypes = {
  match: PropTypes.object
};