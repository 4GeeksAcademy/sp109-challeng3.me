import React, { useState, useEffect, Children } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo-challeng3me.webp";
import useGlobalReducer from "../hooks/useGlobalReducer";

function SideBar({children}) {
  const {store, dispatch} = useGlobalReducer()
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [role, setRole] = useState(null); 
  const [collapsed, setCollapsed] = useState(false); 
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const checkToken = () => {
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < currentTime) {
        alert("Token expirado. Por favor, inicia sesión nuevamente.");
        localStorage.removeItem("token");
        navigate("/user/login");
      }
    } else {
      navigate("/user/login");
    }
  };

  useEffect(() => {
    checkToken();
    try {
      const decoded = jwtDecode(token);
      if (decoded?.role === "admin") {
        setIsLoggedIn(true);
        setRole("admin");
      } else if (decoded?.role === "user") {
        setIsLoggedIn(true);
        setRole("user");
      }
    } catch (error) {
      console.error("Token inválido:", error.message);
      setIsLoggedIn(false);
      setRole(null);
      localStorage.removeItem("token");
    }
  }, [token]);

  const logout = () => {
		localStorage.removeItem("token")
		setRole(null)
		dispatch({ type: 'set_admin_auth', payload: false })
		dispatch({ type: 'set_auth', payload: false })
		navigate('/user/login')
	}

  return (
    <>
      <nav
      className={`sidebar d-flex flex-column position-sticky ${
        collapsed ? "collapsed" : ""
      }`}
    >
      <button
        className=" btn btn-sm btn-outline-dark p-2"
        onClick={() => setCollapsed(!collapsed)} // 🔹 Cambiamos el estado
      >
        <i className={`fas fa-list`}></i>
      </button>

      <div className="p-4">
        {collapsed && <img src={logo} alt="logo" className="minilogo"/>}
        {!collapsed && <img src={logo} alt="logo" className="logo logo-text mx-auto"/>}
      </div>

      <div className="nav flex-column">
        <Link to="/user/dashboard" className="sidebar-link active text-decoration-none p-3">
          <i className="fas fa-home me-3"></i>
          {!collapsed && <span>Dashboard</span>}
        </Link>
        <Link to="/select/game" className="sidebar-link text-decoration-none p-3">
          <i className="bi bi-controller me-3"></i>
          {!collapsed && <span>Juegos</span>}
        </Link>
        <Link to="/search/tournament" className="sidebar-link text-decoration-none p-3">
          <i className="bi bi-trophy-fill me-3"></i>
          {!collapsed && <span>Torneos</span>}
        </Link>
        <Link to="#" className="sidebar-link text-decoration-none p-3">
          <i className="fas fa-users me-3"></i>
          {!collapsed && <span>Equipos</span>}
        </Link>
        <Link to="#" className="sidebar-link text-decoration-none p-3">
          <i className="fas fa-box me-3"></i>
          {!collapsed && <span>Products</span>}
        </Link>
        <Link to="#" className="sidebar-link text-decoration-none p-3">
          <i className="fas fa-gear me-3"></i>
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>

      <div className="profile-section mt-auto">
        <div  onClick={logout} className="sidebar-link text-decoration-none p-3 text-danger">
          <span ><i className="bi bi-door-open-fill me-3"></i></span>
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
    </nav>
    </>
  );
}

export default SideBar;
