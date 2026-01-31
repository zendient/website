import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga4";
import "./styles/globals.css";
import App from "./App";

ReactGA.initialize(import.meta.env.VITE_GTM_ID_ZENDIENT_COM!);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
