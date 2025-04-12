
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dashboard from '../components/Dashboard';
import FoodScanner from '../components/FoodScanner';
import NutrientAnalyzer from '../components/NutrientAnalyzer';
import FoodSuggestions from '../components/FoodSuggestions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Scan, 
  CalendarCheck, 
  Apple, 
  Sparkles, 
  ChefHat, 
  Baby, 
  Stethoscope, 
  MoveRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "Feature Selected",
      description: `You selected the ${featureName} feature`
    });
  };

  const navigateToFeature = (path: string | null, fallbackName: string) => {
    if (path) {
      navigate(path);
    } else {
      toast({
        title: "Coming Soon",
        description: `The ${fallbackName} feature will be available in the next update.`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Make <span className="gradient-text">Smarter</span> Food Choices with AI Nutrition
              </h1>
              <p className="text-lg text-gray-600">
                Your personal AI nutrition assistant that analyzes food, tracks macros, and helps achieve your health goals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-nutri-purple hover:bg-nutri-purple/90 px-8 py-6 text-lg">
                  Get Started
                </Button>
                <Button variant="outline" className="px-8 py-6 text-lg">
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full bg-gray-200 border-2 border-white" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium">Join 10,000+ users</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="text-nutri-orange">★</span>
                    ))}
                    <span className="text-xs ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -left-6 h-32 w-32 bg-nutri-green/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 h-40 w-40 bg-nutri-purple/10 rounded-full blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm">
                <FoodScanner />
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Features Section */}
        <section className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Smart Features for Better Health</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              NutriScan helps you make healthier food choices with AI-powered tools designed for Indian diets and lifestyles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-nutri-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Scan className="h-6 w-6 text-nutri-purple" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Food & Label Scanner</h3>
                <p className="text-gray-600 text-sm">
                  Analyze any food or nutrition label with one scan. Get detailed nutritional breakdown and personalized health insights.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-nutri-green/10 rounded-full flex items-center justify-center mb-4">
                  <CalendarCheck className="h-6 w-6 text-nutri-green" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Custom Nutrition Goals</h3>
                <p className="text-gray-600 text-sm">
                  Get personalized nutrition plans based on your body dimensions, preferences, allergies, and conditions like PCOS.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-nutri-orange/10 rounded-full flex items-center justify-center mb-4">
                  <Apple className="h-6 w-6 text-nutri-orange" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Craving Management</h3>
                <p className="text-gray-600 text-sm">
                  Midnight cravings? The app helps control portions and gradually adjust habits while still satisfying your cravings.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12">
            <Tabs defaultValue="dashboard">
              <div className="flex justify-center mb-6">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="analyze">Analyze</TabsTrigger>
                  <TabsTrigger value="suggest">Suggestions</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="dashboard" className="mt-0">
                <Dashboard />
              </TabsContent>
              
              <TabsContent value="analyze" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <NutrientAnalyzer />
                  
                  <Card className="card-hover">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="h-12 w-12 bg-nutri-orange/10 rounded-full flex items-center justify-center mb-4">
                        <Sparkles className="h-6 w-6 text-nutri-orange" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Premium Wedding Plans</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Reach your ideal weight before your wedding day with personalized nutrition and fitness plans.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 mt-auto">
                        <ul className="space-y-2">
                          <li className="flex items-center text-sm">
                            <span className="h-2 w-2 bg-nutri-purple rounded-full mr-2"></span>
                            <span>Personalized timeline plans</span>
                          </li>
                          <li className="flex items-center text-sm">
                            <span className="h-2 w-2 bg-nutri-purple rounded-full mr-2"></span>
                            <span>Weekly progress tracking</span>
                          </li>
                          <li className="flex items-center text-sm">
                            <span className="h-2 w-2 bg-nutri-purple rounded-full mr-2"></span>
                            <span>Expert nutritionist consults</span>
                          </li>
                        </ul>
                      </div>
                      
                      <Button className="mt-4 bg-gradient-to-r from-nutri-purple to-nutri-green hover:opacity-90 text-white">
                        Explore Wedding Plans
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="suggest" className="mt-0">
                <FoodSuggestions />
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Special Modes Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Special Nutrition Modes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized features for unique situations and health needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-nutri-green/10 rounded-full flex items-center justify-center mb-4">
                  <ChefHat className="h-6 w-6 text-nutri-green" />
                </div>
                <h3 className="text-lg font-semibold mb-2">What's in My Fridge?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Input available ingredients and discover healthy recipe options instantly.
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigateToFeature(null, "What's in My Fridge")}>
                  Try It
                </Button>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-pink-500/10 rounded-full flex items-center justify-center mb-4">
                  <Baby className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Pregnancy & Periods</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Special guidance for pregnancy cravings and menstrual nutrition needs.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigateToFeature("/period-pregnancy-mediator", "Pregnancy & Periods")}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                  <Stethoscope className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Sickness Mode</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get food recommendations when dealing with fever, digestive issues, or other illnesses.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigateToFeature("/sickness-mode", "Sickness Mode")}
                >
                  Activate
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-nutri-purple to-nutri-green p-8 md:p-12 rounded-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your nutrition journey?</h2>
                <p className="text-white/80 max-w-lg">
                  Download NutriScan Smart now and start making healthier food choices that align with your goals.
                </p>
              </div>
              
              <Button className="bg-white text-nutri-purple hover:bg-white/90 px-8 py-6 flex items-center text-lg group">
                <span>Get Started</span>
                <MoveRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
