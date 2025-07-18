import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

createRoot(document.getElementById("root")!).render(
  <HeroUIProvider>
    <App />
    <ToastProvider />
  </HeroUIProvider>
);
