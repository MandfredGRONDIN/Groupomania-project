import React, { useState, useEffect } from "react";
import CreateComment from "./CreateComment";
import Picture from "../../Picture";
import ModifyComment from "./ModifyComment";
import UserPostInformation from "../../UserPostInformation";
import DeleteComment from "./DeleteComment";
import DateCreate from "../../DateCreate";
import Heart from "../../Heart/Heart";

export default function CommentTest({ data, intervalId, refreshData }) {
   const [comments, setComments] = useState(data.comments);
   const [dataUser, setDataUser] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const [modifIsOpen, setModifIsOpen] = useState(false);
   const [liked, setLiked] = useState(false);
   const dataLikes = data.usersLiked;
   const localStorageUserId = localStorage.getItem("userId");
   const userId = data.userId;
   const sortedComment = comments;

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
      if (dataLikes.includes(localStorageUserId)) {
         setLiked(true);
      } else {
         setLiked(false);
      }
   }, [userId, dataLikes, localStorageUserId]);

   const addComment = (newComment) => {
      const sortedComment = [...comments, newComment];
      setComments(sortedComment);
   };

   const handleLike = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const dataId = data._id;
      setLiked(!liked);
      async function fetchData() {
         const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/posts/${dataId}/like`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify({ userId: localStorageUserId }),
            }
         );
         await response.json();
      }
      fetchData();
   };

   const updateData = (newData) => {
      const updatedSortedComment = comments.map((comment) => {
         if (comment._id === newData.commentId) {
            return newData;
         }
         return comment;
      });
      setComments(updatedSortedComment);
   };

   const updateDelete = (delComment) => {
      const updatedComments = comments.filter(
         (comment) => comment._id !== delComment
      );
      setComments(updatedComments);
   };

   return (
      <div className="post__comment">
         <div className={isOpen ? "post__footer-active" : "post__footer"}>
            <div className="post__like" onClick={handleLike}>
               <Heart
                  dataPost={data.usersLiked}
                  handleLike={handleLike}
                  liked={liked}
               />
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
                             <DateCreate dateAt={comment.timestamp} />
                          </div>

                          <div className="comment__middle-body">
                             {comment.text}
                          </div>
                       </div>
                       <div
                          onClick={() => setModifIsOpen(!modifIsOpen)}
                          className={
                             modifIsOpen ? "modif__open" : "modif__close"
                          }
                       ></div>
                       {localStorageUserId === comment.commenterId ? (
                          <ModifyComment
                             dataComment={comment}
                             canModify={true}
                             dataPost={data}
                             updateData={updateData}
                          />
                       ) : null}
                    </div>
                    {localStorageUserId === comment.commenterId ? (
                       <DeleteComment
                          commentId={comment._id}
                          postId={data._id}
                          updateDelete={updateDelete}
                       />
                    ) : null}
                 </div>
              ))
            : null}
         {isOpen ? (
            <CreateComment
               dataComment={data}
               addComment={addComment}
               intervalId={intervalId}
               refreshData={refreshData}
            />
         ) : null}
      </div>
   );
}
