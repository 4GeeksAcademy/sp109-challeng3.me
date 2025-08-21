import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import foto2 from "../assets/img/programador3.png"
import foto from "../assets/img/programadores2.png"


export const Nosotros = () => {
    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {

    }, [])

    return (
        <div className="container-fluid text-center bg-body" >
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center">
                            <h1 className="mt-0"><i className="mdi mdi-heart-multiple-outline"></i></h1>
                            <h3 className="" _msttexthash="973349" _msthash="301">Sobre <span className="text-rojo" _istranslated="1">Nosotros</span></h3>
                            <p className="mt-2" _msttexthash="6047899" _msthash="302">Somos Jose Luis Vela y Nahuel Perrone, dos estudiantes apasionados por la programación y los videojuegos. Este proyecto representa la culminación de todo lo que hemos aprendido durante nuestra formación.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-2 py-5 align-items-center row">
                    <div className="col-lg-5 col-md-6">
                        <img src={foto2} alt="foto2" className="img-fluid" />
                    </div>
                    <div className="col-lg-6 col-md-5 offset-md-1">
                        <h3 className="fw-normal" _msttexthash="1031186" _msthash="303">Desarrollo y Aplicaciones</h3>
                        <p className="mt-3" _msttexthash="6496243" _msthash="304">En nuestro camino como desarrolladores, hemos adquirido distintos conocimientos</p>
                        <div className="mt-4 mx-5 d-flex flex-column align-items-start">
                            <p>
                                <i className="bi bi-circle-fill fa-xs mx-2"></i>
                                <font _mstmutation="1" _msttexthash="327262" _msthash="305">Desarrollo web</font>
                            </p>
                            <p>
                                <i className="bi bi-circle-fill fa-xs mx-2"></i>
                                <font _mstmutation="1" _msttexthash="1674868" _msthash="306">Lógica de programación</font>
                            </p>
                            <p>
                                <i className="bi bi-circle-fill fa-xs mx-2"></i>
                                <font _mstmutation="1" _msttexthash="504712" _msthash="307">Diseño de interfaces</font>
                            </p>
                            <p>
                                <i className="bi bi-circle-fill fa-xs mx-2"></i>
                                <font _mstmutation="1" _msttexthash="1750333" _msthash="308">Base de datos</font>
                            </p>
                            <p>
                                <i className="bi bi-circle-fill fa-xs mx-2"></i>
                                <font _mstmutation="1" _msttexthash="1750333" _msthash="308">Trabajo en equipo</font>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="pb-3 pt-5 align-items-center row">
                    <div className="col-lg-6 col-md-5">
                        <h3 className="fw-normal" _msttexthash="641771" _msthash="310">Diseño y objetivo</h3>
                        <p className="text-start mt-3 mb-0" _msttexthash="38822849" _msthash="311">Nuestra propuesta es una plataforma dedicada a los amantes de los videojuegos, donde puedan competir entre ellos con premios reales, formar equipos, y vivir la experiencia de los esports de una manera accesible y organizada. Queremos ofrecer un espacio donde la pasión por jugar se transforme también en una oportunidad para mejorar, ganar y crecer en comunidad.</p>
                            <p className="text-start"> 
                                Creemos que los videojuegos son más que entretenimiento: son una forma de conectar, de superarse, y de trabajar en equipo. Este proyecto no solo es nuestro trabajo final, es también nuestra forma de aportar algo valioso al mundo gamer.
                            </p>
                    </div>
                    <div className="col-lg-5 col-md-6 offset-md-1">
                        <img src={foto} alt="foto" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    )
}