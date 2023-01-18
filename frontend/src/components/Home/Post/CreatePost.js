import React, { useEffect, useState, useRef } from "react";
import Picture from "../../Picture";
import axios from "axios";

export default function CreatePost({ addPost, intervalId }) {
   const [dataUser, setDataUser] = useState([]);
   const [textPost, setTextPost] = useState(`Quoi de neuf?`);
   const [file, setFile] = useState();
   const [imagePreviewUrl, setImagePreviewUrl] = useState("");
   const inputRef = useRef(null);
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
   }, [userId]);

   useEffect(() => {
      inputRef.current.addEventListener("focus", () => {
         clearInterval(intervalId);
      });
   }, [intervalId]);

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
               usersLiked: [],
               likes: 0,
            };
            setTextPost("Quoi de neuf?");
            setFile("");
            setImagePreviewUrl("");
            addPost(postObject);
            window.location.reload(false);
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
            <Picture data={dataUser._id} />
         </div>
         <div className="create__post-body">
            <form action="" onSubmit={handlePost} id="create__post-form">
               <input
                  type="text"
                  name="text"
                  id="post__form"
                  ref={inputRef}
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
