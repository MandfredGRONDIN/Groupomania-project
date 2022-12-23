import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
   const userId = localStorage.getItem("userId");

   return (
      <div id="header">
         <div className="header__messenger">
            <Link to={`/messenger/${userId}`} id="header__messenger">
               <i className="fa-solid fa-message"></i>
            </Link>
         </div>
         <div id="header__logo">
            <img className="header__logo" src={logo} alt="Groupomania" />
         </div>
         <nav id="header__profile">
            <Link to={`/home`} className="header__profile">
               <i className="fa-solid fa-house"></i>
            </Link>
            <Link to={`/profile/${userId}`} className="header__profile">
               <i className="fa-solid fa-user"></i>
            </Link>
            <div className="header__profile">
               <i className="fa-solid fa-right-from-bracket"></i>
            </div>
         </nav>
      </div>
   );
}
