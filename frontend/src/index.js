import React from "react";
import ReactDOM from "react-dom/client";
import Routing from "./router";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <BrowserRouter>
      <Routing />
   </BrowserRouter>
);
