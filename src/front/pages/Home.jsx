import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import logo from "../assets/img/logo-big.png";


export const Home = () => {
	const { store, dispatch } = useGlobalReducer()

	useEffect(() => {

	}, [])

	return (
		<div className="mt-3 container text-center">
			<h1 className="text-4xl font-bold mb-3">Bienvenido a Challeng3.me</h1>
			<h3>¡¡Un Lugar unico!!</h3> 
			<p className="w-75 mx-auto mt-3">
			Conecta con jugadores de tu nivel, compite en torneos, cargados de adrenalina, y gana premios reales solo por jugar.
			Crea tus propios equipos y forma parte de la competencia.
			Todo esto y mucho más... Muy pronto, aquí.</p>
			<p className="text-lg w-75 mx-auto">Preparado para pasar al siguiente nivel...</p>
			<img src={logo} alt="Logo" className="w-50 rounded rounded-5 m-4" />
		</div>
	)
}