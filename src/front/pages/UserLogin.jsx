// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateUserModal from "../components/CreateUserModal.jsx";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/img/logo-challeng3me.webp";

const UserLogin = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();


  function accesLogin(e) {
    e.preventDefault()

    if (!email || !password) {
      alert("Por favor, completa email y contraseña.");
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/login", requestOptions)
      .then(async (response) => {
        const data = await response.json();

        if (response.status === 200 && data.access_token) {
          localStorage.setItem("token", data.access_token);

          // Decodifica el token para obtener el rol
          const decoded = jwtDecode(data.access_token);
          const role = decoded.role;

          // Establece auth en el store según el rol
          if (role === "admin") {
            dispatch({ type: "set_admin_auth", payload: true });
            navigate("/admin/dashboard");
          } else if (role === "user") {
            dispatch({ type: "set_auth", payload: true });
            navigate("/user/dashboard");
            console.log(store.user_auth)
          } else {
            alert("Rol no reconocido.");
            return;
          }

          setEmail("");
          setPassword("");
        } else if (response.status === 401 || response.status === 400) {
          // Si credenciales inválidas
          alert("Email o contraseña inválido.");
        } else {
          // Otros errores
          alert(data?.msg || "Error desconocido.");
        }
      })
      .catch((error) => {
        alert("Error de red o del servidor");
      })
  }

  return (
    <div className="container m-auto p-5 bg-body h-full d-flex justify-content-center align-items-center">
        <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-8">
        <form className="m-auto card" onSubmit={accesLogin} style={{ height: "auto" }}>
          <div className="card-body">
          <div className="rounded rounded-bottom-0 " >
           <img src={logo} alt="Logo" className="w-25 d-flex mx-auto rounded p-2" />
          </div>
          <div className="text-center w-75 m-auto mt-2">
          <h4 className="text-dark- text-center mt-0 fw-bold">Bienvenido</h4>
          <p className="text-muted mb-4">Introduce tu email y password para acceder.</p>

          </div>
          <div className="mb-3 p-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
              <input value= {email} onChange={(e) => setEmail(e.target.value)} placeholder="Introduce tu email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
              <label htmlFor="exampleInputPassword1" className="form-label ms-3">Password</label>
              <div className="mb-3 p-3 pt-0 input-group">
              <input value= {password} onChange={(e) => setPassword(e.target.value)} placeholder="Introduce tu password" type="password" className="form-control" id="exampleInputPassword1"/>
              <div className="input-group-text input-group-password " data-password="false">
                  <i className="bi bi-eye-slash"></i>
                </div>
          </div>
          <div className="d-flex gap-2 flex-column">
            {/* <div className="text-center"> */}
            <button type="submit" className="btn btn-danger mx-3">Log In</button>
            {/* </div> */}
            <div className="d-flex gap-1 small-text align-self-center mt-3">
                <Link to="/singup">
                  ¿No tienes cuenta? 
                </Link>
              </div>
              <div className="d-flex gap-1 small-text align-self-center mb-4">
              ¿Olvidaste la contraseña?
              </div>
          </div>
          </div>
        </form>

        </div>


    </div>


  );
};
export default UserLogin;