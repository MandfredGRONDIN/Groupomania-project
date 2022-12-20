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
            <div className="form__input">
               <i className="fa-solid fa-user icone"></i>
               <input
                  type="text"
                  name="email"
                  id="email"
                  onClick={(e) => {if(e.target.value === "Email"){e.target.value = ""}}}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
               />
            </div>
            <div className="email error"></div>
            <label htmlFor="password"></label>
            <div className="form__input">
               <i className="fa-solid fa-lock icone"></i>
               <input
                  type={showInput ? "text" : "password"}
                  name="password"
                  id="password"
                  onClick={(e) => {if(e.target.value === "Password"){e.target.value = ""}}}
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
