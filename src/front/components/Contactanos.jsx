import React, { useEffect, } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import logo from "../assets/img/logo-challeng3me.webp";
import isologo from "../assets/img/isologo-challeng3me.webp"
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";


export const Contactanos = () => {
    const navigate = useNavigate()

        const handleClick = () => {
            alert('¡Mensaje Enviado correctamente!');
            navigate("/")
        };

    return (
        <div className="mx-auto mt-3 w-50">
            <img src={logo} alt="Logo" className="w-25 d-flex mx-auto rounded" />
            <img src={isologo} alt="isoLogo" className="w-50 d-flex mx-auto mt-2 mb-4" />
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Nombre</label>
            <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="Nombre"/>
            <label for="exampleFormControlInput1" class="form-label mt-2">Email</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Comentario</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Comentario"></textarea>
        </div>
        <div className="d-flex justify-content-between w-100 my-4">
            <button className="btn btn-danger d-flex mx-auto" onClick={handleClick}>Contactar</button>
        </div>
        </div>
    )
}