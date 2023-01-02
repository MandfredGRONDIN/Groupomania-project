import React from "react";
import { useState, useEffect } from "react";
import Picture from "../Picture";

export default function CreateComment({ dataComment }) {
   const [data, setData] = useState([]);
   const [text, setText] = useState("");
   const [commenterPseudo, setCommenterPseudo] = useState("");
   const commentId = dataComment._id;
   const userId = localStorage.getItem("userId");
   console.log(dataComment);
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
         const data = await (await response).json();
         setData(data);
         setCommenterPseudo(data.pseudo);
      }
      fetchData();
   }, [userId]);
   console.log(data);

   const handleComment = async (e) => {
      e.preventDefault();
      let item = { userId, commenterPseudo, text };
      console.log(item);
      let result = await fetch(
         `${process.env.REACT_APP_API_URL}api/posts/comment-post/${commentId}`,
         {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
            },
            body: JSON.stringify(item),
         }
      );
      console.log(result);

      result = await result.json();

      console.log(result);
   };

   return (
      <div>
         <div className="create__comment-picture">
            <Picture img={data.picture} />
            <div>
               <form action="" onSubmit={handleComment} id="post__comment-form">
                  <input
                     type="text"
                     name="text"
                     id="text"
                     onChange={(e) => setText(e.target.value)}
                     value={text}
                  />
                  <input id="comment__submit" type="submit" value="test" />
               </form>
            </div>
         </div>
      </div>
   );
}
