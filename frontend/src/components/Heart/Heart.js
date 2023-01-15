import React from "react";

export default function Heart({ liked }) {
   return (
      <div>
         {liked ? (
            <i className="fa-solid fa-heart flip-vertical-left"></i>
         ) : (
            <i className="fa-regular fa-heart"></i>
         )}
      </div>
   );
}
