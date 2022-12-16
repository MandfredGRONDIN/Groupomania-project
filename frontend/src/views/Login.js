import React from "react";
import logo from "../assets/logo.png";
import LoginRegister from "../components/Login/LoginRegister";

export default function Login() {
   return (
      <div className="login">
         <div className="login__header">
            <img src={logo} alt="Groupomania" />
         </div>
         <div className="login__body">
            <LoginRegister />
         </div>
      </div>
   );
}
