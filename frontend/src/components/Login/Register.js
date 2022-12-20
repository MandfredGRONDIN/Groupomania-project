import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
   const [pseudo, setPseudo] = useState("Username");
   const [email, setEmail] = useState("Email");
   const [password, setPassword] = useState("Password");
   const [passwordCheck, setPasswordCheck] = useState("Confirm Password");
   const [showInput, setShowInput] = useState(true);
   const [showInputCheck, setShowInputCheck] = useState(true);
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

      if (errorPseudo_valid || passwordCheck_valid || errorEmail_valid) {
         return null;
      }

      if (result.userCreated) {
         navigate("/home");
      }
   };

   return (
      <div className="login__body-form">
         <form action="" onSubmit={handleLogin} id="register-form">
            <label htmlFor="pseudo"></label>
            <div className="form__input">
               <i className="fa-solid fa-user icone"></i>
               <input
                  type="text"
                  name="pseudo"
                  id="pseudo"
                  onClick={(e) => {if(e.target.value === "Username"){e.target.value = ""}}}
                  onChange={(e) => setPseudo(e.target.value)}
                  value={pseudo}
               />
            </div>
            <div className="pseudo error"></div>
            <label htmlFor="email"></label>
            <div className="form__input">
               <i className="fa-solid fa-envelope icone"></i>
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
            <label htmlFor="passwordCheck"></label>
            <div className="form__input">
               <i className="fa-solid fa-lock icone"></i>
               <input
                  type={showInputCheck ? "text" : "password"}
                  name="passwordCheck"
                  id="password__check"
                  onClick={(e) => {if(e.target.value === "Confirm Password"){e.target.value = ""}}}
                  onChange={(e) =>
                     setPasswordCheck(e.target.value) || setShowInputCheck(false)
                  }
                  value={passwordCheck}
               />
            </div>
            <div className="password_check error"></div>
            <input id="register__submit" type="submit" value="Register" />
         </form>
      </div>
   );
}
