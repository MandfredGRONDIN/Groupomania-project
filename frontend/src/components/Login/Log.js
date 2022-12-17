import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Log() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
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
      <div>
         <form action="" onSubmit={handleLogin} id="sign__up-form">
            <label htmlFor="email">Email</label>
            <input
               type="text"
               name="email"
               id="email"
               onChange={(e) => setEmail(e.target.value)}
               value={email}
            />
            <div className="email error"></div>
            <label htmlFor="password">Password</label>
            <input
               type="text"
               name="password"
               id="password"
               onChange={(e) => setPassword(e.target.value)}
               value={password}
            />
            <div className="password error"></div>
            <input type="submit" value="Se connecter" />
         </form>
      </div>
   );
}
