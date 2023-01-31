import React from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Picture from "../Picture";

export default function Header() {
   const userId = localStorage.getItem("userId");
   const navigate = useNavigate();

   const handleLogout = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      async function fetchData() {
         const result = await fetch(
            `${process.env.REACT_APP_API_URL}api/auth/logout`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         const results = await result.json();
         if (results.message === "Sign out") {
            navigate("/");
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
         }
      }
      fetchData();
   };

   return (
      <header id="header">
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
                  onClick={handleLogout}
               ></i>
            </div>
         </nav>
      </header>
   );
}
