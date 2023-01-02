import React, { useEffect, useState } from "react";
import Picture from "../Picture";
import CreateComment from "./CreateComment";

export default function Post({ data }) {
   const [dataUser, setDataUser] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const [comments, setComments] = useState(data.comments);
   const userId = data.userId;

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

   const addComment = (newComment) => {
      console.log(newComment);
      setComments([...comments, newComment]);
   };

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
               ? comments.map((comment, key) => (
                    <div key={key} className="comment">
                       {/* <Comment commentData={comment} /> */}

                       <div className="comment__post">
                          <div className="comment__header">
                             <Picture img={dataUser.picture} />
                          </div>
                          <div className="comment__middle">
                             <div className="comment__middle-head">
                                <div>{comment.commenterPseudo}</div>
                                <div>1h</div>
                             </div>
                             <div className="comment__middle-body">
                                {comment.text}
                             </div>
                          </div>
                          <div className="comment__like">
                             <i className="fa-regular fa-heart"></i>
                          </div>
                       </div>
                    </div>
                 ))
               : null}
            {isOpen ? (
               <CreateComment dataComment={data} addComment={addComment} />
            ) : null}
         </div>
      </div>
   );
}
