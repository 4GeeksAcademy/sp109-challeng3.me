import { Link } from "react-router-dom";
import { Contactanos } from "./Contactanos";

export const Footer = () => (
		<footer className="footer bg-body-secondary">
			<div className="container">
				<div className="row my-3">
					<div className="col-md-6">2025 © Challeng3.me</div>
					<div className="col-md-6">
						<div className="footer-links d-flex gap-3 justify-content-end">
							<Link to="/nosotros" className="footer-links">Sobre Nosotros</Link>&nbsp;
							<Link to="https://paypal.me/JoseLuisVelaBorrego" className="footer-links" target="_blank" rel="noopener noreferrer">Apoyanos</Link>&nbsp;
							<Link to="/contact" className="footer-links">Contactanos</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
);
