import React, { useState } from "react";
import axios from "axios";

export default function ModifyComment({
   dataComment,
   updateData,
   canModify,
   dataPost,
}) {
   console.log(dataPost);
   const [isOpen, setIsOpen] = useState(false);
   const [textComment, setTextComment] = useState(dataComment.text);
   const userId = localStorage.getItem("userId");
   const commentId = dataComment._id;
   const postId = dataPost._id;
   console.log(dataComment);

   const handleChangeComment = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.set("text", textComment);
      data.set("userId", userId);
      data.set("commentId", commentId);
      data.set("postId", postId);
      try {
         const result = await axios.patch(
            `${process.env.REACT_APP_API_URL}api/posts/edit-comment/${postId}`,
            data,
            {
               headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         console.log(result);
         if (result.data.message === "Comment modified") {
            updateData(result.data);
            setIsOpen(!isOpen);
         }
      } catch (e) {
         console.error(e);
      }
   };

   return canModify ? (
      <div className={isOpen ? "modify__comment-active" : "modify__comment"}>
         {isOpen ? (
            <div className="modify__comment-form">
               <form action="">
                  <input
                     type="text"
                     name="text"
                     id="modify__comment"
                     value={textComment}
                     onChange={(e) => setTextComment(e.target.value)}
                  ></input>
                  <input
                     type="submit"
                     value="submit"
                     onClick={handleChangeComment}
                     style={{ display: "none" }}
                  />
                  <i
                     className="fa-solid fa-paper-plane submit__plane"
                     onClick={handleChangeComment}
                  ></i>
               </form>
            </div>
         ) : null}
         <div onClick={() => setIsOpen(!isOpen)} className="modify__i">
            {isOpen ? (
               <i className="fa-solid fa-xmark"></i>
            ) : (
               <i class="fa-solid fa-pen-to-square"></i>
            )}
         </div>
      </div>
   ) : null;
}
