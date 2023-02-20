import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";

export default function Layout({ children }) {
   const location = useLocation();
   const isHomePage = location.pathname === "/";

   //Rajouter un header à toute les pages sauf à la page Login/Register
   return (
      <>
         {!isHomePage && <Header />}
         {children}
      </>
   );
}
