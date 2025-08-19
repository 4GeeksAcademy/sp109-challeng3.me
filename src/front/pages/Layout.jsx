import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import SideBar from "../components/SideBar.jsx"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Navbar />
                <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Outlet />
                </main>
                <Footer/>
            </div>
        </div>
        </ScrollToTop>
    )
}