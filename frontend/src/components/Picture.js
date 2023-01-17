import React, { useState, useEffect } from "react";

function Picture({ data }) {
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
         {dataUser.picture ? (
            <img
               src={`${process.env.REACT_APP_API_URL}images/${dataUser.picture}`}
               alt="Profil"
               className="post__picture"
            ></img>
         ) : (
            <i className="fa-solid fa-user i__header"></i>
         )}
      </>
   );
}

export default Picture;
