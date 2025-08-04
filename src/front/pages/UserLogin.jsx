// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateUserModal from "../components/CreateUserModal.jsx";

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
      };
      
  fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/login", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200 && data.access_token) {
          localStorage.setItem("token", data.access_token);
          dispatch({ type: "set_auth", payload: true });
          setEmail("");
          setPassword("");
          navigate("/user/dashboard");
        } else {
          alert(data.msg || "Email o contraseña incorrectos");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Error de red o del servidor");
      });
  }

  return (
    <div className="container mt-5 w-75">
      <h1 className="text-center">Accede a tu cuenta</h1>
        <form className="w-50 m-auto border p-4 shadow rounded" onSubmit={accesLogin}>
          <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Email</label>
              <input value= {email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Password</label>
              <input value= {password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
          </div>
          <div className="d-flex gap-2 flex-column">
            <button type="submit" className="btn btn-success">Login</button>
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