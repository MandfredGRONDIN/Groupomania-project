import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/profile.css";

export default function Profile() {
   const [data, setData] = useState([]);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const params = useParams();

   let hideEmail = (email) => {
      let index = email.indexOf("@");
      index = index < 0 ? 0 : index;
      return "*".repeat(index) + email.substring(index);
   };

   useEffect(() => {
      async function fetchData() {
         const response = fetch(
            `${process.env.REACT_APP_API_URL}api/auth/${params.id}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         const data = await (await response).json();
         setData(data);
         setName(data.pseudo);
         setEmail(data.email);
      }
      fetchData();
   }, [params]);

   return (
      <div id="profile">
         <div className="user__img">
            {data.picture ? (
               <img
                  src={`${process.env.REACT_APP_API_URL}images/${data.picture}`}
                  alt="Profil"
                  className="user__img-img"
               />
            ) : (
               <i className="fa-solid fa-user "></i>
            )}
         </div>
         <div id="profile__name">
            <label htmlFor="name"></label>
            <input type="text" name="name" id="name" value={name} />
         </div>
         <div id="profile__email">
            <label htmlFor="email"></label>
            <input
               type="email"
               name="email"
               className="email profile"
               value={hideEmail(email)}
            />
         </div>
      </div>
   );
}
