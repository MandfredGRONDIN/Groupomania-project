import React, { useState } from "react";
import axios from "axios";

export default function ModifyPost({ data, canModify, updateData }) {
   const [isOpen, setIsOpen] = useState(false);
   const [textPost, setTextPost] = useState(`${data.description}`);
   const userId = localStorage.getItem("userId");
   const [file, setFile] = useState();
   const dataId = data._id;
   const dataImage = data.imageUrl;

   const handleChangePost = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.set("description", textPost);
      data.set("userId", userId);

      if (file) {
         data.set("image", file);
      } else if (dataImage !== "") {
         data.set("image", dataImage);
      }

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
      <div className={isOpen ? "modify__post-active" : "modify__post"}>
         {isOpen ? (
            <div className="modify__post-form">
               <form action="">
                  <input
                     type="text"
                     name="text"
                     id="modify__post"
                     value={textPost}
                     onChange={(e) => setTextPost(e.target.value)}
                  ></input>
                  <div className="button__img">
                     <label htmlFor="fileImgInput">
                        <i className="fa-solid fa-image"></i>
                     </label>
                     <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        id="fileImgInput"
                     ></input>
                  </div>
                  {/* <input
                     type="hidden"
                     name="image"
                     value={file ? file : dataImage}
                  /> */}
                  <input
                     type="submit"
                     value="submit"
                     onClick={handleChangePost}
                     style={{ display: "none" }}
                  />
                  <i
                     className="fa-solid fa-paper-plane submit__plane"
                     onClick={handleChangePost}
                  ></i>
               </form>
            </div>
         ) : null}
         <div onClick={() => setIsOpen(!isOpen)} className="modify__i">
            {isOpen ? (
               <i className="fa-solid fa-xmark"></i>
            ) : (
               <i className="fa-solid fa-ellipsis-vertical"></i>
            )}
         </div>
      </div>
   ) : null;
}
