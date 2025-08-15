// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateUserModal from "../components/CreateUserModal.jsx";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/img/logo-big.png";

const UserLogin = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer();
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState ("")
  const navigate = useNavigate();

  
  function accesLogin (e){
    e.preventDefault()
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json' },
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
    <div className="container p-3 w-50">
        <form className="w-50 m-auto border shadow rounded" onSubmit={accesLogin}>
          <div className="rounded rounded-bottom-0" style={{backgroundColor:"#05052f"}}>
           <img src={logo} alt="Logo" className="w-50 d-flex mx-auto" />
          </div>
         <h3 className="text-center mt-2">Sing In</h3>
         <p className="text-center"> Enter your username and password to access. </p>
          <div className="mb-3 p-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
              <input value= {email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
              <label htmlFor="exampleInputPassword1" className="form-label ms-3">Password</label>
              <div className="mb-3 p-3 pt-0 input-group">
              <input value= {password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" type="password" className="form-control" id="exampleInputPassword1"/>
              <div class="input-group-text input-group-password " data-password="false">
                  <i class="bi bi-eye-slash"></i>
                </div>
          </div>
          <div className="d-flex gap-2 flex-column p-2">
            <button type="submit" className="btn btn-danger p-2">Login</button>
            <div className="d-flex gap-1 small-text align-self-center">
              ¿No tienes cuenta? 
              <CreateUserModal/>
              </div>
              <div className="d-flex gap-1 small-text align-self-center">
              ¿Olvidaste la contraseña?
              </div>
          </div>
        </form>
    </div>
  );
};
export default UserLogin;