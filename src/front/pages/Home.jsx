import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import logo from "../assets/img/logo-big.png";


export const Home = () => {
	const { store, dispatch } = useGlobalReducer()

	useEffect(() => {

	}, [])

	return (
		<div className="text-center mt-5 container text-center">
			<h1 className="text-4xl font-bold mb-4">Bienvenido a Challeng3.me</h1>
			<p className="text-lg mb-4 w-75 mx-auto">Encuentra jugadores con un nivel similar para tus partidas, participa en cientos de torneos y consigue premios solo por jugar, crea tus propios equipos con amigos y competid en torneos por equipos, todo esto y mucho más proximamente aquí...</p>
			<img src={logo} alt="Logo" className="w-25 mb-4" />
		</div>
	)
}