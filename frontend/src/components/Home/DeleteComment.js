import React from "react";

export default function DeleteComment({ commentId, postId, updateDelete }) {
   const userId = localStorage.getItem("userId");
   const token = localStorage.getItem("token");

   const handleDeleteComment = async (e) => {
      e.preventDefault();

      async function fetchData() {
         const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/posts/delete-comment-post/${postId}`,
            {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify({
                  commentId: commentId,
                  commenterId: userId,
               }),
            }
         );
         await response.json();
         updateDelete(commentId);
      }
      fetchData();
   };

   return (
      <div onClick={handleDeleteComment} className="delete__comment">
         <i className="fa-solid fa-trash"></i>
      </div>
   );
}
