
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ArrowLeft,
  Stethoscope,
  Thermometer,
  LucideIcon,
  Utensils,
  Droplets,
  Info,
  Check,
  X,
  BarChart,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SicknessOption {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface RecommendedFood {
  name: string;
  description: string;
  mealTime: string;
  benefits: string[];
  avoid?: string[];
}

const SicknessMode = () => {
  const [age, setAge] = useState<string>('');
  const [selectedSickness, setSelectedSickness] = useState<string | null>(null);
  const [severity, setSeverity] = useState<string>('moderate');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommendedFoods, setRecommendedFoods] = useState<RecommendedFood[]>([]);

  // Common sickness options
  const sicknessOptions: SicknessOption[] = [
    { 
      id: 'fever', 
      name: 'Fever', 
      description: 'High body temperature, weakness, and body aches',
      icon: Thermometer,
      color: 'text-red-500',
    },
    { 
      id: 'cold', 
      name: 'Common Cold', 
      description: 'Runny nose, congestion, sore throat, and sneezing',
      icon: Droplets,
      color: 'text-blue-500',
    },
    { 
      id: 'stomach', 
      name: 'Stomach Upset', 
      description: 'Nausea, vomiting, diarrhea, and abdominal pain',
      icon: Utensils,
      color: 'text-yellow-500',
    },
    { 
      id: 'flu', 
      name: 'Influenza', 
      description: 'Fever, body aches, fatigue, and respiratory symptoms',
      icon: Thermometer,
      color: 'text-orange-500',
    },
    { 
      id: 'throat', 
      name: 'Sore Throat', 
      description: 'Pain and irritation in the throat, especially when swallowing',
      icon: Info,
      color: 'text-purple-500',
    }
  ];

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!age || !selectedSickness) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to get personalized recommendations
    setTimeout(() => {
      const recommendations = generateRecommendations(selectedSickness, parseInt(age), severity);
      setRecommendedFoods(recommendations);
      setIsLoading(false);
      setIsSubmitted(true);
      
      toast({
        title: "Recommendations Ready",
        description: "Your personalized nutrition recommendations have been generated.",
      });
    }, 2000);
  };

  // Generate mock recommendations based on sickness type and other factors
  const generateRecommendations = (sicknessType: string, age: number, severity: string): RecommendedFood[] => {
    // This would be replaced with actual API data in production
    const recommendationsMap: Record<string, RecommendedFood[]> = {
      'fever': [
        {
          name: "Light Rice Porridge (Kanji)",
          description: "Easy to digest and provides needed carbohydrates for energy",
          mealTime: "Breakfast/Dinner",
          benefits: ["Easy on the digestive system", "Provides necessary calories", "Hydrating"],
          avoid: ["Spicy seasoning", "Heavy oils"]
        },
        {
          name: "Clear Vegetable Soup",
          description: "Hydrating with essential vitamins and minerals",
          mealTime: "Lunch",
          benefits: ["Provides hydration", "Contains essential nutrients", "Easy to consume"],
          avoid: ["Cream-based soups", "Excessive salt"]
        },
        {
          name: "Fresh Coconut Water",
          description: "Natural electrolyte replenishment",
          mealTime: "Throughout the day",
          benefits: ["Replenishes electrolytes", "Cooling effect", "Natural hydration"],
        },
        {
          name: "Honey Ginger Tea",
          description: "Soothes throat and may help reduce fever",
          mealTime: "Morning/Evening",
          benefits: ["Anti-inflammatory properties", "Soothes throat", "May help reduce fever"],
        }
      ],
      'cold': [
        {
          name: "Hot Turmeric Milk",
          description: "Anti-inflammatory properties help with congestion",
          mealTime: "Before bed",
          benefits: ["Anti-inflammatory", "Soothes throat", "May help improve sleep"],
        },
        {
          name: "Ginger-Garlic Soup",
          description: "Helps clear nasal passages and boost immunity",
          mealTime: "Lunch/Dinner",
          benefits: ["Clears congestion", "Antimicrobial properties", "Boosts immunity"],
        },
        {
          name: "Citrus Fruits",
          description: "Rich in Vitamin C to boost immunity",
          mealTime: "Mid-morning snack",
          benefits: ["High in Vitamin C", "Supports immune function", "Natural energy"],
        },
        {
          name: "Tulsi (Holy Basil) Tea with Honey",
          description: "Traditional remedy for cold symptoms",
          mealTime: "Throughout the day",
          benefits: ["Soothes throat irritation", "May reduce congestion", "Calming effects"],
          avoid: ["Adding dairy which can increase mucus"]
        }
      ],
      'stomach': [
        {
          name: "Plain Rice with Yogurt",
          description: "Gentle on the stomach with probiotics",
          mealTime: "Lunch/Dinner",
          benefits: ["Probiotics for gut health", "Easily digestible", "Binding effect for diarrhea"],
          avoid: ["Spices and oils"]
        },
        {
          name: "Banana",
          description: "Easy to digest and helps bind stools",
          mealTime: "Breakfast/Snack",
          benefits: ["Contains pectin", "Potassium replenishment", "Gentle on the stomach"],
        },
        {
          name: "Plain Toast",
          description: "Simple carbohydrates that are easy to digest",
          mealTime: "Breakfast",
          benefits: ["Easily digestible", "Absorbs stomach acid", "Provides some energy"],
          avoid: ["Butter or jam if experiencing nausea"]
        },
        {
          name: "Cumin Seed Water",
          description: "Traditional remedy for indigestion",
          mealTime: "After meals",
          benefits: ["Aids digestion", "May reduce bloating", "Calms stomach spasms"],
        }
      ],
      'flu': [
        {
          name: "Chicken or Vegetable Clear Soup",
          description: "Provides hydration and nutrition",
          mealTime: "Lunch/Dinner",
          benefits: ["Easily digestible protein", "Warm and soothing", "Hydrating"],
        },
        {
          name: "Masala Chai (light on spices)",
          description: "Warming and soothing for body aches",
          mealTime: "Morning/Evening",
          benefits: ["Anti-inflammatory spices", "Warming effect", "Soothing for throat"],
          avoid: ["Too much caffeine", "Heavy milk"]
        },
        {
          name: "Khichdi (Rice and Lentils)",
          description: "Complete protein that's easy to digest",
          mealTime: "Lunch/Dinner",
          benefits: ["Balanced nutrition", "Easy to digest", "Customizable consistency"],
          avoid: ["Heavy spices if throat is sore"]
        },
        {
          name: "Fresh Orange Juice",
          description: "Vitamin C boost for immunity",
          mealTime: "Morning",
          benefits: ["Vitamin C", "Hydrating", "Natural sugars for energy"],
        }
      ],
      'throat': [
        {
          name: "Warm Salt Water Gargle",
          description: "Reduces inflammation and kills bacteria",
          mealTime: "Throughout the day (not for consumption)",
          benefits: ["Reduces inflammation", "May kill bacteria", "Temporary pain relief"],
        },
        {
          name: "Honey Ginger Tea",
          description: "Soothes throat and reduces irritation",
          mealTime: "Throughout the day",
          benefits: ["Coating effect on throat", "Anti-inflammatory", "Antibacterial properties"],
        },
        {
          name: "Soft Cooked Eggs",
          description: "Easy to swallow protein source",
          mealTime: "Breakfast",
          benefits: ["Easy to swallow", "Good protein source", "Gentle on throat"],
        },
        {
          name: "Ice Cream or Cold Yogurt",
          description: "Numbing effect for severe pain",
          mealTime: "Dessert/Snack",
          benefits: ["Numbing effect on throat", "Soothing", "Calcium source"],
          avoid: ["Very cold items if it worsens pain"]
        }
      ]
    };
    
    // Return the recommendations for the selected sickness
    return recommendationsMap[sicknessType] || [];
  };

  // Reset form and recommendations
  const handleReset = () => {
    setAge('');
    setSelectedSickness(null);
    setSeverity('moderate');
    setIsSubmitted(false);
    setRecommendedFoods([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-nutri-purple hover:text-nutri-purple/80 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-blue-100 rounded-full mb-4">
            <Stethoscope className="h-8 w-8 text-blue-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Sickness Mode</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized nutrition recommendations to help you recover faster. Our AI assistant suggests foods based on your condition and needs.
          </p>
        </div>
        
        {!isSubmitted ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Enter Your Details</CardTitle>
              <CardDescription>
                We'll use this information to provide personalized nutrition recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="age">
                    Age
                  </label>
                  <Input 
                    id="age"
                    type="number" 
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="1"
                    max="120"
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    What are you suffering from?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sicknessOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <div
                          key={option.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedSickness === option.id
                              ? "border-2 border-blue-500 bg-blue-50"
                              : "hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedSickness(option.id)}
                        >
                          <div className="flex items-start">
                            <div className={`mr-3 h-10 w-10 rounded-full bg-white flex items-center justify-center border ${option.color}`}>
                              <Icon className={`h-5 w-5 ${option.color}`} />
                            </div>
                            <div>
                              <h3 className="font-medium">{option.name}</h3>
                              <p className="text-xs text-gray-500">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Severity
                  </label>
                  <Select 
                    value={severity} 
                    onValueChange={setSeverity}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2">Generating Recommendations</span>
                      <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    </>
                  ) : (
                    "Get Nutrition Recommendations"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Personalized Nutrition Plan</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleReset}
                  >
                    Start Over
                  </Button>
                </CardTitle>
                <CardDescription>
                  Based on your {selectedSickness && sicknessOptions.find(s => s.id === selectedSickness)?.name.toLowerCase()} with {severity} severity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      These recommendations are generated based on common nutritional advice for your condition. Always consult your healthcare provider before making significant dietary changes, especially if you have allergies or other health conditions.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {recommendedFoods.map((food, index) => (
                    <div 
                      key={index}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="bg-gray-50 p-4 border-b">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{food.name}</h3>
                            <p className="text-sm text-gray-600">{food.description}</p>
                          </div>
                          <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {food.mealTime}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-medium mb-2 text-gray-700">Benefits:</h4>
                        <ul className="space-y-1 mb-3">
                          {food.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {food.avoid && food.avoid.length > 0 && (
                          <>
                            <h4 className="text-sm font-medium mb-2 text-gray-700">Avoid:</h4>
                            <ul className="space-y-1">
                              {food.avoid.map((item, i) => (
                                <li key={i} className="flex items-start">
                                  <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-blue-500" />
                    General Recommendations
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-blue-500 mr-2" />
                      <p className="text-sm">Stay well-hydrated with water, herbal teas, and clear broths</p>
                    </div>
                    
                    <div className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-blue-500 mr-2" />
                      <p className="text-sm">Eat smaller, more frequent meals to reduce digestive strain</p>
                    </div>
                    
                    <div className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-blue-500 mr-2" />
                      <p className="text-sm">Rest adequately and allow your body to heal</p>
                    </div>
                    
                    <div className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-blue-500 mr-2" />
                      <p className="text-sm">Monitor your symptoms and seek medical advice if they worsen</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Daily Nutrition Plan</CardTitle>
                <CardDescription>
                  A suggested meal plan based on your condition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">MORNING</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Breakfast (8:00 AM)</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {selectedSickness === 'fever' && 'Light rice porridge with a small piece of toast'}
                        {selectedSickness === 'cold' && 'Warm oatmeal with honey and a small portion of citrus fruits'}
                        {selectedSickness === 'stomach' && 'Plain toast with a ripe banana'}
                        {selectedSickness === 'flu' && 'Warm oatmeal with honey and a small glass of fresh orange juice'}
                        {selectedSickness === 'throat' && 'Soft-cooked eggs with warm honey ginger tea'}
                      </p>
                      <p className="text-xs text-blue-600">Follow with room temperature water</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">AFTERNOON</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Lunch (12:30 PM)</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {selectedSickness === 'fever' && 'Clear vegetable soup with soft-cooked rice'}
                        {selectedSickness === 'cold' && 'Ginger-garlic soup with a small portion of steamed vegetables'}
                        {selectedSickness === 'stomach' && 'Plain rice with yogurt (room temperature)'}
                        {selectedSickness === 'flu' && 'Khichdi (rice and lentils) with minimal spices'}
                        {selectedSickness === 'throat' && 'Soft well-cooked pasta in light broth'}
                      </p>
                      <p className="text-xs text-blue-600">Hydrate with coconut water or herbal tea</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">EVENING</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Dinner (7:00 PM)</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {selectedSickness === 'fever' && 'Light rice porridge with steamed vegetables'}
                        {selectedSickness === 'cold' && 'Light vegetable soup with a small portion of toast'}
                        {selectedSickness === 'stomach' && 'Plain khichdi (rice and lentils) with minimal spices'}
                        {selectedSickness === 'flu' && 'Clear chicken or vegetable soup with a small portion of plain rice'}
                        {selectedSickness === 'throat' && 'Mashed potatoes or soft cooked rice with yogurt'}
                      </p>
                      <p className="text-xs text-blue-600">End with warm milk with turmeric before bed (except for stomach issues)</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
                  <h4 className="font-semibold mb-2">Personal AI Assistant Tip:</h4>
                  <p className="text-gray-700">
                    {selectedSickness === 'fever' && 'While recovering from fever, focus on staying hydrated as your body needs extra fluids to compensate for the higher body temperature. Eat easily digestible foods that provide energy without putting strain on your digestive system.'}
                    {selectedSickness === 'cold' && 'With a cold, warm fluids can help soothe your throat and loosen congestion. Vitamin C-rich foods and zinc may help support your immune system, but avoid dairy products which can thicken mucus.'}
                    {selectedSickness === 'stomach' && 'For stomach upset, follow the BRAT diet (Bananas, Rice, Applesauce, Toast) initially. Gradually reintroduce other foods as you feel better, and stay hydrated with small sips of water or electrolyte solutions.'}
                    {selectedSickness === 'flu' && 'When dealing with the flu, your body needs extra rest and hydration. Anti-inflammatory foods can help reduce symptoms while supporting your immune system. Avoid caffeine and alcohol which can dehydrate you further.'}
                    {selectedSickness === 'throat' && 'For a sore throat, soft, easy-to-swallow foods are best. Cold foods like ice cream can temporarily numb pain, while warm foods like soups provide comfort. Avoid spicy, acidic, or rough-textured foods that can irritate your throat further.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SicknessMode;
