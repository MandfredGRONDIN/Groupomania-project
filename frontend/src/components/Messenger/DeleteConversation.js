import React, { useEffect } from "react";

export default function DeleteConversation({ data }) {
   const userId = localStorage.getItem("userId");
   const messageId = data._id;

   const handleConversation = async (e) => {
      const token = localStorage.getItem("token");
      let item = { messageId };
      const result = await fetch(
         `${process.env.REACT_APP_API_URL}api/messenger/delete/${userId}`,
         {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(item),
         }
      );
      console.log(result.status);
      if (result.status === 200) {
      }
   };

   return (
      <div>
         <i className="fa-solid fa-trash" onClick={handleConversation}></i>
      </div>
   );
}
