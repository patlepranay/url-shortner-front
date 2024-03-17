import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "@/components/ui/toaster"
import { dark } from "@clerk/themes";
 

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}  appearance={{
        baseTheme: dark
      }} >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
        <Toaster/>
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
