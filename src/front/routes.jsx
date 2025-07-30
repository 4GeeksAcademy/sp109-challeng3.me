// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Tournament } from "./components/Tournament.jsx";
import { Card } from "./components/Card.jsx";
import { Form } from "./components/Form.jsx";
import UserCRUD from "./pages/UserCRUD";
import AdminCRUD from "./pages/AdminCRUD";
import SingleUser from "./pages/SingleUser";
import SingleAdmin from "./pages/SingleAdmin";
import { EditTournament } from "./components/EditTournament.jsx";
import TeamCRUD from "./pages/TeamCRUD.jsx";
import CreateTeam from "./pages/CreateTeam.jsx";
import SingleTeam from "./pages/SingleTeam.jsx";
import EditTeam from "./pages/EditTeam.jsx";
import UserTournamentCRUD from "./pages/UserTournamentCRUD.jsx";
import CreateUserTournament from "./pages/CreateUserTournament.jsx";
import SingleUserTournament from "./pages/SingleUserTournament.jsx";
import EditUserTournament from "./pages/EditUserTournament.jsx";
<<<<<<< HEAD
import CreateUserTeam from "./pages/CreateUserTeam.jsx";
import SingleUserTeam from "./pages/SingleUserTeam.jsx";
import EditUserTeam from "./pages/EditUserTeam.jsx";
import UserTeamCRUD from "./pages/UserTeamCRUD.jsx";
=======
import { Videojuego } from "./components/VideoJuego.jsx";
import { EditVideoJuego } from "./components/EditVideoJuego.jsx";
import { CardVideoJuego } from "./components/CardVideoJuego.jsx";
import { CreateVideoJuego } from "./components/CreateVideoJuego.jsx";
>>>>>>> develop

export const router = createBrowserRouter(
    createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        
        <Route path= "/" element={<Home />} />
        <Route path="/single/:theId" element={ <Single />} />  {/* Dynamic route for single items */}
        <Route path="/demo" element={<Demo />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/card/:id" element={ <Card />} />
        <Route path="/form" element={<Form />} />
        <Route path="/user" element={<UserCRUD />} />
        <Route path="/user/:user_id" element={<SingleUser/>} />
        <Route path="/admin" element={<AdminCRUD />} />
        <Route path="/admin/:admin_id" element={<SingleAdmin/>} />
        <Route path="/team" element={<TeamCRUD />} />
        <Route path="/team/create" element={<CreateTeam/>} />
        <Route path="/team/:team_id" element={<SingleTeam/>} />
        <Route path="/team/edit/:team_id" element={<EditTeam/>} />
        <Route path="/editTournament/:id" element={ <EditTournament />} />
        <Route path="/user/tournament" element={<UserTournamentCRUD />} />
        <Route path="/user/tournament/create" element={<CreateUserTournament/>} />
        <Route path="/user/tournament/:id" element={<SingleUserTournament/>} />
        <Route path="/user/tournament/edit/:id" element={<EditUserTournament/>} />
        <Route path="/videojuego" element={<Videojuego />} />
        <Route path="/createVideoJuego" element={ <CreateVideoJuego />} />
        <Route path="/cardVideojuego/:id" element={ <CardVideoJuego />} />
        <Route path="/editVideojuego/:id" element={ <EditVideoJuego />} />
        <Route path="/user/team" element={<UserTeamCRUD />} />
        <Route path="/user/team/create" element={<CreateUserTeam/>} />
        <Route path="/user/team/:id" element={<SingleUserTeam/>} />
        <Route path="/user/team/edit/:id" element={<EditUserTeam/>} />
      </Route>
    )
);
