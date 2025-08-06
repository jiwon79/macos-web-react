import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Desktop } from "views/pages/desktop";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Desktop />
    </React.StrictMode>
  );
}
