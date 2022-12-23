import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
   const [pseudo, setPseudo] = useState("Username");
   const [pseudoError, setPseudoError] = useState("");
   const [email, setEmail] = useState("Email");
   const [emailError, setEmailError] = useState("");
   const [password, setPassword] = useState("Password");
   const [passwordError, setPasswordError] = useState("");
   const [passwordCheck, setPasswordCheck] = useState("Confirm Password");
   const [passwordCheckError, setPasswordCheckError] = useState("");
   const [showInput, setShowInput] = useState(true);
   const [showInputCheck, setShowInputCheck] = useState(true);
   const navigate = useNavigate();

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

      if (result.errorEmail) {
         setEmailError(`${result.errorEmail}`);
      } else {
         setEmailError("");
      }

      if (result.errorPseudo) {
         setPseudoError(`${result.errorPseudo}`);
      } else {
         setPseudoError("");
      }

      if (result.errorPasswordCheck) {
         setPasswordError(`${result.errorPasswordCheck}`);
         setPasswordCheckError(`${result.errorPasswordCheck}`);
      } else {
         setPasswordError("");
         setPasswordCheckError("");
      }
      if (result.userCreated) {
         localStorage.setItem("userId", result.userId);
         navigate(`/home`);
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
                  onClick={(e) => {
                     if (e.target.value === "Username") {
                        e.target.value = "";
                     }
                  }}
                  onChange={(e) => setPseudo(e.target.value)}
                  value={pseudo}
               />
            </div>
            <div className="pseudo error">{pseudoError}</div>
            <label htmlFor="email"></label>
            <div className="form__input">
               <i className="fa-solid fa-envelope icone"></i>
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
            <div className="email error">{emailError}</div>
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
            <div className="password error">{passwordError}</div>
            <label htmlFor="passwordCheck"></label>
            <div className="form__input">
               <i className="fa-solid fa-lock icone"></i>
               <input
                  type={showInputCheck ? "text" : "password"}
                  name="passwordCheck"
                  id="password__check"
                  onClick={(e) => {
                     if (e.target.value === "Confirm Password") {
                        e.target.value = "";
                     }
                  }}
                  onChange={(e) =>
                     setPasswordCheck(e.target.value) ||
                     setShowInputCheck(false)
                  }
                  value={passwordCheck}
               />
            </div>
            <div className="password_check error">{passwordCheckError}</div>
            <input id="register__submit" type="submit" value="Register" />
         </form>
      </div>
   );
}
