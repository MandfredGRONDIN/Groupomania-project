import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Picture from "../Picture";
import Logout from "../Logout";

export default function Header() {
   const userId = localStorage.getItem("userId");
   const navigate = useNavigate();

   return (
      <div id="header">
         <div className="header__messenger">
            <Link to={`/messenger/${userId}`} id="header__messenger">
               <i className="fa-solid fa-message i__header"></i>
            </Link>
         </div>
         <div id="header__logo">
            <img className="header__logo" src={logo} alt="Groupomania" />
         </div>
         <nav id="header__profile">
            <Link to={`/home`} className="header__profile">
               <i className="fa-solid fa-house i__header"></i>
            </Link>
            <Link to={`/profile/${userId}`} className="header__profile">
               <Picture data={userId} />
            </Link>
            <div className="header__profile">
               <i
                  className="fa-solid fa-right-from-bracket i__header"
                  onClick={() => {
                     localStorage.removeItem("token");
                     localStorage.removeItem("userId");
                     navigate("/");
                  }}
               ></i>
            </div>
         </nav>
      </div>
   );
}
