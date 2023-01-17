import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import ModifyPost from "./ModifyPost";

export default function Post({ data }) {
   const [dataUser, setDataUser] = useState([]);
   const [dataPost, setDataPost] = useState(data);
   const [isOpen, setIsOpen] = useState(false);
   const [modifIsOpen, setModifIsOpen] = useState(false);
   const [comments, setComments] = useState(data.comments);
   const userPostId = data.userId || dataPost.userId;
   const userId = localStorage.getItem("userId");

   useEffect(() => {
      async function fetchData() {
         const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/auth/log/${userId}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         const dataUser = await response.json();
         setDataUser(dataUser);
      }
      fetchData();
   }, [userId, data]);

   const addComment = (newComment) => {
      setComments([...comments, newComment]);
   };

   const updateData = (newData) => {
      console.log(newData);
      setDataPost(newData);
   };

   return (
      <div className="post">
         <div onClick={() => setModifIsOpen(!modifIsOpen)}>
            {userId === userPostId ? (
               <ModifyPost
                  data={dataPost}
                  canModify={true}
                  updateData={updateData}
               />
            ) : null}
         </div>
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
         <div className="post__description">{dataPost.description}</div>
         {data.imageUrl || dataPost.postImg ? (
            <div className="post__img">
               <img src={dataPost.imageUrl || dataPost.postImg} alt="Post" />
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
                       <Comment commentData={comment} />
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
