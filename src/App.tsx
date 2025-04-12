
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PeriodPregnancyMediator from "./pages/PeriodPregnancyMediator";
import SicknessMode from "./pages/SicknessMode";
import CosmeticScanner from "./pages/CosmeticScanner";
import FridgeCooking from "./pages/FridgeCooking";
import WeddingFitness from "./pages/WeddingFitness";
import LabelScanner from "./pages/LabelScanner";
import OnboardingFlow from "./pages/OnboardingFlow";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<OnboardingFlow />} />
          <Route path="/period-pregnancy-mediator" element={<PeriodPregnancyMediator />} />
          <Route path="/sickness-mode" element={<SicknessMode />} />
          <Route path="/cosmetic-scanner" element={<CosmeticScanner />} />
          <Route path="/fridge-cooking" element={<FridgeCooking />} />
          <Route path="/wedding-fitness" element={<WeddingFitness />} />
          <Route path="/label-scanner" element={<LabelScanner />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
