import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import DraggableMarker from "../components/DraggableMarker";
import "leaflet/dist/leaflet.css";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {

    const {userId} = useParams()
    const [uploading, setUploading] = useState(false)
    const [position, setPosition] = useState([40.4168, -3.7038])
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
    })

    const get_user = (userId) => {
            fetch(import.meta.env.VITE_BACKEND_URL +'/api/user/' + userId)
            .then(response => response.json())
            .then(data => {
                setUser(data)
                if (data.latitude && data.longitude) {
                        setPosition([data.latitude, data.longitude]);
                    }
            })
        }
    
        useEffect(() => {
            if (userId) {
                get_user(userId)
            }
        }, [userId])
    
        useEffect(() => {
            setUser((prev) => ({
                ...prev,
                latitude: position[0],
                longitude: position[1]
            }));
        }, [position])
    
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
                        email: "",
                        img: "",
                        latitude: null,
                        longitude: null
                    })
                    navigate("/user/dashboard")
                }
                else {
                    alert('No se puede modificar ese usuario')
                }
            })
        }

    return (
        <div className="container m-auto p-5 bg-body h-full">
      
            <div className="row">
                <div className="col-12 mb-4">
                <div className="page-title-box">
                    <div className="page-title">
                    <h5>Edita tu perfil de Usuario</h5>
                    </div>
                </div>
                </div>
            </div>
        
        <div className="row d-flex align-items-center">
            <div className="col-12 col-md-6 d-flex flex-column p-5">
                <i className="bi bi-person-bounding-box text-danger display-1 mx-auto mb-4"></i>
                <span className="text-muted mozilla-headline blackquote mb-2">Edita tu nombre de usuario, email, contraseña y otros datos para que tus amigos y equipos te reconozcan fácilmente.</span>
                <span className="text-muted mozilla-headline blackquote">¡Asegúrate de que tu perfil refleje tu estilo gamer!</span>
            </div>
            <div className="col-12 col-md-6">
                <form 
                    action="submit"
                    className="card p-4"
                    style={{height:"auto"}}
                    onSubmit={(e) => {
                        e.preventDefault()
                        editUser(userId)
                    }}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label" >Username</label>
                            <input className="form-control" type="text" name="username" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">Password</label>
                            <input className="form-control" type="password" name="Password" id="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">Email</label>
                            <input className="form-control" type="email" name="Email" id="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="img" className="form-label">Avatar</label>
                            <input className="form-control" type="file"
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
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Latitud</label>
                            <input className="form-control"
                                type="number"
                                step="any"
                                value={user.latitude || ""}
                                onChange={(e) => {
                                    const lat = e.target.value === "" ? null : parseFloat(e.target.value)
                                    setPosition([lat, position[1]])
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Longitud</label>
                            <input className="form-control"
                                type="number"
                                step="any"
                                value={user.longitude || ""}
                                onChange={(e) => {
                                    const lng = e.target.value === "" ? null : parseFloat(e.target.value)
                                    setPosition([position[0], lng])
                                }}
                            />
                        </div>

                    <MapContainer
                        center={position}
                        zoom={13}
                        style={{ height: "200px", width: "100%",position: "relative", zIndex: 0 }}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <DraggableMarker position={position} setPosition={setPosition} />
                    </MapContainer>
                     <button className="btn btn-danger mt-3" type="submit">Editar perfil</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default EditUser