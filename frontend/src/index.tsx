import React from "react";
import ReactDOM from "react-dom";
import TourDeFoos from "./components/FooTouer/TourDeFoos";

//Disable when you want to interact with real REST API server
if (process.env.REACT_APP_MOCK_WITH_MSW === "true") {
  const { worker } = require("./mocks/msw/browser");
  worker.start().then(() => console.log("MSW worker started!"));
}

ReactDOM.render(
  <React.StrictMode>
    <TourDeFoos />
  </React.StrictMode>,
  document.getElementById("root")
);
