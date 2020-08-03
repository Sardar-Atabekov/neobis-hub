import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import * as serviceWorker from "./serviceWorker";
// import * as Sentry from "@sentry/browser";
import App from "./App";
import "./styles/dataPicker.css";
import "./styles/common.css";
import "./styles/tables.css";
import "./index.css";

// if (window.location.protocol === "https:") {
//   Sentry.init({
//     release: "match2@version" + 1,
//     dsn:
//       "https://f867546a87374bb4b2e0fb7022789219@o377055.ingest.sentry.io/5198621",
//   });
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
