
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Flag, Clock, Check } from 'lucide-react';

interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl: string;
}

interface RecipeItem {
  name: string;
  prepTime: string;
  calories: number;
  ingredients: string[];
  steps: string[];
  imageUrl: string;
}

interface QuickActionModalProps {
  actionType: 'log-meal' | 'scan-label' | 'find-recipes' | 'night-craving';
  onClose: () => void;
}

const QuickActionModal: React.FC<QuickActionModalProps> = ({ actionType, onClose }) => {
  // Mock data for each action type
  const mealOptions: FoodItem[] = [
    {
      name: "Masala Dosa",
      calories: 250,
      protein: 5,
      carbs: 40,
      fat: 8,
      imageUrl: "https://images.unsplash.com/photo-1685362522096-8e3abf0ee860"
    },
    {
      name: "Paneer Tikka",
      calories: 320,
      protein: 20,
      carbs: 10,
      fat: 22,
      imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6"
    },
    {
      name: "Vegetable Biryani",
      calories: 380,
      protein: 8,
      carbs: 68,
      fat: 12,
      imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8"
    }
  ];
  
  const scanResults: FoodItem = {
    name: "Mixed Fruit Juice",
    calories: 120,
    protein: 1,
    carbs: 28,
    fat: 0,
    imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba"
  };
  
  const recipeOptions: RecipeItem[] = [
    {
      name: "Quinoa Bowl with Roasted Vegetables",
      prepTime: "25 mins",
      calories: 320,
      ingredients: ["1 cup quinoa", "2 cups mixed vegetables", "2 tbsp olive oil", "1 tsp cumin", "Salt and pepper to taste"],
      steps: ["Cook quinoa as per package instructions", "Roast vegetables with oil and spices", "Mix and serve"],
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
    },
    {
      name: "Avocado Toast with Poached Egg",
      prepTime: "15 mins",
      calories: 280,
      ingredients: ["2 slices whole grain bread", "1 avocado", "2 eggs", "1 tsp lemon juice", "Red chilli flakes"],
      steps: ["Toast bread", "Mash avocado with lemon juice", "Poach eggs", "Assemble and serve"],
      imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8"
    }
  ];
  
  const cravingOptions: FoodItem[] = [
    {
      name: "Dark Chocolate (2 squares)",
      calories: 110,
      protein: 2,
      carbs: 13,
      fat: 7,
      imageUrl: "https://images.unsplash.com/photo-1606312619070-d48b4c652212"
    },
    {
      name: "Greek Yogurt with Honey",
      calories: 150,
      protein: 15,
      carbs: 20,
      fat: 0,
      imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777"
    },
    {
      name: "Mixed Nuts (small handful)",
      calories: 170,
      protein: 6,
      carbs: 6,
      fat: 15,
      imageUrl: "https://images.unsplash.com/photo-1536816579748-4ecb3f03d72a"
    }
  ];
  
  const renderTitle = () => {
    switch (actionType) {
      case 'log-meal':
        return "Log Your Meal";
      case 'scan-label':
        return "Scan Results";
      case 'find-recipes':
        return "Recipe Suggestions";
      case 'night-craving':
        return "Healthy Night Cravings";
      default:
        return "";
    }
  };
  
  const renderContent = () => {
    switch (actionType) {
      case 'log-meal':
        return (
          <div className="space-y-4">
            <p className="text-gray-600">Select a meal to log or add a custom meal:</p>
            
            <div className="grid gap-4">
              {mealOptions.map((meal, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                  <div className="flex">
                    <div className="w-24 h-24 relative">
                      <img 
                        src={meal.imageUrl} 
                        alt={meal.name} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{meal.name}</h3>
                          <p className="text-sm text-gray-500">{meal.calories} kcal</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-arogya-primary"
                        >
                          Log
                        </Button>
                      </div>
                      <div className="flex gap-3 mt-2 text-xs">
                        <span>P: {meal.protein}g</span>
                        <span>C: {meal.carbs}g</span>
                        <span>F: {meal.fat}g</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
            
            <Button 
              className="w-full bg-arogya-primary hover:bg-arogya-primary/90"
            >
              Add Custom Meal
            </Button>
          </div>
        );
        
      case 'scan-label':
        return (
          <div className="space-y-6">
            <div className="bg-arogya-light p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-20 h-20 rounded overflow-hidden mr-4">
                  <img 
                    src={scanResults.imageUrl} 
                    alt={scanResults.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{scanResults.name}</h3>
                  <p className="text-sm text-gray-600">Scanned successfully</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Nutrition Facts</h4>
              <div className="bg-white border rounded-lg p-4">
                <div className="border-b pb-2 mb-2">
                  <div className="text-lg font-bold">Calories: {scanResults.calories}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-2 bg-arogya-primary/10 rounded">
                    <div className="text-sm text-gray-600">Protein</div>
                    <div className="font-semibold">{scanResults.protein}g</div>
                  </div>
                  <div className="text-center p-2 bg-arogya-secondary/10 rounded">
                    <div className="text-sm text-gray-600">Carbs</div>
                    <div className="font-semibold">{scanResults.carbs}g</div>
                  </div>
                  <div className="text-center p-2 bg-arogya-accent/10 rounded">
                    <div className="text-sm text-gray-600">Fat</div>
                    <div className="font-semibold">{scanResults.fat}g</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-arogya-success/10 p-4 rounded-lg flex items-start">
              <Check className="text-arogya-success h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-arogya-success">AI Health Assessment</p>
                <p className="text-sm">This product fits well within your daily nutritional goals. Good choice!</p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline">
                Scan Another
              </Button>
              <Button className="bg-arogya-primary hover:bg-arogya-primary/90">
                Add to Log
              </Button>
            </div>
          </div>
        );
        
      case 'find-recipes':
        return (
          <div className="space-y-6">
            <p className="text-gray-600">Based on your preferences and available ingredients, we recommend:</p>
            
            {recipeOptions.map((recipe, index) => (
              <Card key={index} className="overflow-hidden">
                <div>
                  <div className="h-40 relative">
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.name} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-arogya-primary text-white px-2 py-1 rounded text-xs">
                      {recipe.calories} kcal
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{recipe.name}</h3>
                    <div className="flex items-center mt-1 mb-3 text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{recipe.prepTime}</span>
                    </div>
                    
                    <div className="mt-2">
                      <h4 className="text-sm font-medium mb-1">Ingredients:</h4>
                      <ul className="text-xs text-gray-600 list-disc ml-4 mb-3">
                        {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                          <li key={idx}>{ingredient}</li>
                        ))}
                        {recipe.ingredients.length > 3 && (
                          <li className="text-arogya-primary">+ {recipe.ingredients.length - 3} more</li>
                        )}
                      </ul>
                      
                      <Button 
                        className="w-full mt-2 bg-arogya-primary hover:bg-arogya-primary/90"
                        size="sm"
                      >
                        View Full Recipe
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
            >
              <Flag className="h-4 w-4" />
              Enter Different Ingredients
            </Button>
          </div>
        );
        
      case 'night-craving':
        return (
          <div className="space-y-4">
            <div className="bg-arogya-light p-4 rounded-lg">
              <h3 className="font-medium text-arogya-primary mb-1">Craving something sweet or savory?</h3>
              <p className="text-sm text-gray-600">Here are some healthier alternatives that won't disrupt your sleep or nutrition goals.</p>
            </div>
            
            <div className="grid gap-3">
              {cravingOptions.map((option, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="flex">
                    <div className="w-24 h-24 relative">
                      <img 
                        src={option.imageUrl} 
                        alt={option.name} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3 flex-1">
                      <div>
                        <h3 className="font-medium text-sm">{option.name}</h3>
                        <p className="text-xs text-gray-500">{option.calories} kcal</p>
                        
                        <div className="flex gap-3 mt-2 text-xs">
                          <span>P: {option.protein}g</span>
                          <span>C: {option.carbs}g</span>
                          <span>F: {option.fat}g</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="bg-arogya-secondary/10 p-3 rounded-lg text-sm">
              <p className="font-medium mb-1">Sleep-Friendly Tip:</p>
              <p className="text-gray-600 text-xs">Try to eat at least 2 hours before bedtime for better digestion and sleep quality.</p>
            </div>
            
            <Button 
              className="w-full bg-arogya-primary hover:bg-arogya-primary/90 flex items-center justify-center gap-2"
            >
              Find More Options <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-auto">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-arogya-primary/20 to-arogya-accent/20 p-4 sticky top-0 flex justify-between items-center z-10">
            <h2 className="text-lg font-semibold">{renderTitle()}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-5">
            {renderContent()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActionModal;
