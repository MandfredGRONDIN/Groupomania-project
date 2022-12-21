import React from "react";
import logo from "../../assets/logo.png";
import { Link, useParams } from "react-router-dom";

export default function Header() {
   const params = useParams();
   return(
      <div id="header">
         <div className="header__messenger">
            <Link to="/messenger/zd" id="header__messenger">
               <i className="fa-solid fa-message"></i>
            </Link>
         </div>
         <div id="header__logo">
            <img className="header__logo" src={logo} alt="Groupomania" />
         </div>
         <div id="header__profile">
            <Link to={`/home/${params.id}`} className="header__profile">
               <i className="fa-solid fa-house"></i>
            </Link>
            <Link to={`/profile/${params.id}`}className="header__profile">
               <i className="fa-solid fa-user"></i>
            </Link>
            <div className="header__profile">
               <i className="fa-solid fa-right-from-bracket"></i>
            </div>
         </div>
      </div>
   )
}
