import React, { useEffect, useState } from "react";
import Picture from "../Picture";

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
   /*  console.log(dataUser);

   console.log(commentData); */
   return (
      <div className="comment__post">
         <div className="comment__header">
            <Picture img={dataUser.picture} />
         </div>
         <div className="comment__middle">
            <div className="comment__middle-head">
               <div>{dataUser.pseudo}</div>
               <div>1h</div>
            </div>
            <div className="comment__middle-body">{commentData.text}</div>
         </div>
         <div className="comment__like">
            <i className="fa-regular fa-heart"></i>
         </div>
      </div>
   );
}
