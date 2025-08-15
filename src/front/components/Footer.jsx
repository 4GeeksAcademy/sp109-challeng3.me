import { Link } from "react-router-dom";
import { Contactanos } from "./Contactanos";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<div className="d-flex justify-content-center">
		<p> © 2025 Challeng3.me - A project by JVelab & NahuelPerrone85 </p>
		<div className="text-primary ms-2">
			<Link to="/nosotros">Nosotros</Link> 
        </div>
		<div className="text-primary ms-2">
			 <Link to="/contact">Contactanos</Link>
		</div>
		</div>
		
		<p>
			Made with <i className="fa fa-heart text-danger" /> by{" "}
			<a href="http://www.4geeksacademy.com">4Geeks Academy</a>
		</p>
	</footer>
);
