import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

export default function Post({ data }) {
   const [dataUser, setDataUser] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const userId = data.userId;
   const comment = data.comments;

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
   }, [userId, data]);
   console.log(dataUser);

   return (
      <div className="post">
         <div className="post__header">
            {dataUser.picture ? (
               <img
                  src={`${process.env.REACT_APP_API_URL}images/${dataUser.picture}`}
                  alt="Profil"
                  className="post__picture"
               ></img>
            ) : (
               <i className="fa-solid fa-user "></i>
            )}
            <div>
               <div className="post__pseudo">{dataUser.pseudo}</div>
               <div>2h</div>
            </div>
         </div>
         <div className="post__description">{data.description}</div>
         {data.imageUrl ? (
            <div className="post__img">
               <img src={data.imageUrl} alt="Post" />
            </div>
         ) : null}
         <div className="post__footer">
            <div className="post__like">
               <i className="fa-regular fa-heart"></i>
            </div>
            <div
               className="post__comment-icone"
               onClick={() => setIsOpen(!isOpen)}
            >
               <i className="fa-regular fa-comment"></i>
            </div>
         </div>
         <div className={isOpen ? "post__comment" : null}>
            {isOpen
               ? comment.map((comment, key) => (
                    <div key={key} className="comment">
                       <Comment commentData={comment} />
                    </div>
                 ))
               : null}
            {isOpen ? <CreateComment dataComment={data} /> : null}
         </div>
      </div>
   );
}
