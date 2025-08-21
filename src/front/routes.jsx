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
import AddTournament from "./pages/AddTournament.jsx";
import SingleUserTournament from "./pages/SingleUserTournament.jsx";
import EditUserTournament from "./pages/EditUserTournament.jsx";
import { Videojuego } from "./components/VideoJuego.jsx";
import { EditVideoJuego } from "./components/EditVideoJuego.jsx";
import { CardVideoJuego } from "./components/CardVideoJuego.jsx";
import { CreateVideoJuego } from "./components/CreateVideoJuego.jsx";
import CreateUserTeam from "./pages/CreateUserTeam.jsx";
import SingleUserTeam from "./pages/SingleUserTeam.jsx";
import EditUserTeam from "./pages/EditUserTeam.jsx";
import UserTeamCRUD from "./pages/UserTeamCRUD.jsx";
import PrivateAdmin from "./pages/PrivateAdmin.jsx";
import LoginAdmin from "./pages/LoginAdmin.jsx";
import { UserVideoJuego } from "./components/UserVideoJuego.jsx";
import { CardUserVideoJuego } from "./components/CardUserVideoJuego.jsx";
import { EditUserVideoJuego } from "./components/EditUserVideoJuego.jsx";
import { CreateUserVideoJuego } from "./components/CreateUserVideoJuego.jsx";
import TeamTournamentCRUD from "./pages/TeamTournamentCRUD.jsx";
import CreateTeamTournament from "./pages/CreateTeamTournament.jsx";
import SingleTeamTournament from "./pages/SingleTeamTournament.jsx";
import EditTeamTournament from "./pages/EditTeamTournament.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import PrivateUser from "./pages/PrivateUser.jsx";
import ApiIntegration from "./pages/ApiIntegration.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import SearchTeam from "./pages/SearchTeam.jsx";
import TeamAplication from "./pages/TeamAplication.jsx";
import { Contactanos } from "./components/Contactanos.jsx";
import { Nosotros } from "./components/Nosotros.jsx";
import SideBar from "./components/SideBar.jsx";
import { DashboardLayout } from "./pages/DashboardLayout.jsx";
import TeamSection from "./pages/TeamSection.jsx";
import EditUser from "./pages/EditUser.jsx";
import SingUp from "./pages/SingUp.jsx";


export const router = createBrowserRouter(
    createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

      // Root Route: All navigation will start from here.
      <>
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        
        <Route path= "/" element={<Home />} />
        <Route path="/single/:theId" element={ <Single />} />  {/* Dynamic route for single items */}
        <Route path="/demo" element={<Demo />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/contact" element={<Contactanos />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/singup" element={<SingUp />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
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
        <Route path="/user/tournament/create" element={<AddTournament/>} />
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
        <Route path="/admin/dashboard" element={<PrivateAdmin/>} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/user/videojuego" element={<UserVideoJuego />} />
        <Route path="/user/videojuego/:id" element={<CardUserVideoJuego />} />
        <Route path="/user/videojuego/edit/:id" element={<EditUserVideoJuego />} />
        <Route path="/select/game" element={<CreateUserVideoJuego />} />
        <Route path="/team/tournament" element={<TeamTournamentCRUD />} />
        <Route path="/team/tournament/create" element={<CreateTeamTournament/>} />
        <Route path="/team/tournament/:id" element={<SingleTeamTournament/>} />
        <Route path="/team/tournament/edit/:id" element={<EditTeamTournament/>} />
        <Route path="/api-integration" element={<ApiIntegration />} />
        <Route path="/search/team" element={<SearchTeam />} />
        <Route path="/team/aplication/:team_id" element={<TeamAplication />} />
        <Route path="/search/tournament" element={<AddTournament />} />
        <Route path="/team/section" element={<TeamSection />} />
        <Route path="/edit/user/:userId" element={<EditUser/>} />
      </Route>
    </>)
);
