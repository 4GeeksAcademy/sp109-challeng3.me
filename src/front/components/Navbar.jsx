import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import isologo from "../assets/img/isologo-challeng3me.webp";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()
	const [isAdmin, setIsAdmin] = useState(false)
	const [isUser, setIsUser] = useState(false)
	const [user, setUser] = useState([])
	const navigate = useNavigate()

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
				const userId = decoded.sub || null
				if (userId) {getUserInfo(userId)}
			}
		} catch (error) {
			console.error("Token inválido:", error.message);
			setIsAdmin(false);
			setIsUser(false);
			localStorage.removeItem("token");
		}
	}, [store.admin_auth, store.user_auth, navigate])

	const getUserInfo = (id) => {
		fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/' + id)
		.then(res => res.json())
		.then(data => setUser(data))
	}



	return (
		<nav className="navbar bg-body-secondary">
			<div className="container">
				<Link to="/">
					<img src={isologo} alt="isologo" className="brand-logo"/>
				</Link>
				{isUser || isAdmin ? (
					<div className="ml-auto d-flex gap-2">
						<div className="dropdown d-flex align-items-center">
							<a className="nav-link dropdown-toggle d-flex align-items-center btn btn-dark" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<img
								src={user.img}
								className="rounded-circle"
								alt="Profile"
								style={{ width: "40px", height: "40px" }}
								draggable="false"
							/>
								<div className="ms-3 profile-info">
									<h6 className="text-white mb-0">{user.username}</h6>
									{isAdmin ? (<small className="text-muted">Admin</small>)
									:
									(<small className="text-muted">Jugador</small>)}
								</div>
							</a>
							<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
								<li><a className="dropdown-item" href="#">Acción</a></li>
								<li><a className="dropdown-item" href="#">Otra acción</a></li>
								<li><hr className="dropdown-divider"/></li>
								<li><a className="dropdown-item" href="#">Algo más aquí</a></li>
							</ul>
						</div>
					</div>
				) : (
					<Link to="/user/login">
						<button className="btn btn-light">Login</button>
					</Link>
				)}
					{isAdmin && (
					<div className="ml-auto d-flex gap-2">
						<div>
						<Link to="/user/videojuego">
						<button className="btn btn-light">CRUD User/Videojuego</button>
						</Link>
						<Link to="/admin/dashboard">
							<button className="btn btn-light">Zona Administración</button>
						</Link>
						<Link to="/videojuego">
							<button className="btn btn-light">CRUD Videojuego</button>
						</Link>
						<Link to="/user">
							<button className="btn btn-light">CRUD User</button>
						</Link>
						<Link to="/admin">
							<button className="btn btn-light">CRUD Admin</button>
						</Link>
						<Link to="/tournament">
							<button className="btn btn-light">CRUD Tournaments</button>
						</Link>
						<Link to="/team">
							<button className="btn btn-light">CRUD Teams</button>
						</Link>
						<Link to="/user/tournament">
							<button className="btn btn-light">CRUD User_Tournament</button>
						</Link>
						<Link to="/user/team">
							<button className="btn btn-light">CRUD User_Team</button>
						</Link>
						<Link to="/team/tournament">
							<button className="btn btn-light">CRUD Team_Tournament</button>
						</Link>
						</div>
					</div>
					)}

			</div>
		</nav>
	);
};
