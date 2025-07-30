import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
    const {store, dispatch} = useGlobalReducer()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const login = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Login failed");
            }
        })
        .then(data => {
            dispatch({ type: "set_admin_auth", payload: true })
            localStorage.setItem("token", data.access_token)
            navigate("/admin/dashboard")
        })
    }

    return (
        <div className="w-50 flex flex-col items-center justify-center h-screen bg-gray-100 border rounded shadow m-auto my-5">
            <div className="bg-white p-8 rounded-lg shadow-md d-flex justify-center flex-column">
                <h2 className="text-2xl font-bold mb-6 text-center my-4">
                    Admin Login
                </h2>
                <div className="mx-auto d-flex flex-column mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        className="px-3 py-2 border border-gray-300 rounded-md
                        focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto"
                        placeholder="Enter your username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </div>
                <div className="mx-auto d-flex flex-column mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                <button
                    className="btn btn-success px-4 py-2 rounded-md
                    hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={login}
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default LoginAdmin;