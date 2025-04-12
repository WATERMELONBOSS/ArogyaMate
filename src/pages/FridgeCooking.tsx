
import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Search, Plus, Trash2, ChefHat, Camera, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const FridgeCooking = () => {
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleAddIngredient = () => {
    if (!ingredient.trim()) return;
    setIngredients([...ingredients, ingredient.trim()]);
    setIngredient('');
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleGenerateRecipes = () => {
    if (ingredients.length < 3) {
      toast({
        title: "Not enough ingredients",
        description: "Please add at least 3 ingredients to generate recipes",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      setIsGenerating(false);
      
      const mockRecipes = [
        {
          name: "Quick Vegetable Stir Fry",
          ingredients: ingredients.slice(0, 4),
          additionalIngredients: ["Soy sauce", "Garlic", "Ginger"],
          cookingTime: "15 mins",
          difficulty: "Easy",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300",
          instructions: [
            "Heat oil in a pan over medium-high heat.",
            "Add garlic and ginger, sauté for 30 seconds.",
            "Add vegetables, stir fry for 5-7 minutes until tender-crisp.",
            "Add soy sauce and other seasonings to taste.",
            "Serve hot over rice or noodles."
          ],
          nutrition: {
            calories: "280 kcal",
            protein: "8g",
            carbs: "32g",
            fat: "12g"
          }
        },
        {
          name: "Simple Frittata",
          ingredients: ingredients.slice(0, 3),
          additionalIngredients: ["Eggs", "Cheese", "Milk"],
          cookingTime: "25 mins",
          difficulty: "Medium",
          image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=300",
          instructions: [
            "Preheat oven to 350°F (175°C).",
            "Whisk eggs with milk, salt, and pepper.",
            "Sauté your ingredients in an oven-safe pan.",
            "Pour egg mixture over the ingredients.",
            "Cook on stovetop for 5 minutes, then transfer to oven for 15-20 minutes until set."
          ],
          nutrition: {
            calories: "320 kcal",
            protein: "18g",
            carbs: "12g",
            fat: "22g"
          }
        },
        {
          name: "One-Pot Soup",
          ingredients: ingredients.slice(1, 5),
          additionalIngredients: ["Vegetable stock", "Bay leaf", "Thyme"],
          cookingTime: "30 mins",
          difficulty: "Easy",
          image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=300",
          instructions: [
            "Heat oil in a large pot.",
            "Add any onions or garlic and sauté until fragrant.",
            "Add vegetables and sauté for a few minutes.",
            "Pour in vegetable stock to cover ingredients.",
            "Add herbs and simmer for 20-25 minutes until vegetables are tender.",
            "Season to taste and serve hot."
          ],
          nutrition: {
            calories: "220 kcal",
            protein: "6g",
            carbs: "28g",
            fat: "8g"
          }
        }
      ];
      
      setRecipes(mockRecipes);
      toast({
        title: "Recipes Generated",
        description: `Found ${mockRecipes.length} recipes using your ingredients`,
      });
    }, 2000);
  };

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      toast({
        title: "Camera activated",
        description: "Point your camera at an ingredient and take a photo to add it",
      });
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive"
      });
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to image data
        canvas.toBlob((blob) => {
          if (blob) {
            // Here you would normally send this blob to your API for ingredient recognition
            processImage(blob);
          }
        }, 'image/jpeg');
      }
    }
  };

  const processImage = (imageData: Blob) => {
    // In a real app, you'd send this image to your API for ingredient recognition
    // Here we'll simulate it
    toast({
      title: "Processing image",
      description: "Identifying ingredient from your photo...",
    });
    
    // Simulate API call delay
    setTimeout(() => {
      // Random vegetables for demo purposes
      const possibleIngredients = [
        "Tomato", "Onion", "Bell Pepper", "Potato", "Carrot", 
        "Broccoli", "Cucumber", "Lettuce", "Spinach", "Zucchini"
      ];
      
      const detectedIngredient = possibleIngredients[Math.floor(Math.random() * possibleIngredients.length)];
      
      setIngredients([...ingredients, detectedIngredient]);
      
      toast({
        title: "Ingredient Added",
        description: `Added ${detectedIngredient} to your ingredients list`,
      });
      
      stopCamera();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-arogya-primary hover:text-arogya-primary/80 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            What Can I Cook with My Fridge?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter the ingredients you have available, and we'll suggest delicious, healthy recipes
            you can make right now. No more wasted food or extra trips to the grocery store!
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-6">
              {showCamera ? (
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-white rounded-full"
                      onClick={stopCamera}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-4">Scan an Ingredient</h2>
                  
                  <div className="relative mb-4 rounded-lg overflow-hidden">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className="w-full h-64 object-cover"
                    />
                    
                    <div className="scanner-line animate-[scan_3s_ease-in-out_infinite]" 
                      style={{top: '50%', transform: 'translateY(-50%)'}}
                    />
                  </div>
                  
                  <canvas ref={canvasRef} className="hidden" />
                  
                  <Button 
                    className="w-full bg-arogya-primary hover:bg-arogya-primary/90"
                    onClick={captureImage}
                  >
                    Capture Ingredient
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4">Enter Your Available Ingredients</h2>
                  <div className="flex gap-3 mb-4">
                    <input
                      type="text"
                      placeholder="Add an ingredient (e.g., spinach, chicken, rice)"
                      className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-arogya-accent"
                      value={ingredient}
                      onChange={(e) => setIngredient(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button
                      onClick={handleAddIngredient}
                      className="bg-arogya-accent hover:bg-arogya-accent/90"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                    <Button
                      onClick={startCamera}
                      variant="outline"
                      className="bg-white"
                    >
                      <Camera className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {ingredients.length > 0 && (
                    <div className="mb-6">
                      <div className="text-sm font-medium mb-2">Your ingredients:</div>
                      <div className="flex flex-wrap gap-2">
                        {ingredients.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full"
                          >
                            <span>{item}</span>
                            <button
                              onClick={() => handleRemoveIngredient(index)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button
                    onClick={handleGenerateRecipes}
                    className="w-full bg-arogya-primary hover:bg-arogya-primary/90"
                    disabled={ingredients.length < 3 || isGenerating}
                  >
                    {isGenerating ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                        <span>Generating Recipes...</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Search className="mr-2 h-5 w-5" />
                        <span>Find Recipes</span>
                      </div>
                    )}
                  </Button>
                  
                  <div className="mt-3 text-center text-sm text-gray-500">
                    Add at least 3 ingredients to generate recipe ideas
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          {recipes.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-arogya-accent" />
                <span>Recipe Suggestions</span>
              </h2>
              
              {recipes.map((recipe, index) => (
                <Card key={index} className="mb-6 overflow-hidden">
                  <div className="bg-gradient-to-r from-arogya-primary/5 to-arogya-accent/5 p-6">
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                      <div className="md:w-1/3">
                        <div className="aspect-square rounded-lg overflow-hidden">
                          <img 
                            src={recipe.image} 
                            alt={recipe.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-xl font-semibold mb-1">{recipe.name}</h3>
                        <div className="flex flex-wrap gap-4 text-sm mb-4">
                          <div className="flex items-center">
                            <span className="font-medium">Cooking time:</span>
                            <span className="ml-1">{recipe.cookingTime}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium">Difficulty:</span>
                            <span className="ml-1">{recipe.difficulty}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Ingredients You Have:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {recipe.ingredients.map((ing: string, i: number) => (
                            <li key={i} className="text-green-700">{ing}</li>
                          ))}
                        </ul>
                        
                        <h4 className="font-medium mb-2 mt-4">Additional Ingredients Needed:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {recipe.additionalIngredients.map((ing: string, i: number) => (
                            <li key={i}>{ing}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Instructions:</h4>
                        <ol className="list-decimal list-inside text-gray-700 space-y-2">
                          {recipe.instructions.map((step: string, i: number) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-3 bg-white rounded-lg shadow-sm">
                      <h4 className="font-medium mb-2">Nutrition Information (per serving):</h4>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col items-center">
                          <span className="text-sm text-gray-500">Calories</span>
                          <span className="font-medium">{recipe.nutrition.calories}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-sm text-gray-500">Protein</span>
                          <span className="font-medium">{recipe.nutrition.protein}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-sm text-gray-500">Carbs</span>
                          <span className="font-medium">{recipe.nutrition.carbs}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-sm text-gray-500">Fat</span>
                          <span className="font-medium">{recipe.nutrition.fat}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button className="bg-arogya-accent hover:bg-arogya-accent/90">
                        View Full Recipe
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FridgeCooking;
