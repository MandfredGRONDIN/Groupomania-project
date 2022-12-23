import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";

export default function Layout({ children }) {
   const location = useLocation();
   const isHomePage = location.pathname === "/";

   return (
      <>
         {!isHomePage && <Header />}
         {children}
      </>
   );
}
