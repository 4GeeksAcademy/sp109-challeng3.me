import React from "react";
import {Navbar} from "../components/Navbar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

export const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideBar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  );
};