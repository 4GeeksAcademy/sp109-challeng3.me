import React, { useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateAdmin = () => {
  const { store, dispatch } = useGlobalReducer()
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  useEffect(() => { 
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // tiempo actual en segundos

      if (decoded.exp && decoded.exp < currentTime) {
        setIsAdmin(false);
        alert('Token expirado. Por favor, inicia sesión nuevamente.');
        localStorage.removeItem("token")
        navigate('/admin/login')
      }

      // Verificamos si el rol es "admin"
      if (decoded?.role === 'admin') {
        dispatch({ type: 'set_admin_auth', payload: true });
      } else {
        dispatch({ type: 'set_admin_auth', payload: false });
        navigate('/admin/login');
      }} 
    else {
        dispatch({ type: 'set_admin_auth', payload: false });
        navigate('/admin/login');
      }
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        dispatch({ type: 'set_admin_auth', payload: false });
        navigate('/admin/login')
    }

  return (
    <div className='container mx-auto my-5 p-4 border rounded shadow text-center'>
      <h1>Private Admin Page</h1>
      <p>This page is only accessible to users with admin privileges.</p>
      <button className='btn btn-danger' onClick={logout}>Log Out</button>
    </div>
  )
}

export default PrivateAdmin;