import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const EditTeam = () => {
    const navigate = useNavigate();
    const [team, setTeam] = useState([])
    const { team_id } = useParams()
    const [uploading, setUploading] = useState(false)

    const getTeam = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/team/' + team_id, {
        })
        .then(response => response.json())
        .then(data => setTeam(data))
    }

    useEffect(() => {getTeam()}, [])

    const editTeam = () => {
        fetch(import.meta.env.VITE_BACKEND_URL +'/api/team/' + team_id, {
            method: 'PUT',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(team)
        })
        .then(response => {
            if (response.ok) {
                navigate("/user/dashboard")
            }
        })
    }

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
            setTeam(prev => ({ ...prev, img: data.secure_url }))
        } catch (err) {
            console.error("Error subiendo imagen", err)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="container my-4">
                    <h3 className="display-5 mb-4">Edita tu Equipo</h3>
                    <div className="container text-center w-50 my-5 border p-4 d-flex flex-column">
                        <label htmlFor="name" className="mx-2">Nombre</label>
                        <input type="text" name="name" id="name" value={team.name} onChange={(e) => setTeam({ ...team, name: e.target.value })}/>
                        <label htmlFor="img" className="mx-2 mt-4">Imágen</label>
                        <input type="file" 
                            name="img" 
                            id="img" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e.target.files[0])}/>
                        {uploading && <p>Subiendo imagen...</p>}
                        {team.img && (
                            <img
                                src={team.img}
                                alt="Avatar preview"
                                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                            />
                        )}
                    </div>
                    <div className="text-center">
                            <button className="btn btn-success" onClick={editTeam}>Edita Equipo</button>
                    </div>
                </div>
    )
}

export default EditTeam