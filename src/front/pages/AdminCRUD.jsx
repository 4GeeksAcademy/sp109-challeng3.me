import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import CreateAdminModal from "../components/CreateAdminModal.jsx";
import EditAdminModal from "../components/EditAdminModal.jsx"
import {jwtDecode} from "jwt-decode"

const AdminCRUD = () => {
    const {store, dispatch} = useGlobalReducer()
    const [admins, setAdmins] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

    const getAdmins = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/admin')
        .then(response => response.json())
        .then(data => {
            dispatch({ type: "get_admins", payload: data })
            setAdmins(data)
        })
        
    }

    const deleteAdmin = (id) => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/admin/' + id, {
            method: 'DELETE',
            headers: { 
            "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
        .then(response => {
            if (response.ok) {
                getAdmins()
            }
            else {
                console.error("Error al eliminar el admin")
            }
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.role === "admin") {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error("Invalid token", error);
            }
        } 
        getAdmins()
    }, [])

    return (
        <div className="container my-4">
            <h3 className="display-5 mb-4">Admins</h3>
            <div >
                {admins.map(admin => (<p key={admin.id} className="border p-2 d-flex justify-content-between">
                    <Link to={`/admin/${admin.id}`}>{admin.username}</Link>
                    <span className="d-flex justify-content-between gap-2 align-items-center">
                        {isAdmin &&
                        <span><EditAdminModal adminId={admin.id} onAdminModified={getAdmins}/></span>
                        }
                        {isAdmin &&
                        <button className="btn btn-outline-danger align-self-end" onClick={() => deleteAdmin(admin.id)}>X</button>
                        }
                    </span>
                    </p>))}
            </div>
            <div className="row">
                {isAdmin &&
                <CreateAdminModal onAdminCreated={getAdmins}/>
                }
            </div>
        </div>
    )
}

export default AdminCRUD