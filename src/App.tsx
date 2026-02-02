import { Route, Routes } from "react-router-dom";
import { usePageTracking } from "./hooks/usePageTracking";
import { ElementalThemeProvider } from "./components/ElementalThemeProvider";
import { TooltipProvider } from "./components/animate-ui/primitives/animate/tooltip";
import { HomePage } from "./pages/HomePage";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";

function App() {
  usePageTracking();

  return (
    <ElementalThemeProvider>
      <TooltipProvider openDelay={400} closeDelay={200}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </TooltipProvider>
    </ElementalThemeProvider>
  );
}

export default App;
