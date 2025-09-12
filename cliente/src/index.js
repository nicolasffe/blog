import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Importa Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Importa CSS personalizado
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

