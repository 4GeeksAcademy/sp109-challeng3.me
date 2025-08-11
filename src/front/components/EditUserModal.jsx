import React, { useState, useEffect } from "react";

const EditUserModal = ({onUserModified, userId}) => {
    const [isPopupOpen, setPopupOpen] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
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
    }, [userId])

    const handleImageUpload = async (file) => {
        setUploading(true);
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "Challeng3.me")
        formData.append("cloud_name", "da35l3kmn")

        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/da35l3kmn/image/upload",
                {
                    method: "POST",
                    body: formData
                }
            )
            const data = await res.json()
            setUser(prev => ({ ...prev, img: data.secure_url }))
        } catch (err) {
            console.error("Error subiendo imagen", err)
        } finally {
            setUploading(false)
        }
    };

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
            <button className="border shadow rounded bg-dark text-info no-link small-text" onClick={openPopup}>Editar perfil</button>

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
                        <label htmlFor="img">Avatar</label>
                        <input type="file"
                            id="img"
                            accept="image/*"
                            onChange={(e) =>
                            handleImageUpload(e.target.files[0])
                            } />
                        {uploading && <p>Subiendo imagen...</p>}
                        {user.img && (
                            <img
                                src={user.img}
                                alt="Avatar preview"
                                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                            />
                        )}
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