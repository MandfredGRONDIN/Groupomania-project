import React, { useState, useEffect } from "react";

export default function DateCreate({ dateAt }) {
   const [timePassed, setTimePassed] = useState("");
   useEffect(() => {
      const intervalId = setInterval(() => {
         const currentTime = new Date().getTime();
         const timePassed = currentTime - new Date(dateAt).getTime();
         const hoursPassed = Math.floor(timePassed / 3600000);
         const minutesPassed = Math.floor(timePassed / 60000);

         if (hoursPassed >= 24) {
            const daysPassed = Math.floor(timePassed / 86400000);
            setTimePassed(`${daysPassed}d`);
         } else if (minutesPassed <= 60) {
            setTimePassed(`${minutesPassed}m`);
         } else if (dateAt === undefined) {
            setTimePassed("0m");
         } else {
            setTimePassed(`${hoursPassed}h`);
         }
      }, 1000);
      return () => clearInterval(intervalId);
   }, [dateAt]);

   return <div>{timePassed}</div>;
}
