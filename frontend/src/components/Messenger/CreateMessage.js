import React, { useState } from "react";

export default function CreateMessage({ conversationData, addMessage }) {
   const sender = localStorage.getItem("userId");
   const receiver = conversationData.receiver;
   const [message, setMessage] = useState("Aa");
   console.log(receiver, sender);

   const handleMessage = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const item = { sender, receiver, message };
      let result = await fetch(
         `${process.env.REACT_APP_API_URL}api/messenger/`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(item),
         }
      );
      result = await result.json();
      console.log(result);
      if (result.message === "Message sent successfully") {
         setMessage("");
         addMessage(item);
      }
   };

   return (
      <div className="messenger__conversation-create">
         <form action="" onSubmit={handleMessage} id="messenger__form">
            <input
               type="text"
               name="message"
               id="message"
               onChange={(e) => setMessage(e.target.value)}
               onClick={(e) => {
                  if (e.target.value === "Aa") {
                     e.target.value = "";
                  }
               }}
               value={message}
            />
            <input
               type="submit"
               id="messenger__submit"
               value="submit"
               style={{ display: "none" }}
            />
            <i
               className="fa-solid fa-paper-plane submit__plane"
               onClick={handleMessage}
            ></i>
         </form>
      </div>
   );
}
