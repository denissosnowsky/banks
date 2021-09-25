import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ErrorBoundary from "./components/ErrorBoundery/ErrorBoundery";
import ClientInit from "./components/ClientInit/ClientInit";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ClientInit>
        <App />
      </ClientInit>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
