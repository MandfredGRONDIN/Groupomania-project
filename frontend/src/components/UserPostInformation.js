import React, { useState, useEffect } from "react";

export default function UserPostInformation({ data }) {
   const [dataUser, setDataUser] = useState("");
   const dataId = data;

   useEffect(() => {
      async function fetchData() {
         const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/auth/log/${dataId}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         const data = await response.json();
         setDataUser(data);
      }
      fetchData();
   }, [dataId]);

   return (
      <>
         <div className="post__pseudo">{dataUser.pseudo}</div>
      </>
   );
}
