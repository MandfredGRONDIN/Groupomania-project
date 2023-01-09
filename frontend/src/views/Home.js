import React, { useEffect, useState } from "react";
import CreatePost from "../components/Home/CreatePost";
import ModifyPost from "../components/Home/ModifyPost";
import CreateComment from "../components/Home/CreateComment";
import Comment from "../components/Home/Comment";
import "../styles/home.css";
import Picture from "../components/Picture";
import UserPostInformation from "../components/UserPostInformation";

export default function Home() {
   const [data, setData] = useState([]);
   const userId = localStorage.getItem("userId");
   const [modifIsOpen, setModifIsOpen] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [comments, setComments] = useState(data.comments);

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

   /* useEffect(() => {
      async function fetchData() {
         const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/auth/${userPostId}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         const dataUser = await response.json();
         console.log(dataUser);
         setDataUser(dataUser);
      }
      fetchData();
   }, [userPostId, data]);
   console.log(dataUser); */

   const sortedPosts = data.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
   });

   const addPost = (newPost) => {
      console.log(newPost);
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
         if (post._id === newData.id) {
            return newData;
         }
         return post;
      });
      setData(updatedSortedPosts);
   };

   const addComment = (newComment) => {
      setComments([...comments, newComment]);
   };

   return (
      <div id="home">
         <CreatePost addPost={addPost} />
         {sortedPosts.map((data, key) => (
            <div key={key} className="home__posts">
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
                     <div className="post__footer">
                        <div className="post__like">
                           <i className="fa-regular fa-heart"></i>
                        </div>
                        <div
                           className="post__comment-icone"
                           onClick={() => setIsOpen(!isOpen)}
                        >
                           <i className="fa-regular fa-comment"></i>
                        </div>
                     </div>
                     <div className={isOpen ? "post__comment" : null}>
                        {isOpen
                           ? data.comments.map((comment, key) => (
                                <div key={key} className="comment">
                                   <Comment commentData={comment} />
                                </div>
                             ))
                           : null}
                        {isOpen ? (
                           <CreateComment
                              dataComment={data}
                              addComment={addComment}
                           />
                        ) : null}
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}
