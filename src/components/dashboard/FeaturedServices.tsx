
import React, { useState } from 'react';
import FeaturedService from './FeaturedService';
import PeriodPregnancyModal from './PeriodPregnancyModal';
import SicknessModeModal from './SicknessModeModal';
import { 
  Beaker, 
  Stethoscope, 
  Baby, 
  ChefHat, 
  Gift, 
  Microscope 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

interface FeaturedServicesProps {
  handleFeatureClick: (featureName: string) => void;
}

const FeaturedServices: React.FC<FeaturedServicesProps> = ({ handleFeatureClick }) => {
  const navigate = useNavigate();
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [showSicknessModal, setShowSicknessModal] = useState(false);
  
  // Handler for navigating to specialized pages
  const handleNavigation = (featureName: string, path: string | null) => {
    if (featureName === "Periods & Pregnancy Cravings Mediator") {
      setShowPeriodModal(true);
    } else if (featureName === "Sickness Mode") {
      setShowSicknessModal(true);
    } else if (path) {
      navigate(path);
    } else {
      handleFeatureClick(featureName);
      toast({
        title: "Coming Soon",
        description: `The ${featureName} feature will be available in the next update.`,
      });
    }
  };
  
  // Mock API data for period & pregnancy with actual image URLs
  const periodPregnancyData = {
    categories: [
      {
        title: "Period Relief Foods",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
        recommendations: [
          { name: "Ginger Tea", benefit: "Reduces inflammation and cramps" },
          { name: "Dark Chocolate", benefit: "Mood-boosting and rich in magnesium" },
          { name: "Yogurt", benefit: "Provides calcium and probiotics" }
        ]
      },
      {
        title: "Pregnancy Cravings",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        recommendations: [
          { name: "Sweet Cravings", benefit: "Dates, Dry Fruits, Fruit Popsicles" },
          { name: "Sour Cravings", benefit: "Amla, Tamarind, Lemon-based snacks" },
          { name: "Savory Cravings", benefit: "Roasted Makhana, Baked Namkeen" }
        ]
      }
    ]
  };
  
  // Mock API data for sickness mode
  const sicknessModeData = {
    conditions: [
      {
        name: "Fever & Cold",
        image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
        foods: [
          { name: "Kichdi", benefit: "Easy to digest and provides complete nutrition" },
          { name: "Turmeric Milk", benefit: "Anti-inflammatory and soothing" },
          { name: "Ginger Tea", benefit: "Helps clear congestion and soothes throat" }
        ]
      },
      {
        name: "Digestive Issues",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        foods: [
          { name: "BRAT Diet", benefit: "Banana, Rice, Applesauce, Toast - gentle on stomach" },
          { name: "Curd Rice", benefit: "Probiotic benefits and easy to digest" },
          { name: "Clear Soups", benefit: "Hydrating and light on digestion" }
        ]
      }
    ]
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Featured Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cosmetic & Personal Care Scanner */}
        <FeaturedService 
          icon={Beaker}
          iconBgClass="bg-pink-500/20"
          iconColor="text-pink-500"
          title="🧴 Cosmetic & Personal Care Scanner"
          description="Analyze ingredients in your personal care products for potential allergens and harmful chemicals."
          buttonText="Scan Product"
          buttonBgClass="bg-pink-500 hover:bg-pink-600"
          onClick={() => handleNavigation("Cosmetic & Personal Care Scanner", "/cosmetic-scanner")}
        />
        
        {/* Sickness Mode */}
        <FeaturedService 
          icon={Stethoscope}
          iconBgClass="bg-arogya-success/20"
          iconColor="text-arogya-success"
          title="Sickness Mode (Curated Sick Diets)"
          description="Personalized nutrition recommendations for when you're feeling under the weather."
          buttonText="Enable Sickness Mode"
          buttonBgClass="bg-arogya-success hover:bg-arogya-success/90"
          onClick={() => handleNavigation("Sickness Mode", "/sickness-mode")}
        />
        
        {/* Periods & Pregnancy */}
        <FeaturedService 
          icon={Baby}
          iconBgClass="bg-arogya-primary/20"
          iconColor="text-arogya-primary"
          title="Periods & Pregnancy Cravings Mediator"
          description="Healthier alternatives to satisfy cravings during periods and pregnancy."
          buttonText="Get Recommendations"
          buttonBgClass="bg-arogya-primary hover:bg-arogya-primary/90"
          onClick={() => handleNavigation("Periods & Pregnancy Cravings Mediator", "/period-pregnancy-mediator")}
        />
        
        {/* What Can I Cook */}
        <FeaturedService 
          icon={ChefHat}
          iconBgClass="bg-green-500/20"
          iconColor="text-green-500"
          title="What Can I Cook with My Fridge?"
          description="Discover recipes you can make with ingredients already in your kitchen."
          buttonText="Enter Ingredients"
          buttonBgClass="bg-green-500 hover:bg-green-600"
          onClick={() => handleNavigation("What Can I Cook", "/fridge-cooking")}
        />
        
        {/* Wedding & Event Fitness */}
        <FeaturedService 
          icon={Gift}
          iconBgClass="bg-amber-500/20"
          iconColor="text-amber-500"
          title="Wedding & Event Fitness Pack"
          description="Personalized fitness and nutrition plans to look your best on your special day."
          buttonText="Create Plan"
          buttonBgClass="bg-amber-500 hover:bg-amber-600"
          onClick={() => handleNavigation("Wedding & Event Fitness Pack", "/wedding-fitness")}
        />
        
        {/* Label & Additive Scanner */}
        <FeaturedService 
          icon={Microscope}
          iconBgClass="bg-red-500/20"
          iconColor="text-red-500"
          title="Label & Additive Scanner (Game-Changer)"
          description="Decode food labels and identify potentially harmful additives in packaged foods."
          buttonText="Scan Label"
          buttonBgClass="bg-red-500 hover:bg-red-600"
          onClick={() => handleNavigation("Label & Additive Scanner", "/label-scanner")}
        />
      </div>
      
      {/* Period & Pregnancy Modal */}
      {showPeriodModal && (
        <PeriodPregnancyModal 
          data={periodPregnancyData} 
          onClose={() => setShowPeriodModal(false)} 
          onNavigate={() => navigate("/period-pregnancy-mediator")}
        />
      )}
      
      {/* Sickness Mode Modal */}
      {showSicknessModal && (
        <SicknessModeModal 
          data={sicknessModeData} 
          onClose={() => setShowSicknessModal(false)} 
          onNavigate={() => navigate("/sickness-mode")}
        />
      )}
    </div>
  );
};

export default FeaturedServices;
