import React, { useEffect, useState } from "react";
import CreatePost from "../components/Home/CreatePost";
import ModifyPost from "../components/Home/ModifyPost";
import "../styles/home.css";
import Picture from "../components/Picture";
import UserPostInformation from "../components/UserPostInformation";
import Comment from "../components/Home/Comment";
import DeletePost from "../components/Home/DeletePost";

export default function Home() {
   const [data, setData] = useState([]);
   const userId = localStorage.getItem("userId");
   const [modifIsOpen, setModifIsOpen] = useState(false);

   useEffect(() => {
      async function fetchData() {
         const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/posts/`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         const data = await response.json();
         setData(data);
      }
      fetchData();
   }, []);

   const sortedPosts = data.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
   });

   const addPost = (newPost) => {
      const sortedPosts = [newPost, ...data].sort((a, b) => {
         const dateA = new Date(a.createdAt);
         const dateB = new Date(b.createdAt);
         return dateB - dateA;
      });
      setData(sortedPosts);
   };

   const updateData = (newData) => {
      console.log(newData);
      const updatedSortedPosts = data.map((post) => {
         console.log(post);
         if (post._id === newData.id) {
            return newData;
         }
         return post;
      });
      setData(updatedSortedPosts);
   };

   const updateDelete = async () => {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}api/posts/`
      );
      const data = await response.json();
      setData(data);
   };

   return (
      <div id="home">
         <CreatePost addPost={addPost} />
         {sortedPosts.map((data, key) => (
            <div key={key} className="home__posts">
               {userId === data.userId ? (
                  <DeletePost postId={data._id} updateDelete={updateDelete} />
               ) : null}
               <div className="home__post">
                  <div className="post">
                     <div onClick={() => setModifIsOpen(!modifIsOpen)}>
                        {userId === data.userId ? (
                           <ModifyPost
                              data={data}
                              canModify={true}
                              updateData={updateData}
                           />
                        ) : null}
                     </div>
                     <div className="post__header">
                        <Picture data={data.userId} />
                        <div>
                           <UserPostInformation data={data.userId} />
                           <div>2h</div>
                        </div>
                     </div>
                     <div className="post__description">{data.description}</div>
                     {data.imageUrl ? (
                        <div className="post__img">
                           <img src={data.imageUrl} alt="Post" />
                        </div>
                     ) : null}
                     <div>
                        <Comment data={data} />
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}
