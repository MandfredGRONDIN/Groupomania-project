import React from "react";

export default function Post({ data }) {
   console.log(data);
   return (
      <div>
         <div>{data.userId}</div>
         <div>{data.description}</div>
         {data.imageUrl ? (
            <div>
               <img src={data.imageUrl} alt="" />
            </div>
         ) : null}
      </div>
   );
}
