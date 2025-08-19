import React from "react";
import { Link } from "react-router-dom";

const TeamSection = () => {

    return (
    <div className="container m-auto p-5 bg-body h-full">
      
        <div className="row">
            <div className="col-12 mb-4">
            <div className="page-title-box">
                <div className="page-title">
                <h5>Selecciona una opcion:</h5>
                </div>
            </div>
            </div>
        </div>
        <div className="row d-flex gap-4 justify-content-center">
            <div className="col-5">
                <Link to="/team/create">
                <div className="card d-flex justify-content-center align-items-center gap-2"
                    style={{height: "300px"}}>
                    <i class="bi bi-plus-circle-fill fs-1"></i>
                    <h5>Crear Equipo</h5>
                </div>
                </Link>
            </div>
            <div className="col-5">
                <Link to="/search/team">
                <div className="card d-flex justify-content-center align-items-center gap-2"
                    style={{height: "300px"}}>
                    <i class="bi bi-search fs-1"></i>
                    <h5>Buscar Equipo</h5>
                </div>
                </Link>
            </div>
        </div>
    </div>
    )
}

export default TeamSection