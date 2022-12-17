import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
   const [pseudo, setPseudo] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [passwordCheck, setPasswordCheck] = useState("");
   const navigate = useNavigate();
   const emailError = document.querySelector(".email.error");
   const passwordError = document.querySelector(".password.error");
   const passwordCheckError = document.querySelector(".password_check.error");
   const pseudoError = document.querySelector(".pseudo.error");

   const handleLogin = async (e) => {
      e.preventDefault();
      let item = { pseudo, email, password, passwordCheck };
      console.log(JSON.stringify(item));
      let result = await fetch(
         `${process.env.REACT_APP_API_URL}api/auth/signup`,
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

      let passwordChecked = () => {
         if (result.errorPasswordCheck) {
            passwordError.innerHTML = result.errorPasswordCheck;
            passwordCheckError.innerHTML = result.errorPasswordCheck;
         } else {
            passwordError.innerHTML = "";
            passwordCheckError.innerHTML = "";
         }
      };
      let passwordCheck_valid = passwordChecked();

      let errorEmail = () => {
         if (result.errorEmail) {
            emailError.innerHTML = result.errorEmail;
         } else {
            emailError.innerHTML = "";
         }
      };
      let errorEmail_valid = errorEmail();

      let errorPseudo = () => {
         if (result.errorPseudo) {
            pseudoError.innerHTML = result.errorPseudo;
         } else {
            pseudoError.innerHTML = "";
         }
      };
      let errorPseudo_valid = errorPseudo();

      if (errorPseudo_valid || passwordCheck_valid || errorEmail_valid) {
         return null;
      }

      if (result.userCreated) {
         navigate("/home");
      }
   };

   return (
      <div>
         <form action="" onSubmit={handleLogin} id="register-form">
            <label htmlFor="pseudo">Pseudo</label>
            <input
               type="text"
               name="pseudo"
               id="pseudo"
               onChange={(e) => setPseudo(e.target.value)}
               value={pseudo}
            />
            <div className="pseudo error"></div>
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
            <label htmlFor="passwordCheck">Confirm Password</label>
            <input
               type="text"
               name="passwordCheck"
               id="password__check"
               onChange={(e) => setPasswordCheck(e.target.value)}
               value={passwordCheck}
            />
            <div className="password_check error"></div>
            <input type="submit" value="Se connecter" />
         </form>
      </div>
   );
}
