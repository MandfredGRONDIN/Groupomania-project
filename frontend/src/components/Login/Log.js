import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Log() {
   const [email, setEmail] = useState("Email");
   const [emailError, setEmailError] = useState("");
   const [password, setPassword] = useState("Password");
   const [passwordError, setPasswordError] = useState("");
   const [showInput, setShowInput] = useState(true);
   const navigate = useNavigate();

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

      console.log(result);
      if (result.errorEmail) {
         setPasswordError("");
         setEmailError("email incorrect");
      } else if (result.errorPassword) {
         setPasswordError("Mot de passe incorrect");
         setEmailError("");
      } else {
         localStorage.setItem("userId", result.userId);
         setPasswordError("");
         setEmailError("");
         navigate(`/home`);
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
                  onClick={(e) => {
                     if (e.target.value === "Email") {
                        e.target.value = "";
                     }
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
               />
            </div>
            {emailError && <div className="email error">{emailError}</div>}
            <label htmlFor="password"></label>
            <div className="form__input">
               <i className="fa-solid fa-lock icone"></i>
               <input
                  type={showInput ? "text" : "password"}
                  name="password"
                  id="password"
                  onClick={(e) => {
                     if (e.target.value === "Password") {
                        e.target.value = "";
                     }
                  }}
                  onChange={(e) =>
                     setPassword(e.target.value) || setShowInput(false)
                  }
                  value={password}
               />
            </div>
            {passwordError && (
               <div className="password error">{passwordError}</div>
            )}
            <input id="login__submit" type="submit" value="Login" />
         </form>
      </div>
   );
}
