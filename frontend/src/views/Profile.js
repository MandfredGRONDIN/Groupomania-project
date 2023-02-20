import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/profile.css";
import Picture from "../components/Picture";

export default function Profile() {
   const [data, setData] = useState([]);
   const [pseudo, setPseudo] = useState("");
   const [email, setEmail] = useState("");
   const [file, setFile] = useState();
   const [imagePreviewUrl, setImagePreviewUrl] = useState("");
   const params = useParams();
   const userIdToken = localStorage.getItem("userId");
   const navigate = useNavigate();

   //Fonction pour cacher le début de l'email
   let hideEmail = (email) => {
      let index = email.indexOf("@");
      index = index < 0 ? 0 : index;
      return "*".repeat(index) + email.substring(index);
   };

   //Redirection vers la page erreur si le token userId est différent de celui de l'url
   useEffect(() => {
      if (userIdToken !== params.id) {
         navigate("/error");
      }
   });

   /* 
      Récupération des données de l'utilisateur avec l'id dans l'url
      Ajout des données grâce au state
   */
   useEffect(() => {
      async function fetchData() {
         const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/auth/log/${params.id}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         const data = await response.json();
         setData(data);
         setPseudo(data.pseudo);
         setEmail(data.email);
      }
      fetchData();
   }, [params]);

   /* Fonction pour gérer le changement d'image/pseudo */
   const handleProfile = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const data = new FormData();

      //Récupération des donnés que l'on souhaite changer
      data.append("pseudo", pseudo);
      if (file) {
         data.append("image", file);
      }

      try {
         const result = await axios.put(
            `${process.env.REACT_APP_API_URL}api/auth/modify/${params.id}`,
            data,
            {
               headers: {
                  "Content-Type": "multipart/form-data",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         if (result.data.message === "User modified") {
            window.location.reload(false);
         }
      } catch (e) {
         console.error(e);
      }
   };

   // Fonction pour gérer le changement d'image
   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Prévisualisation de l'image
      setImagePreviewUrl(URL.createObjectURL(selectedFile));
   };

   return (
      <main id="profile">
         <div className="user__img">
            {imagePreviewUrl ? (
               <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="preview__img"
               />
            ) : (
               <Picture data={params.id} />
            )}
            <div className="button__img">
               <label htmlFor="fileInput">
                  <i
                     className="fa-solid fa-camera change__picture"
                     id="test"
                  ></i>
               </label>
               <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="fileInput"
               />
            </div>
         </div>
         <form className="form__profile">
            <div id="profile__name">
               <label htmlFor="name"></label>
               <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setPseudo(e.target.value)}
                  value={pseudo}
               />
            </div>
            <div id="profile__email">
               <label htmlFor="email"></label>
               <input
                  type="email"
                  name="email"
                  className="email profile"
                  defaultValue={hideEmail(email)}
                  readOnly
               />
            </div>
            <input
               id="modify__profile"
               type="submit"
               value="Modify Profile"
               onClick={handleProfile}
            />
         </form>
      </main>
   );
}
