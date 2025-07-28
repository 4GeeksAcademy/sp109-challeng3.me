import React, { useState, useEffect } from "react";

const EditUserModal = ({onUserModified, userId}) => {
    const [isPopupOpen, setPopupOpen] = useState(false)
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        level: "",
        points: 0,
        premium: false
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

    const get_user = (userId) => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user/' + userId)
        .then(response => response.json())
        .then(data => {
            setUser(data)
        })
    }

    
    useEffect(() => {
        if (userId) {
            get_user(userId)
        }
    }, [userId]);

    const editUser = (userId) => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/user/' + userId, {
            method: 'PUT',
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
                onUserModified()
            }
            else {
                alert('No se puede modificar ese usuario')
            }
        })
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={openPopup}>✎</button>

            {isPopupOpen && (
                <div className="modal-overlay">
                    <div className="modal-content d-flex gap-2">
                        <h4>Editar usuario </h4>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                        <label htmlFor="Password">Password</label>
                        <input type="password" name="Password" id="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                        <label htmlFor="Email">Email</label>
                        <input type="email" name="Email" id="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
                        <label htmlFor="level">Level</label>
                        <input type="number" name="level" id="level" value={user.level} onChange={(e) => setUser({ ...user, level: e.target.value })}/>
                         <label htmlFor="points">Points</label>
                        <input type="number" name="points" id="points" value={user.points} onChange={(e) => setUser({ ...user, points: e.target.value })}/>
                         <label htmlFor="premium">Premium</label>
                        <input type="checkbox" name="premium" id="premium" value={user.premium} onChange={(e) => setUser({ ...user, premium: e.target.checked })}/>
                        <div className="d-flex justify-content-around">
                        <button className="btn btn-success mt-3" onClick={() => editUser(user.id)}>Editar Usuario</button>
                        <button className="btn btn-secondary mt-3" onClick={closePopup}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditUserModal;