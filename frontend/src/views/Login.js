import React, { useState } from "react";
import logo from "../assets/logo.png";
import Log from "../components/Login/Log";
import Register from "../components/Login/Register";
import "../styles/index.css";

export default function Login() {
   const [isRegister, setIsRegister] = useState(true);

   return (
      <div className="login">
         <div className="login__header">
            <img className="login__header-logo" src={logo} alt="Groupomania" />
         </div>
         <div className="login__body">
            {isRegister ? (
               <div className="login__body-log">
                  <div className="login__body-button">
                     <button className="login__button actived" type="button">
                        Login
                     </button>
                     <button
                        className="login__button"
                        type="button"
                        onClick={() => setIsRegister(false)}
                     >
                        Register
                     </button>
                  </div>
                  <Log />
               </div>
            ) : (
               <div className="login__body-register">
                  <div className="login__body-button">
                     <button
                        className="login__button"
                        type="button"
                        onClick={() => setIsRegister(true)}
                     >
                        Login
                     </button>
                     <button className="login__button actived" type="button">
                        Register
                     </button>
                  </div>
                  <Register />
               </div>
            )}
         </div>
      </div>
   );
}
