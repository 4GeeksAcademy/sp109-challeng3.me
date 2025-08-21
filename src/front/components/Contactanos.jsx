import React, { useEffect, } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import logo from "../assets/img/logo-challeng3me.webp";
import isologo from "../assets/img/isologo-challeng3me.webp"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Contactanos = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        alert('¡Mensaje Enviado correctamente!');
        navigate("/")
    };

    return (
        <div className="mx-auto py-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center">
                            <h3 _msttexthash="365651" _msthash="99">Póngase en <span className="text-rojo" _istranslated="1">Contacto</span></h3>
                            <p className="text-muted mt-2" _msttexthash="12019384" _msthash="100">Por favor, rellene el siguiente formulario y nos pondremos en contacto con usted en breve.
                                <p>Para más información póngase en contacto con nosotros.</p></p>
                        </div>
                    </div>
                </div>
                <div className="align-items-center mt-3 row">
                    <div className="col-md-4">
                        <p className="text-muted">
                            <span className="fw-bold" _msttexthash="275262" _msthash="101">Atencion al cliente:</span>
                            <span className="d-block mt-1" _msttexthash="90597" _msthash="102">+34 66 888 7894</span></p>
                        <p className="text-muted mt-4">
                            <span className="fw-bold" _msttexthash="894543" _msthash="103">Dirección de correo electrónico:</span>
                            <span className="d-block mt-1" _msttexthash="240682" _msthash="104">info@gmail.com</span></p>
                        <p className="text-muted mt-4">
                            <span className="fw-bold" _msttexthash="486941" _msthash="105">Dirección de la oficina:</span>
                            <span className="d-block mt-1" _msttexthash="559065" _msthash="106">Casco Antiguo, 41004 Sevilla, España</span></p>
                        <p className="text-muted mt-4">
                            <span className="fw-bold" _msttexthash="330447" _msthash="107">Horario de oficina:</span>
                            <span className="d-block mt-1" _msttexthash="134836" _msthash="108">9:00AM A 6:00PM</span></p>
                    </div>
                    <div className="col-md-8">
                        <form className="">
                            <div className="mt-4 row">
                                <div className="col-lg-6">
                                    <div className="mb-2">
                                        <label className="form-label" _msttexthash="113022" _msthash="109">Nombre</label>
                                        <input placeholder="Nombre..." className="form-control form-control-light form-control" type="text" value="" name="fullname" _mstplaceholder="64597" _msthash="110" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-2">
                                        <label className="form-label" _msttexthash="459277" _msthash="111">Correo electrónico</label>
                                        <input placeholder="Ingrese su correo electrónico..." className="form-control form-control-light form-control" type="email" value="" name="emailaddress" _mstplaceholder="303160" _msthash="112" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-1 row">
                                <div className="col-lg-12">
                                    <div className="mb-2">
                                        <label className="form-label" _msttexthash="77233" _msthash="113">Asunto</label>
                                        <input placeholder="Asunto..." className="form-control form-control-light form-control" type="text" value="" name="subject" _mstplaceholder="242853" _msthash="114" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-1 row">
                                <div className="col-lg-12">
                                    <div className="mb-2">
                                        <label className="form-label" _msttexthash="92807" _msthash="115">Mensaje</label>
                                        <textarea name="comments" rows="4" placeholder="Escribe tu mensaje aquí..." className="form-control form-control-light form-control" _mstplaceholder="471276" _msthash="116"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 row">
                                <div className="col-12 text-end col">
                                    <button className="btn btn-danger" onClick={handleClick}>
                                        <font _mstmutation="1" _msttexthash="289198" _msthash="117">Enviar mensaje </font>
                                        <i className="mdi mdi-telegram ms-1"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}