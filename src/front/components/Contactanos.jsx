import React, { useEffect, } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import logo from "../assets/img/logo-big.png";
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
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Name</label>
            <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="name"/>
            <label for="exampleFormControlInput1" class="form-label mt-2">Email</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Comentario</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Comentario"></textarea>
        </div>
        <div className="d-flex justify-content-between w-100">
            <button className="btn btn-success d-flex mx-auto" onClick={handleClick}>Contactar</button>
            <Link className="btn btn-light d-flex mx-auto text-decoration-none" to="/">Cerrar</Link>
        </div>
        </div>
    )
}