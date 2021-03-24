import React from "react";
import ReactDOM from "react-dom";
import TourDeFoos from "./components/FooTouer/TourDeFoos";

//Disable when you want to interact with real server
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start().then(() => console.log("MSW worked started!"));
}

ReactDOM.render(
  <React.StrictMode>
    <TourDeFoos />
  </React.StrictMode>,
  document.getElementById("root")
);
