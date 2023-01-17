import React, { useEffect, useState } from "react";
import CreatePost from "../components/Home/CreatePost";
import ModifyPost from "../components/Home/ModifyPost";
import "../styles/home.css";
import Picture from "../components/Picture";
import UserPostInformation from "../components/UserPostInformation";
import Comment from "../components/Home/Comment";
import DeletePost from "../components/Home/DeletePost";
import DateCreate from "../components/DateCreate";

export default function Home() {
   const [data, setData] = useState([]);
   const [modifIsOpen, setModifIsOpen] = useState(false);
   const [intervalId, setIntervalId] = useState(null);
   const userId = localStorage.getItem("userId");

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
      const interval = setInterval(() => {
         fetchData();
      }, 2000);
      setIntervalId(interval);
      return () => clearInterval(interval);
   }, []);
   const refreshData = async (e) => {
      const interval = setInterval(() => {
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
      }, 2000);
      setIntervalId(interval);
      return () => clearInterval(interval);
   };

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
      const updatedSortedPosts = data.map((post) => {
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
                           <DateCreate dateAt={data.createdAt} />
                        </div>
                     </div>
                     <div className="post__description">{data.description}</div>
                     {data.imageUrl ? (
                        <div className="post__img">
                           <img src={data.imageUrl} alt="Post" />
                        </div>
                     ) : null}
                     <div className="footer__post-like-comment">
                        <div className="footer__post-like">
                           {data.likes === 0 || data.likes === 1
                              ? `${data.likes} like`
                              : `${data.likes} likes`}
                        </div>
                        <div className="footer__post-comment">
                           {data.comments
                              ? data.comments.length === 0 ||
                                data.comments.length === 1
                                 ? `${data.comments.length} comment`
                                 : `${data.comments.length} comments`
                              : "0 comments"}
                        </div>
                     </div>
                     <div>
                        <Comment
                           data={data}
                           intervalId={intervalId}
                           refreshData={refreshData}
                        />
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}
