import React, { useState, useEffect } from "react";

const CreateUserModal = ({onUserCreated}) => {
    const [isPopupOpen, setPopupOpen] = useState(false)
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: ""
    })

    const openPopup = () => setPopupOpen(true)
    const closePopup = () => setPopupOpen(false)

    useEffect(() => {
        if (isPopupOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isPopupOpen])

    const addUser = () => {
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
                closePopup()
                onUserCreated()
            }
        })
    }

    return (
        <div>
            <span className="small-text" style={{ color: 'lightblue', textDecoration: 'underline', cursor: 'pointer' }}
                onClick={openPopup}>
            Regístrate aquí
            </span>

            {isPopupOpen && (
                <div className="modal-overlay">
                    <div className="modal-content d-flex gap-2">
                        <h4>Crear nuevo usuario</h4>
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                        <label for="Password">Password</label>
                        <input type="password" name="Password" id="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                        <label for="Email">Email</label>
                        <input type="email" name="Email" id="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
                        <div className="d-flex justify-content-around">
                        <button className="btn btn-success mt-3" onClick={addUser}>Crear Usuario</button>
                        <button className="btn btn-secondary mt-3" onClick={closePopup}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateUserModal;