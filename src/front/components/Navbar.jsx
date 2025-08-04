import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { jwtDecode } from "jwt-decode";

export const Navbar = () => {
	const { store } = useGlobalReducer()
	const [isAdmin, setIsAdmin] = useState(false)
	const [isUser, setIsUser] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			setIsAdmin(false);
			setIsUser(false);
			return;
		}

		try {
			const decoded = jwtDecode(token);
			if (decoded?.role === 'admin') {
				setIsAdmin(true);
				setIsUser(false);
			} else if (decoded?.role === 'user') {
				setIsUser(true);
				setIsAdmin(false);
			}
		} catch (error) {
			console.error("Token inválido:", error.message);
			setIsAdmin(false);
			setIsUser(false);
			localStorage.removeItem("token");
		}
	}, [store.admin_auth, store.user_auth])



	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Challeng3.me</span>
				</Link>
					<Link to="/user/login">
						<button className="btn btn-primary">User Login</button>
					</Link>
					{isAdmin && (
					<div className="ml-auto d-flex gap-2">
						<div>
						<Link to="/user/videojuego">
						<button className="btn btn-primary">CRUD User/Videojuego</button>
						</Link>
						<Link to="/admin/dashboard">
							<button className="btn btn-primary">Zona Administración</button>
						</Link>
						<Link to="/videojuego">
							<button className="btn btn-primary">CRUD Videojuego</button>
						</Link>
						<Link to="/user">
							<button className="btn btn-primary">CRUD User</button>
						</Link>
						<Link to="/admin">
							<button className="btn btn-primary">CRUD Admin</button>
						</Link>
						<Link to="/tournament">
							<button className="btn btn-primary">CRUD Tournaments</button>
						</Link>
						<Link to="/team">
							<button className="btn btn-primary">CRUD Teams</button>
						</Link>
						<Link to="/user/tournament">
							<button className="btn btn-primary">CRUD User_Tournament</button>
						</Link>
						<Link to="/user/team">
							<button className="btn btn-primary">CRUD User_Team</button>
						</Link>
						<Link to="/team/tournament">
							<button className="btn btn-primary">CRUD Team_Tournament</button>
						</Link>
						</div>
					</div>
					)}

			</div>
		</nav>
	);
};
