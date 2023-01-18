import React from "react";
import Picture from "../components/Picture";

export default function Messenger() {
   return (
      <div id="messenger">
         <div className="messenger__left">
            <div className="messenger__discussion">
               <Picture />
               <div>Ceci est un test....</div>
            </div>
         </div>
         <div className="messenger__right">
            <div className="messenger__conversation">Ici c'est a droite</div>
         </div>
      </div>
   );
}
