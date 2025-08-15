import React, { useState, useEffect, Children } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../../public/logo-challeng3me.png";
import isologo from "../../../public/isologo-challeng3me.png";

function SideBar({children}) {
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
      alert("No estás autenticado. Por favor, inicia sesión.");
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

  return (
    <>
      <nav
      className={`sidebar d-flex flex-column position-sticky h-full ${
        collapsed ? "collapsed" : ""
      }`}
    >
      <button
        className="toggle-btn btn btn-sm btn-outline-dark p-2"
        onClick={() => setCollapsed(!collapsed)} // 🔹 Cambiamos el estado
      >
        <i className={`fas fa-list`}></i>
      </button>

      <div className="p-4">
        {!collapsed && <img src={logo} alt="logo" className="logo logo-text mx-auto"/>}
      </div>

      <div className="nav flex-column">
        <Link to="#" className="sidebar-link active text-decoration-none p-3">
          <i className="fas fa-home me-3"></i>
          {!collapsed && <span>Dashboard</span>}
        </Link>
        <Link to="#" className="sidebar-link text-decoration-none p-3">
          <i className="fas fa-chart-bar me-3"></i>
          {!collapsed && <span>Analytics</span>}
        </Link>
        <Link to="#" className="sidebar-link text-decoration-none p-3">
          <i className="fas fa-users me-3"></i>
          {!collapsed && <span>Customers</span>}
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

      <div className="profile-section mt-auto p-4">
        <div className="d-flex align-items-center">
          <img
            src="https://randomuser.me/api/portraits/women/70.jpg"
            className="rounded-circle"
            alt="Profile"
            style={{ width: "40px", height: "40px" }}
          />
          {!collapsed && (
            <div className="ms-3 profile-info">
              <h6 className="text-white mb-0">Alex Morgan</h6>
              <small className="text-muted">{role}</small>
            </div>
          )}
        </div>
      </div>
    </nav>
    </>
  );
}

export default SideBar;
