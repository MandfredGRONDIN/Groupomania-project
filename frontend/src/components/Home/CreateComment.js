import React from "react";
import { useState, useEffect } from "react";
import Picture from "../Picture";

export default function CreateComment({ dataComment, addComment }) {
   console.log(dataComment);
   const [data, setData] = useState([]);
   const [text, setText] = useState("Ecrivez un commentaire");
   const [commenterPseudo, setCommenterPseudo] = useState("");
   const postId = dataComment._id;
   const commenterId = localStorage.getItem("userId");

   useEffect(() => {
      async function fetchData() {
         const response = fetch(
            `${process.env.REACT_APP_API_URL}api/auth/${commenterId}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         const data = await (await response).json();
         setData(data);
         setCommenterPseudo(data.pseudo);
      }
      fetchData();
   }, [commenterId]);

   const handleComment = async (e) => {
      e.preventDefault();
      let item = { userId: commenterId, commenterPseudo, text };
      let result = await fetch(
         `${process.env.REACT_APP_API_URL}api/posts/${postId}/comment-post/`,
         {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
            },
            body: JSON.stringify(item),
         }
      );

      result = await result.json();
      if (result.message === "Comment added") {
         setText("");
         addComment(item);
      }
   };

   return (
      <div>
         <div className="create__comment-picture">
            <div className="create__comment-header">
               <Picture img={data.picture} />
            </div>
            <div className="create__comment-body">
               <form action="" onSubmit={handleComment} id="post__comment-form">
                  <input
                     type="text"
                     name="text"
                     id="text"
                     onClick={(e) => {
                        if (e.target.value === "Ecrivez un commentaire") {
                           e.target.value = "";
                        }
                     }}
                     onChange={(e) => setText(e.target.value)}
                     value={text}
                  />
                  <input
                     id="comment__submit"
                     type="submit"
                     value="submit"
                     style={{ display: "none" }}
                  />
                  <i
                     className="fa-solid fa-paper-plane submit__plane"
                     onClick={handleComment}
                  ></i>
               </form>
            </div>
         </div>
      </div>
   );
}
