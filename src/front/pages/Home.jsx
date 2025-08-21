import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import logo from "../assets/img/logo-challeng3me (1).png";
import bgimg from "../assets/img/Crowds-4-1024x683-1.jpg";
import { Link } from "react-router-dom";


export const Home = () => {
	const { store, dispatch } = useGlobalReducer()

	useEffect(() => {

	}, [])

	return (
		<>
		<div 
		className="container-fluid d-flex align-items-center"
		style={{
			height: "calc(100vh - 115px)",
			backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${bgimg})`,
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			overflow: "hidden",   
		}}
		>
		<div className="diagonal"></div>
			<div className="container text-center hero py-4">
				<div className="row h-100 d-flex align-items-center">
					<div className="col-6 text-start">
						<h2 className="text-white fw-normal mb-4 mt-3 hero-title">Demuestra tu verdadero nivel.</h2>
						<p className="mb-4 font-16 text-white-75">
						Únete a Challeng3.me y compite contra jugadores como tú en torneos intensos, forma tu propio equipo y escala posiciones en los rankings. Premios, gloria y rivalidad te esperan... ¿Estás listo para el desafío?</p>
					</div>
					<div className="col-6">
						<Link to="/user/login">
						<img src={logo} alt="Logo" className="w-50 m-4" />
						</Link>
					</div>
				</div>
			</div>
		</div>
		</>
	)
}