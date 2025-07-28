import React, { useState, useEffect } from "react";

const EditAdminModal = ({onAdminModified, adminId}) => {
    const [isPopupOpen, setPopupOpen] = useState(false)
    const [admin, setAdmin] = useState({
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

    const get_admin = (adminId) => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/admin/' + adminId)
        .then(response => response.json())
        .then(data => {
            setAdmin(data)
        })
    }

    
    useEffect(() => {
        if (adminId) {
            get_admin(adminId)
        }
    }, [adminId]);

    const editAdmin = (adminId) => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/admin/' + adminId, {
            method: 'PUT',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(admin)
            })
        .then(response => {
            if (response.ok) {
                setAdmin({
                    username: "",
                    password: "",
                    email: ""
                })
                closePopup()
                onAdminModified()
            }
            else {
                alert('No se puede modificar ese admin')
            }
        })
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={openPopup}>✎</button>

            {isPopupOpen && (
                <div className="modal-overlay">
                    <div className="modal-content d-flex gap-2">
                        <h4>Editar admin</h4>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" value={admin.username} onChange={(e) => setAdmin({ ...admin, username: e.target.value })}/>
                        <label htmlFor="Password">Password</label>
                        <input type="password" name="Password" id="Password" value={admin.password} onChange={(e) => setAdmin({ ...admin, password: e.target.value })}/>
                        <label htmlFor="Email">Email</label>
                        <input type="email" name="Email" id="Email" value={admin.email} onChange={(e) => setAdmin({ ...admin, email: e.target.value })}/>
                        <div className="d-flex justify-content-around">
                        <button className="btn btn-success mt-3" onClick={() => editAdmin(admin.id)}>Editar Admin</button>
                        <button className="btn btn-secondary mt-3" onClick={closePopup}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditAdminModal;