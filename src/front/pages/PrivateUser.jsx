import React, { useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateUser = () => {
    const { store, dispatch } = useGlobalReducer()
    const userPrivate = localStorage.getItem('token')
    const navigate = useNavigate();

   useEffect(() => { 
    const token = localStorage.getItem('token')
      if (token) {
        const decoded = jwtDecode(token)
        const currentTime = Math.floor(Date.now() / 1000)
        if (decoded.exp && decoded.exp < currentTime) {
          alert('Token expirado. Por favor, inicia sesión nuevamente.');
          localStorage.removeItem("token")
          navigate('/user/login')
        }
      }
      if (!userPrivate || store.user_auth !== true) {
        navigate('/user/login')
      }
    }, [store.user_auth])

    const logout = () => {
        localStorage.removeItem('token')
        dispatch({ type: 'set_auth', payload: false });
        navigate('/user/login')
    }

  return (
    <div className='container text-center'>
      <h1> User Page</h1>
      <p>Zona Privada del Usuario</p>
      <button className='btn btn-danger' onClick={logout}>Log Out</button>
    </div>
  )
}

export default PrivateUser;