import React, { useEffect, useState } from "react";
import CreatePost from "../components/Home/CreatePost";
import Post from "../components/Home/Post";
import "../styles/home.css";

export default function Home() {
   const [data, setData] = useState([]);

   useEffect(() => {
      async function fetchData() {
         const response = fetch(`${process.env.REACT_APP_API_URL}api/posts/`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         });
         const data = await (await response).json();
         setData(data);
      }
      fetchData();
   }, []);

   return (
      <div id="home">
         <CreatePost />
         {data.map((data, key) => (
            <div key={key} className="home__post">
               <Post data={data} />
            </div>
         ))}
      </div>
   );
}
