import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import logo from "../assets/img/logo-big.png";
import { Link } from "react-router-dom";


export const Nosotros = () => {
    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {

    }, [])

    return (
        <div className="container-fluid text-center" style={{background:"#05052f"}}>
            <div className="conteiner-fluid position-relative">
                <img src={logo} alt="Logo" className="w-50 rounded rounded-5" />
                <div className="position-absolute top-50 start-50 translate-middle text-white">
                    <h1 className="mb-3">Sobre Nosotros</h1>
                <h5 className="mb-5">
                Somos Jose Luis Vela y Nahuel Perrone, dos estudiantes apasionados por la programación y los videojuegos. Este proyecto representa la culminación de todo lo que hemos aprendido durante nuestra formación. A lo largo de nuestro camino como desarrolladores, hemos adquirido conocimientos en diseño de interfaces, bases de datos, desarrollo web, lógica de programación y trabajo en equipo. Todo ese conocimiento lo volcamos en un objetivo común: crear una plataforma que conecte a los gamers de forma competitiva y emocionante.

                Nuestra propuesta es una plataforma dedicada a los amantes de los videojuegos, donde puedan competir entre ellos con premios reales, formar equipos, y vivir la experiencia de los esports de una manera accesible y organizada. Queremos ofrecer un espacio donde la pasión por jugar se transforme también en una oportunidad para mejorar, ganar y crecer en comunidad.

                Creemos que los videojuegos son más que entretenimiento: son una forma de conectar, de superarse, y de trabajar en equipo. Este proyecto no solo es nuestro trabajo final, es también nuestra forma de aportar algo valioso al mundo gamer.</h5>
                </div>
                    <Link className="d-flex justify-content-end p-5 text-decoration-none" to="/">Cerrar</Link>
            </div>
        </div>
    )
}