import React, { useEffect, useState } from "react";

export default function CreatePost() {
   const [dataUser, setDataUser] = useState([]);
   const userId = localStorage.getItem("userId");

   useEffect(() => {
      async function fetchData() {
         const response = fetch(
            `${process.env.REACT_APP_API_URL}api/auth/${userId}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         const dataUser = await (await response).json();
         setDataUser(dataUser);
      }
      fetchData();
   }, [userId]);
   console.log(dataUser);

   return (
      <div className="create__post">
         <div className="create__post-header">
            {dataUser.picture ? (
               <img
                  src={`${process.env.REACT_APP_API_URL}images/${dataUser.picture}`}
                  alt="Profil"
                  className="post__picture"
               ></img>
            ) : (
               <i className="fa-solid fa-user "></i>
            )}
         </div>
      </div>
   );
}
