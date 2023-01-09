import React, { useState } from "react";
import axios from "axios";

export default function ModifyPost({ data, canModify, updateData }) {
   const [isOpen, setIsOpen] = useState(false);
   const [textPost, setTextPost] = useState(`${data.description}`);
   const userId = localStorage.getItem("userId");
   const [file, setFile] = useState();
   const dataId = data._id;

   const handleChangePost = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.set("description", textPost);
      data.set("userId", userId);
      if (file) {
         data.set("image", file);
      }
      console.log(data);
      try {
         const result = await axios.put(
            `${process.env.REACT_APP_API_URL}api/posts/${dataId}`,
            data,
            {
               headers: {
                  "Content-Type": "multipart/form-data",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         if (result.data.message === "Post modified") {
            console.log(result.data);
            updateData(result.data);
            setIsOpen(!isOpen);
         }
      } catch (e) {
         console.error(e);
      }
   };

   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
   };

   return canModify ? (
      <div>
         <div onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
               <i class="fa-solid fa-xmark"></i>
            ) : (
               <i class="fa-solid fa-ellipsis-vertical"></i>
            )}
         </div>
         {isOpen ? (
            <div>
               <form action="">
                  <input
                     type="text"
                     name="text"
                     id="modify__post"
                     value={textPost}
                     onChange={(e) => setTextPost(e.target.value)}
                  ></input>
                  <input
                     type="file"
                     name="image"
                     onChange={handleFileChange}
                  ></input>
                  <input
                     type="submit"
                     value="submit"
                     onClick={handleChangePost}
                  ></input>
               </form>
            </div>
         ) : null}
      </div>
   ) : null;
}
