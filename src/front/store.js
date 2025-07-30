export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    users: [],
    admins: [],
    tournament: [],
    newTournament: [],
    editarTorneo: [{name: null}],
    videojuego: [],
    juego: [],
    editarVideoJuego: [{videojuegos: null}],
    newVideoJuego: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

    case 'list_tournament':
      const  {torneo}  = action.payload
        return {
        ...store,
        tournament: torneo
      };

    case 'add_tournament':

      return {
        ...store,
      newTournament: action.payload

    };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
      
      case 'get_users':
        return {
          ...store,
          users: action.payload
        };
        case 'get_admins':
        return {
          ...store,
          admins: action.payload
        };

      case 'edit_torneo':
        return {
          ...store,
          editarTorneo: action.payload
        };

      case 'list_videojuego':
        const  {juego}  = action.payload
        return {
        ...store,
        videojuego:juego
      };

      case 'edit_videojuego':
        return {
          ...store,
          editarVideoJuego: action.payload
        };

      case 'add_videojuego':
        return {
        ...store,
      newVideoJuego: action.payload

    };
    
      default:
        throw Error('Unknown action.');
  
  }
} 


