import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import CreateUserModal from "../components/CreateUserModal.jsx";
import EditUserModal from "../components/EditUserModal.jsx"

const UserCRUD = () => {
    const {store, dispatch} = useGlobalReducer()
    const [users, setUsers] = useState([])

    const getUsers = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user')
        .then(response => response.json())
        .then(data => {
            dispatch({ type: "get_users", payload: data })
            setUsers(data)
        })
        
    }

    const deleteUser = (id) => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user/' + id, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                getUsers()
            }
            else {
                console.error("Error al eliminar el usuario")
            }
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="container my-4">
            <h3 className="display-5 mb-4">Users</h3>
            <div >
                {users.map(user => (<p key={user.id} className="border p-2 d-flex justify-content-between">
                    <Link to='/'>{user.username}</Link>
                    <span className="d-flex justify-content-between gap-2 align-items-center">
                        <span><EditUserModal userId={user.id} onUserModified={getUsers}/></span>
                        <button className="btn btn-outline-danger align-self-end" onClick={() => deleteUser(user.id)}>X</button>
                    </span>
                    </p>))}
            </div>
            <div className="row">
                <CreateUserModal onUserCreated={getUsers}/>
            </div>
        </div>
    )
}

export default UserCRUD