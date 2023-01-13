import React, { useState, useEffect } from "react";
import CreateComment from "./CreateComment";
import Picture from "../Picture";
import ModifyComment from "./ModifyComment";
import UserPostInformation from "../UserPostInformation";

export default function CommentTest({ data }) {
   const [comments, setComments] = useState(data.comments);
   const [dataUser, setDataUser] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const [modifIsOpen, setModifIsOpen] = useState(false);
   const localStorageUserId = localStorage.getItem("userId");
   const userId = data.userId;
   const sortedComment = comments;

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

   const addComment = (newComment) => {
      const sortedComment = [...comments, newComment];
      setComments(sortedComment);
   };

   const updateData = (newData) => {
      console.log(newData);
      const updatedSortedComment = comments.map((comment) => {
         console.log(comment);
         if (comment._id === newData.commentId) {
            return newData;
         }
         return comment;
      });
      setComments(updatedSortedComment);
   };

   return (
      <div className="post__comment">
         <div className={isOpen ? "post__footer-active" : "post__footer"}>
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
         {isOpen
            ? sortedComment.map((comment, key) => (
                 <div key={key} className="comment">
                    <div className="comment__post">
                       <div className="comment__header">
                          <Picture
                             data={comment.commenterId || comment.userId}
                          />
                       </div>
                       <div className="comment__middle">
                          <div className="comment__middle-head">
                             <UserPostInformation
                                data={comment.commenterId || comment.userId}
                             />
                             <div>1h</div>
                          </div>

                          <div className="comment__middle-body">
                             {comment.text}
                          </div>
                       </div>
                       <div className="comment__like">
                          <i className="fa-regular fa-heart"></i>
                       </div>
                       <div onClick={() => setModifIsOpen(!modifIsOpen)}>
                          {localStorageUserId === comment.commenterId ? (
                             <ModifyComment
                                dataComment={comment}
                                canModify={true}
                                dataPost={data}
                                updateData={updateData}
                             />
                          ) : null}
                       </div>
                    </div>
                 </div>
              ))
            : null}
         {isOpen ? (
            <CreateComment dataComment={data} addComment={addComment} />
         ) : null}
      </div>
   );
}
