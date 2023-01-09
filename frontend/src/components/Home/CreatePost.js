import React, { useEffect, useState } from "react";
import Picture from "../Picture";
import axios from "axios";

export default function CreatePost({ addPost }) {
   const [dataUser, setDataUser] = useState([]);
   const [textPost, setTextPost] = useState(`Quoi de neuf?`);
   const userId = localStorage.getItem("userId");
   const [file, setFile] = useState();
   const [imagePreviewUrl, setImagePreviewUrl] = useState("");

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

   const handlePost = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("description", textPost);
      data.append("userId", userId);
      if (file) {
         data.append("image", file);
      }
      try {
         const result = await axios.post(
            `${process.env.REACT_APP_API_URL}api/posts/`,
            data,
            {
               headers: {
                  "Content-Type": "multipart/form-data",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         if (result.data.message === "Post recorded") {
            const postObject = {
               description: textPost,
               userId: userId,
               imageUrl: result.data.postImg,
            };
            setTextPost("Quoi de neuf?");
            setFile("");
            setImagePreviewUrl("");
            addPost(postObject);
         }
      } catch (error) {
         console.error(error);
      }
   };

   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImagePreviewUrl(URL.createObjectURL(selectedFile));
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
               <div className="button__img">
                  <label htmlFor="fileInput">
                     <i className="fa-solid fa-image"></i>
                  </label>
                  <input
                     type="file"
                     name="image"
                     onChange={handleFileChange}
                     style={{ display: "none" }}
                     id="fileInput"
                  />
               </div>
               <i
                  className="fa-solid fa-paper-plane submit__plane"
                  onClick={handlePost}
               ></i>
            </form>
            <div className="post__preview-img">
               {imagePreviewUrl && (
                  <img
                     src={imagePreviewUrl}
                     alt="Preview"
                     className="preview__img"
                  />
               )}
            </div>
         </div>
      </div>
   );
}
