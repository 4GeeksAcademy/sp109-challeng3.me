import React, { useState, useEffect, useRef } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ApiIntegration = () => {
  const [query, setQuery] = useState('')
  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [created, setCreated] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [input, setInput] = useState({})
  const dropdownRef = useRef(null)
  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // tiempo actual en segundos

      if (decoded.exp && decoded.exp < currentTime) {
        alert('Token expirado. Por favor, inicia sesión nuevamente.');
        localStorage.removeItem("token")
        navigate('/admin/login')
      }
      
        // Verificamos si el rol es "admin"
        if (decoded?.role === 'admin') {
          dispatch({ type: 'set_admin_auth', payload: true })
        } else {
          dispatch({ type: 'set_admin_auth', payload: false })
          alert('No tienes permisos de administrador.')
          navigate('/videojuego')
        }
    } else {
      alert('No estás autenticado. Por favor, inicia sesión.')
      navigate('/admin/login')
    }}, [])

  const fetchGames = async () => {
    if (!query) {
      setGames([])
      return
    }

    setLoading(true)
    setCreated(false)
    setError(null)
    try {
    const API_KEY = "f4eecd82ef9ca4a1f56e14ef4b4c5854a4ce9f66"
    const proxyUrl = 'https://corsproxy.io/?';
    const apiUrl = `https://www.giantbomb.com/api/search/?api_key=${API_KEY}&format=json&query=${encodeURIComponent(query)}&resources=game&limit=5`;

    const response = await fetch(`${proxyUrl}${apiUrl}`, {
        headers: {
            'Accept': 'application/json'
         }
        }
    );
      const data = await response.json();

      if (data.error && data.error !== 'OK') {
        setError('Error en la API: ' + data.error);
        setGames([]);
      } else {
        setGames(data.results || [])
        setShowDropdown(true)
      }
    } catch (err) {
      setError('Error al buscar juegos: ' + err.message);
      setGames([])
    }
    setLoading(false)
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 1) {
        fetchGames()
      } else {
        setGames([])
        setShowDropdown(false)
      }
    }, 500); // debounce

    return () => clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, []);

  const handleSelectGame = (game) => {
    setSelectedGame(game)
    setQuery(game.name)
    setShowDropdown(false)
    // Aquí podrías poblar automáticamente otros campos del formulario si los tienes
  };

  const createGame = () => {
    if (input.name && input.description && input.platforms && input.release_date && input.genre && input.img) {
      setSelectedGame(input)
    }

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: selectedGame.name,
        description: selectedGame.deck,
        platforms: selectedGame.platforms.map(p => p.name).join(', '),
        release_date: selectedGame.original_release_date || null,
        img: selectedGame.image?.medium_url,
        genre: selectedGame.genres ? selectedGame.genres.map(g => g.name).join(', ') : null
      })
    })
    .then(response => {
      if (!response.ok) {
        setError('Error al crear el videojuego')
        return
      }
      return response.json()
    })
    .then(data => {
      if (!data) return

      setCreated(true)
      setError(null)
      setQuery('')
      setGames([])
      setShowDropdown(false)
    })
    .catch(err => {
    console.error("Error en createGame:", err);
    setError(err.message);
    setCreated(false);
  })
  }

  return (
    <div className="relative max-w-xl mx-auto mt-8 text-center" ref={dropdownRef}>
      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="Buscar juego..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && games.length > 0 && setShowDropdown(true)}
      />

      {loading && <p className="text-sm mt-1">Cargando...</p>}

      {showDropdown && games.length > 0 && (
        <ul className="dropdown-menu position-relative show w-25 border border-secondary rounded mt-1 overflow-auto shadow bg-white max-h-60 mx-auto">
          {games.map((game) => (
            <li
                key={game.id}
                className="dropdown-item"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelectGame(game)}
            >
              {game.name}
            </li>
          ))}
        </ul>
      )}
      {!selectedGame && (
        <div className="m-4 mx-auto p-4 border rounded shadow container fs-1">
          <h2 className="font-semibold">Nombre</h2>
          <input
            type="text"
            className="form-control mt-2"
            value={input.name || ''}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
          <h2 className="font-semibold mt-3">Descripción</h2>
          <textarea
            className="form-control mt-2"
            rows="3"
            value={input.description || ''}
            onChange={(e) => setInput({ ...input, description: e.target.value })}
          />
          <h2 className="font-semibold mt-3">Plataformas</h2>
          <input
            type="text"
            className="form-control mt-2"
            value={input.platforms || ''}
            onChange={(e) => setInput({ ...input, platforms: e.target.value })}
          />
          <h2 className="font-semibold mt-3">Fecha de Lanzamiento</h2>
          <input
            type="date"
            className="form-control mt-2"
            value={input.release_date || ''}
            onChange={(e) => setInput({ ...input, release_date: e.target.value })}
          />
          <h2 className="font-semibold mt-3">Género</h2>
          <input
            type="text"
            className="form-control mt-2"
            value={input.genre || ''}
            onChange={(e) => setInput({ ...input, genre: e.target.value })}
          />
          <h2 className="font-semibold mt-3">Imagen URL</h2>
          <input
            type="text"
            className="form-control mt-2"
            value={input.img || ''}
            onChange={(e) => setInput({ ...input, img: e.target.value })}
          />
          <button
            className="btn btn-success mt-3"
            onClick={createGame}
          >
            Crear Juego
          </button>
          {error && <p className="text-danger text-sm mt-1">{error}</p>}
          {created && <p className="text-success text-sm mt-1">Juego creado exitosamente!</p>}
        </div>
      )}
      {selectedGame && (
        <div className="mt-4 p-4 border rounded shadow container">
          <img
            src={selectedGame.image?.medium_url || 'https://via.placeholder.com/150'}
            alt={selectedGame.name}
            className='rounded-circle gameimg m-2'/>
          <h2 className="text-lg font-semibold">{selectedGame.name}</h2>
          {selectedGame.deck && <p className="text-sm mt-1">{selectedGame.deck}</p>}
          {selectedGame.genre && (
            <p className="text-sm mt-1">
              Genero: {selectedGame.genre.map(g => g.name).join(', ')}
            </p>
          )}
          {selectedGame.platforms && (
            <p className="text-sm mt-1">
              Plataformas: {selectedGame.platforms.map(p => p.name).join(', ')}
            </p>
          )}
          {selectedGame.original_release_date && (
            <p className="text-sm mt-1">
              Lanzamiento: {selectedGame.original_release_date}
            </p>
          )}
          {selectedGame && (
            <button
              className="btn btn-success mt-3"
              onClick={createGame}
            >
              Crear Juego
            </button>
            
          )}
          {error && (<p className="text-danger text-sm mt-1">{error}</p>)}
          {created && (<p className="text-success text-sm mt-1">Juego creado exitosamente!</p>)}
        </div>
      )}
    </div>
  );
};

export default ApiIntegration;