import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto d-flex gap-2">
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

				</div>
			</div>
		</nav>
	);
};