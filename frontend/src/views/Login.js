import React, { useState } from "react";
import logo from "../assets/logo.png";
import Log from "../components/Login/Log";
import Register from "../components/Login/Register";

export default function Login() {
   const [isRegister, setIsRegister] = useState(true);

   return (
      <div className="login">
         <div className="login__header">
            <img src={logo} alt="Groupomania" />
         </div>
         <div className="login__body">
            {isRegister ? (
               <div>
                  <button
                     className="login__button"
                     type="button"
                     onClick={() => setIsRegister(false)}
                  >
                     Login
                  </button>
                  <Log />
               </div>
            ) : (
               <div>
                  <button
                     className="login__button"
                     type="button"
                     onClick={() => setIsRegister(true)}
                  >
                     Register
                  </button>
                  <Register />
               </div>
            )}
         </div>
      </div>
   );
}
