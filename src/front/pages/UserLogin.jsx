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
      .then((response) => {
        if (response.status == 200){
          dispatch({ 
            type: "set_auth", 
            payload: true })
          }
          return response.json() 
        })
        .then((data) => {
          localStorage.setItem("token", data.access_token);
          setEmail("")
          setPassword("")
                navigate("/user/private");

              }
        )
}

  return (
    <div className="container mt-5 w-75">
               {/* <div className="d-flex justify-content-end">
                <CreateUserModal /> 
              </div> */}
                <h1 className="text-center">User Login</h1>
             <form className="w-75 m-auto" onSubmit={accesLogin}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input value= {email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input value= {password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
             </form>
    </div>
  );
};
export default UserLogin;