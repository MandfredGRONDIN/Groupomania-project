import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Log() {
   const [email, setEmail] = useState("Email");
   const [password, setPassword] = useState("Password");
   const [showInput, setShowInput] = useState(true);
   const navigate = useNavigate();
   const emailError = document.querySelector(".email.error");
   const passwordError = document.querySelector(".password.error");

   const handleLogin = async (e) => {
      e.preventDefault();
      let item = { email, password };
      let result = await fetch(
         `${process.env.REACT_APP_API_URL}api/auth/login`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
            },
            body: JSON.stringify(item),
         }
      );
      result = await result.json();
      if (result.errorEmail) {
         passwordError.innerHTML = "";
         emailError.innerHTML = "email incorrect";
      } else if (result.errorPassword) {
         emailError.innerHTML = "";
         passwordError.innerHTML = "Mot de passe incorrect";
      } else {
         emailError.innerHTML = "";
         passwordError.innerHTML = "";
         navigate("/home");
      }
   };

   return (
      <div className="login__body-form">
         <form action="" onSubmit={handleLogin} id="sign__up-form">
            <label htmlFor="email"></label>
            <div className="">
               <i className="fa-solid fa-user"></i>
               <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
               />
            </div>
            <div className="email error"></div>
            <label htmlFor="password"></label>
            <div>
               <i className="fa-solid fa-lock"></i>
               <input
                  type={showInput ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={(e) =>
                     setPassword(e.target.value) || setShowInput(false)
                  }
                  value={password}
               />
            </div>
            <div className="password error"></div>
            <input id="login__submit" type="submit" value="Login" />
         </form>
      </div>
   );
}
