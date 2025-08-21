import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import isologo from "../assets/img/isologo-challeng3me (1).png";
import { useLocation } from "react-router-dom";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()
	const [isAdmin, setIsAdmin] = useState(false)
	const [isUser, setIsUser] = useState(false)
	const [user, setUser] = useState([])
	const navigate = useNavigate()
	const location = useLocation()

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

	useEffect(() => {
		getUserInfo(user.id)
	}, [location.pathname])

  const logout = () => {
		localStorage.removeItem("token")
		setRole(null)
		dispatch({ type: 'set_admin_auth', payload: false })
		dispatch({ type: 'set_auth', payload: false })
		navigate('/user/login')
	}

	return (
		<nav className="navbar bg-body-secondary py-0">
			<div className="container">

				<Link to="/" className="py-3">
					<img src={isologo} alt="isologo" className="brand-logo"/>
				</Link>
				{isUser || isAdmin ? (
					<div className="ml-auto d-flex gap-2 perfilbtn">
						<div className="dropdown d-flex align-items-center perfilbtn">
							<a className="nav-link dropdown-toggle arrow-none nav-user px-2 dropdown-toggle border-0 perfilbtn" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<img
								src={user.img ? user.img : "https://static.vecteezy.com/system/resources/previews/023/465/688/non_2x/contact-dark-mode-glyph-ui-icon-address-book-profile-page-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg"}
								className="rounded-circle"
								alt="Profile"
								style={{ width: "40px", height: "40px", border: "0.5px solid white" }}
								draggable="false"
							/>
								<span class="d-lg-flex flex-column gap-1 d-none"><h5 class="my-0">{user.username}</h5>
								<h6 class="my-0 fw-normal align-self-start">
									Nivel: {user.level} {user.premium ? ("Premium") : ("Free")}
								</h6></span>
							</a>
							<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
								<li><Link className="dropdown-item" to="/user/dashboard">Dashboard</Link></li>
								<li><hr className="dropdown-divider"/></li>
								<li><Link className="dropdown-item" to="/" onClick={logout}>Log Out</Link></li>
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
