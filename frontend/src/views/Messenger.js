import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Picture from "../components/Picture";
import "../styles/messenger.css";

export default function Messenger() {
   const [datas, setDatas] = useState([]);
   const [selectedConversationData, setSelectedConversationData] =
      useState(null);
   const [selectedConversationId, setSelectedConversationId] = useState(null);
   const params = useParams();

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
         }
         fetchConversationData();
      }
   }, [selectedConversationId]);
   console.log(datas);
   console.log(selectedConversationData);
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
                     <Picture data={data.receiver} />
                  </div>
                  <div className="messenger__discussion-name">
                     Ceci est un test....
                  </div>
               </div>
            ))}
         </div>
         {selectedConversationData ? (
            <div className="messenger__right">
               <div className="messenger__conversation">
                  {selectedConversationData.messages.map((message) => (
                     <div className="messenger__conversation-bloc">
                        {message.sender === params.id ? (
                           <div className="left">
                              <div className="messenger__conversation-message">
                                 {message.message}
                              </div>
                           </div>
                        ) : (
                           <div className="right">
                              <div className="messenger__conversation-message">
                                 {message.message}
                              </div>
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         ) : (
            <div className="messenger__right"></div>
         )}
      </div>
   );
}
