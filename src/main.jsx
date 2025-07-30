import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routes from "./App/Routes";
import { InsuranceFormProvider } from "./App/InsuranceFormContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InsuranceFormProvider>
      <Routes />
    </InsuranceFormProvider>
  </StrictMode>
);
