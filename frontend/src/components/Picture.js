import React, { useState, useEffect } from "react";

function Picture({ img }) {
   const [isLoaded, setIsLoaded] = useState(false);
   useEffect(() => {
      const image = new Image();
      image.src = `${process.env.REACT_APP_API_URL}images/${img}`;
   }, [img]);

   return (
      <>
         {!isLoaded && <i className="fa-solid fa-user" />}
         {img && (
            <img
               src={`${process.env.REACT_APP_API_URL}images/${img}`}
               alt="Profil"
               className="post__picture"
               onLoad={() => setIsLoaded(true)}
            />
         )}
      </>
   );
}

export default Picture;
