import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ElementalThemeProvider } from "./components/ElementalThemeProvider";
import { TooltipProvider } from "./components/animate-ui/primitives/animate/tooltip";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ElementalThemeProvider>
      <TooltipProvider openDelay={400} closeDelay={200}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </TooltipProvider>
    </ElementalThemeProvider>
  </BrowserRouter>
);
