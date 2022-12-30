import React, { useEffect, useState } from "react";

export default function Comment({ commentData }) {
   const [dataUser, setDataUser] = useState([]);
   const userId = commentData.commenterId;

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

   console.log(commentData);
   return (
      <div className="comment__post">
         <div className="comment__header">
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
         <div className="comment__middle">
            <div>
               <div>{dataUser.pseudo}</div>
               <div>1h</div>
            </div>
            <div>{commentData.text}</div>
         </div>
         <div className="comment__like">
            <i className="fa-regular fa-heart"></i>
         </div>
      </div>
   );
}
