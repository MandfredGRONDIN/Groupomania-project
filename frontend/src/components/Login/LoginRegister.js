import React, { useState, useEffect } from "react";

export default function LoginRegister() {
   const [data, setData] = useState([]);
   const [isRegister, setIsRegister] = useState(true);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   /*   useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}api/auth/login`)
      .then()
      .catch()
   }) */

   const handleLogin = (e) => {
      e.preventDefault();
   };

   return isRegister ? (
      <div>
         <button
            className="login__button"
            type="button"
            onClick={() => setIsRegister(false)}
         ></button>
         <form action="" onSubmit={handleLogin} id="sign__up-form">
            <label htmlFor="email">Email</label>
            <input
               type="text"
               name="email"
               id="email"
               onChange={(e) => setEmail(e.target.value)}
               value={email}
            />
            <label htmlFor="password">Password</label>
            <input
               type="text"
               name="password"
               id="password"
               onChange={(e) => setPassword(e.target.value)}
               value={password}
            />
            <input type="submit" value="Se connecter" />
         </form>
      </div>
   ) : (
      <div>
         <button
            className="register__button"
            type="button"
            onClick={() => setIsRegister(true)}
         >
            <span>Register</span>
         </button>
      </div>
   );
}
