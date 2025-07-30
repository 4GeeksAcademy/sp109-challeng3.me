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
    teams: [],
    user_tournament: [],
    videojuego: [],
    juego: [],
    editarVideoJuego: [{videojuegos: null}],
    newVideoJuego: [],
    user_team: [],
    admin_auth: false,
    userVideoJuego: [],
    editarUserVideoJuego: [{videoJuego_id: null, user_id: null, ranking: null}],
    newUserVideoJuego: []
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
        }

      case 'get_teams':
        return {
          ...store,
          teams: action.payload
        };

      case 'get_user_tournament':
        return {
          ...store,
          user_tournament: action.payload
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
    
      case 'get_user_team':
        return {
          ...store,
          user_team: action.payload
        };

      case 'set_admin_auth':
        return {
          ...store,
          admin_auth: action.payload
        };
            case 'list_user_videojuego':
        const { userVideoJuego } = action.payload
          return {
          ...store,
          userVideoJuego: userVideoJuego
        };
      case 'edit_user_videojuego':
        return {
          ...store,
          editarUserVideoJuego: action.payload
        };
      case 'add_user_videojuego':
        return {
          ...store,
          newUserVideoJuego: action.payload
        };

      default:
        throw Error('Unknown action.');
  
  }
} 


