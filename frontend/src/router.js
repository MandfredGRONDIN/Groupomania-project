import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import Messenger from "./views/Messenger";
import Profile from "./views/Profile";
import Error from "./views/Error";

function Routing() {
   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/messenger/:id" element={<Messenger />} />
            <Route path="/*" element={<Error />} />
         </Routes>
      </div>
   );
}

export default Routing;
