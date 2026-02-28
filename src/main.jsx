import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "next-themes";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
   </ThemeProvider>
);
