import React, { useEffect, useState } from "react";
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
   console.log(data);

   return (
      <div id="home">
         {data.map((data, key) => (
            <div key={key} className="home__post">
               <div>{data.userId}</div>
               <div>{data.description}</div>
               {data.imageUrl ? (
                  <div>
                     <img src={data.imageUrl} alt="" />
                  </div>
               ) : null}
            </div>
         ))}
      </div>
   );
}
