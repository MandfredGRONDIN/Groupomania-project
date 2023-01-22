import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateMessage from "../components/Messenger/CreateMessage";
import Picture from "../components/Picture";
import UserPostInformation from "../components/UserPostInformation";
import "../styles/messenger.css";

export default function Messenger() {
   const [datas, setDatas] = useState([]);
   const [selectedConversationData, setSelectedConversationData] =
      useState(null);
   const [selectedConversationId, setSelectedConversationId] = useState(null);
   const params = useParams();

   const scroll = async (e) => {
      const conversation = document.querySelector(".messenger__conversation");
      conversation.scrollTop = conversation.scrollHeight;
   };

   useEffect(() => {
      const token = localStorage.getItem("token");
      async function fetchData() {
         const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/messenger/getall`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         const result = await response.json();
         setDatas(result);
         scroll();
      }
      fetchData();
      if (selectedConversationId) {
         async function fetchConversationData() {
            const response = await fetch(
               `${process.env.REACT_APP_API_URL}api/messenger/getone/${selectedConversationId}`,
               {
                  method: "GET",
                  headers: {
                     "Content-Type": "application/json",
                     Accept: "application/json",
                     Authorization: `Bearer ${token}`,
                  },
               }
            );
            const result = await response.json();
            setSelectedConversationData(result);
            scroll();
         }
         fetchConversationData();
      }
   }, [selectedConversationId]);

   const addMessage = (newMessage) => {
      setSelectedConversationData((prevData) => {
         return {
            ...prevData,
            messages: [...prevData.messages, newMessage],
         };
      });
      scroll();
   };

   return (
      <div id="messenger">
         <div className="messenger__left">
            {datas.map((data, key) => (
               <div
                  className="messenger__discussion"
                  key={key}
                  onClick={() => setSelectedConversationId(data._id)}
               >
                  <div className="messenger__discussion-picture">
                     <Picture
                        data={
                           data.receiver === params.id
                              ? data.sender
                              : data.receiver
                        }
                     />
                  </div>
                  <div className="messenger__discussion-name">
                     {data.receiver === params.id ? (
                        <UserPostInformation data={data.sender} />
                     ) : (
                        <UserPostInformation data={data.receiver} />
                     )}
                  </div>
               </div>
            ))}
         </div>
         {selectedConversationData ? (
            <div className="messenger__right">
               <div className="messenger__right-bloc">
                  <div className="messenger__conversation">
                     {selectedConversationData.messages.map((message, key) => (
                        <div className="messenger__conversation-bloc" key={key}>
                           {message.sender === params.id ? (
                              <div className="right">
                                 <div className="messenger__conversation-message">
                                    {message.message}
                                 </div>
                              </div>
                           ) : (
                              <div className="left">
                                 <div className="messenger__conversation-message">
                                    {message.message}
                                 </div>
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
                  <CreateMessage
                     addMessage={addMessage}
                     conversationData={selectedConversationData}
                  />
               </div>
            </div>
         ) : (
            <div className="messenger__right">
               <div className="messenger__right-bloc">
                  <div className="messenger__conversation"></div>
                  {/* <CreateMessage addMessage={addMessage} /> */}
               </div>
            </div>
         )}
      </div>
   );
}
