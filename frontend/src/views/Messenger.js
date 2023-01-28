import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateMessage from "../components/Messenger/CreateMessage";
import Picture from "../components/Picture";
import UserPostInformation from "../components/UserPostInformation";
import "../styles/messenger.css";

export default function Messenger() {
   const [datas, setDatas] = useState([]);
   const [selectedConversationData, setSelectedConversationData] =
      useState(null);
   const [selectedConversationId, setSelectedConversationId] = useState(null);
   const [conversation, setConversation] = useState([]);
   const [searchResults, setSearchResults] = useState([]);
   const [createConversation, setCreateConversation] = useState("");
   const [isOpen, setIsOpen] = useState(false);
   const params = useParams();
   const userIdToken = localStorage.getItem("userId");
   const navigate = useNavigate();

   useEffect(() => {
      if (userIdToken !== params.id) {
         navigate("/error");
      }
   });

   useEffect(() => {
      const conversation = document.querySelector(".messenger__conversation");
      conversation.scrollTop = conversation.scrollHeight;
   }, [selectedConversationData]);

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
         console.log(result);
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

   const handleSearch = async (query) => {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}api/auth/search?user=${query}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }
      );
      const result = await response.json();
      console.log(result);
      setSearchResults(result);
   };

   const addMessage = (newMessage) => {
      if (selectedConversationData !== null) {
         const token = localStorage.getItem("token");
         async function fetchConversationData() {
            const response = await fetch(
               `${process.env.REACT_APP_API_URL}api/messenger/getone/${newMessage.convId}`,
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
      } else {
         setSelectedConversationData((prevData) => {
            return {
               ...prevData,
               messages: [...prevData.messages, newMessage],
            };
         });
      }
   };

   const handleCreateConversation = (user) => {
      setCreateConversation(user);
   };

   const sortedConversation = datas.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
   });

   return (
      <div id="messenger">
         <div className="messenger__left">
            {Array.isArray(sortedConversation) &&
               sortedConversation.map((data, key) => (
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
         ) : conversation === "" ? (
            <div className="messenger__right">
               <div className="messenger__right-bloc">
                  <div className="messenger__conversation"></div>
               </div>
            </div>
         ) : (
            <div className="messenger__right">
               <form
                  onSubmit={(e) => {
                     e.preventDefault();
                     handleSearch(e.target.search.value);
                     setIsOpen(true);
                  }}
                  id="messenger__form-search"
               >
                  <input type="text" name="search" placeholder="Recherche..." />
                  <button type="submit">
                     <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
               </form>
               <div className={isOpen ? "search__results" : ""}>
                  {searchResults.map((user, key) => (
                     <div key={key}>
                        <p>{user.name}</p>
                        <button
                           onClick={() => {
                              setSelectedConversationData("");
                              handleCreateConversation(user);
                           }}
                           className="button__messenger-search"
                        >
                           {user.pseudo}
                        </button>
                     </div>
                  ))}
               </div>
               <div className="messenger__right-bloc">
                  <div className="messenger__conversation">
                     {createConversation ? (
                        <CreateMessage
                           conversationData={createConversation}
                           addMessage={addMessage}
                        />
                     ) : null}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
