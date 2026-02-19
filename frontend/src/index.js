import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Safety handler for external analytics/visual scripts
window.handleBackToLanding = () => {
  if (window.dispatchEvent) {
    window.dispatchEvent(new CustomEvent('nav-landing'));
  }
  console.log('Safety: handleBackToLanding called');
};

root.render(
  <App />
);
