import React from "react";

export default function DeletePost({ postId, updateDelete }) {
   const handleDeletePost = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      async function fetchData() {
         const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
            {
               method: "DELETE",
               headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         await response.json();
         updateDelete();
      }
      fetchData();
   };

   return (
      <div onClick={handleDeletePost} className="delete__post">
         <i className="fa-solid fa-trash"></i>
      </div>
   );
}
