import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./globals.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { LoaderProvider } from "./context/LoaderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LoaderProvider>
          <App />
        </LoaderProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
