import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto d-flex gap-2">
					<Link to="/user">
						<button className="btn btn-primary">CRUD User</button>
					</Link>
					<Link to="/admin">
						<button className="btn btn-primary">CRUD Admin</button>
					</Link>
					<Link to="/tournament">
						<button className="btn btn-primary">Crud Tournaments</button>
					</Link>
					<Link to="/team">
						<button className="btn btn-primary">Crud Teams</button>
					</Link>
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>

				</div>
			</div>
		</nav>
	);
};