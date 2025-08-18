import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import logo from "../assets/img/logo-challeng3me.webp";
import isologo from "../assets/img/isologo-challeng3me.webp";
import bgimg from "../assets/img/Crowds-4-1024x683-1.jpg";
import { Link } from "react-router-dom";


export const Home = () => {
	const { store, dispatch } = useGlobalReducer()

	useEffect(() => {

	}, [])

	return (
		<div 
		className="container-fluid"
		style={{
			backgroundImage: `radial-gradient(
			circle,
			rgba(0, 0, 0, 1) 0%,
			rgba(0, 0, 0, 0.7) 60%,
			rgba(0, 0, 0, 0) 100%
			),
			url(${bgimg})`,
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			minHeight: "100vh"
		}}
		>
			<div className="container text-center hero py-4">
				<img src={isologo} alt="isoLogo" className="w-50 m-4" />
				<p className="w-75 mx-auto mt-3 blockquote">
				“Demuestra tu verdadero nivel. Únete a Challeng3.me y compite contra jugadores como tú en torneos intensos, forma tu propio equipo y escala posiciones en los rankings. Premios, gloria y rivalidad te esperan... ¿Estás listo para el desafío?”</p>
				<Link to="/user/login">
				<img src={logo} alt="Logo" className="w-25 m-4" />
				</Link>
			</div>
		</div>
	)
}