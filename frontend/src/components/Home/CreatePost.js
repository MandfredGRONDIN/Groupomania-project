import React, { useEffect, useState } from "react";
import Picture from "../Picture";

export default function CreatePost({ addPost }) {
   console.log(addPost);
   const [dataUser, setDataUser] = useState([]);
   const [textPost, setTextPost] = useState(`Quoi de neuf?`);
   const userId = localStorage.getItem("userId");

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
   console.log(dataUser);

   const handlePost = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const postObject = {
         description: textPost,
         userId: userId,
      };
      let result = await fetch(`${process.env.REACT_APP_API_URL}api/posts/`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({ post: postObject }),
      });
      result = await result.json();
      console.log(result);
      if (result.message === "Post recorded") {
         setTextPost("");
         addPost(postObject);
      }
   };

   return (
      <div className="create__post">
         <div className="create__post-header">
            <Picture img={dataUser.picture} />
         </div>
         <div className="create__post-body">
            <form action="" onSubmit={handlePost} id="create__post-form">
               <input
                  type="text"
                  name="text"
                  id="post__form"
                  onClick={(e) => {
                     if (e.target.value === "Quoi de neuf?") {
                        e.target.value = "";
                     }
                  }}
                  onChange={(e) => setTextPost(e.target.value)}
                  value={textPost}
               />
               <input
                  id="post__submit"
                  type="submit"
                  value="submit"
                  style={{ display: "none" }}
               />
               <i
                  className="fa-solid fa-paper-plane submit__plane"
                  onClick={handlePost}
               ></i>
            </form>
         </div>
      </div>
   );
}
