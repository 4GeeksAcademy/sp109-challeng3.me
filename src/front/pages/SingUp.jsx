import React, { useState } from "react";
import logo from "../assets/img/logo-challeng3me.webp";
import { useNavigate } from "react-router-dom";

const SingUp = () => {

    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const addUser = () => {
        if (!user.username || !user.email || !user.password) {
            alert('Debes rellenar todos los campos')
            return
        }
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
        })
        .then(response => {
            if (response.ok) {
                setUser({
                    username: "",
                    password: "",
                    email: ""
                })
                navigate('/user/login')
            }
        })
    }

    return(
        <div className="container m-auto p-5 bg-body h-full d-flex justify-content-center align-items-center">


        <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-8">
            <div className="card" style={{height: "auto"}}>
                <div className="card-body">
                    <form className="m-auto rounded" onSubmit={(e) => {
                        e.preventDefault()
                        addUser()
                    }}>
                        <div className="rounded rounded-bottom-0 " >
                            <img src={logo} alt="Logo" className="w-25 d-flex mx-auto rounded p-2" />
                        </div>
                        <div className="text-center w-75 m-auto mt-2">
                            <h4 className="text-dark- text-center mt-0 fw-bold">Registrate</h4>
                            <p className="text-muted mb-4">Crea tu cuenta y comienza el desafío.</p>

                        </div>
                        <div className="mb-3 p-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input value= {user.username} onChange={(e) => setUser({...user, username: e.target.value})}  type="username" className="form-control" id="username" aria-describedby="emailHelp"/>
                        </div>
                        <div className="mb-3 p-3 pt-0">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input value= {user.email} onChange={(e) => setUser({...user, email: e.target.value})}  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                            <label htmlFor="exampleInputPassword1" className="form-label ms-3">Password</label>
                        <div className="mb-3 p-3 pt-0 input-group">
                            <input value= {user.password} onChange={(e) => setUser({...user, password: e.target.value})}  type="password" className="form-control" id="exampleInputPassword1"/>
                            <div className="input-group-text input-group-password " data-password="false">
                                <i className="bi bi-eye-slash"></i>
                            </div>
                        </div>
                        <div className="d-flex gap-2 flex-column">
                            <div className="text-center">
                                <button type="submit" className="btn btn-danger">Crear cuenta</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>

    )
}

export default SingUp