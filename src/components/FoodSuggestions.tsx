
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChefHat, ArrowRightLeft } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const FoodSuggestions: React.FC = () => {
  // Mock data for swap suggestions
  const swapSuggestions = [
    {
      original: "White Rice",
      suggestion: "Brown Rice or Quinoa",
      benefit: "More fiber, protein and nutrients"
    },
    {
      original: "Potato Chips",
      suggestion: "Baked Makhana or Roasted Chana",
      benefit: "Lower calories, higher protein"
    },
    {
      original: "Sweetened Soda",
      suggestion: "Nimbu Pani or Coconut Water",
      benefit: "Natural sugars, added electrolytes"
    }
  ];

  // Handle recipe view
  const handleViewRecipe = (recipeName: string) => {
    toast({
      title: "Recipe Selected",
      description: `You selected the ${recipeName} recipe`,
    });
  };

  // Handle enter ingredients
  const handleEnterIngredients = () => {
    toast({
      title: "Enter Ingredients",
      description: "Ingredient input feature coming soon",
    });
  };

  // Handle show more swaps
  const handleShowMoreSwaps = () => {
    toast({
      title: "More Food Swaps",
      description: "Additional food swap suggestions coming soon",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-nutri-green" />
            <span>What Can I Cook?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Discover recipes based on ingredients you already have in your fridge.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-3 gap-2">
              {['Paneer', 'Tomatoes', 'Bell Pepper', 'Onion', 'Yogurt', 'Rice'].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-full px-3 py-1 text-xs text-center shadow-sm border"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Available Recipes (3)</h4>
            <div className="space-y-2">
              <div className="bg-white rounded-md p-3 border flex justify-between items-center">
                <div>
                  <h5 className="font-medium text-sm">Paneer Tikka</h5>
                  <p className="text-xs text-gray-500">20 min • 320 kcal</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-nutri-green"
                  onClick={() => handleViewRecipe("Paneer Tikka")}
                >
                  View
                </Button>
              </div>
              
              <div className="bg-white rounded-md p-3 border flex justify-between items-center">
                <div>
                  <h5 className="font-medium text-sm">Veg Pulao</h5>
                  <p className="text-xs text-gray-500">30 min • 410 kcal</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-nutri-green"
                  onClick={() => handleViewRecipe("Veg Pulao")}
                >
                  View
                </Button>
              </div>
              
              <div className="bg-white rounded-md p-3 border flex justify-between items-center">
                <div>
                  <h5 className="font-medium text-sm">Raita Bowl</h5>
                  <p className="text-xs text-gray-500">10 min • 140 kcal</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-nutri-green"
                  onClick={() => handleViewRecipe("Raita Bowl")}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full mt-4 bg-nutri-green hover:bg-nutri-green/90"
            onClick={handleEnterIngredients}
          >
            Enter Ingredients
          </Button>
        </CardContent>
      </Card>
      
      {/* Swap Suggestions */}
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-nutri-purple" />
            <span>Smart Food Swaps</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Healthier alternatives based on your recent food choices.
          </p>
          
          <div className="space-y-3">
            {swapSuggestions.map((swap, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="px-3 py-1 bg-white rounded-full text-sm border">
                    {swap.original}
                  </div>
                  <ArrowRightLeft className="h-4 w-4 text-gray-400" />
                  <div className="px-3 py-1 bg-nutri-purple/10 rounded-full text-sm border-2 border-nutri-purple/20 text-nutri-purple">
                    {swap.suggestion}
                  </div>
                </div>
                <p className="text-xs text-gray-500 italic ml-2">
                  {swap.benefit}
                </p>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={handleShowMoreSwaps}
          >
            Show More Swaps
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodSuggestions;
