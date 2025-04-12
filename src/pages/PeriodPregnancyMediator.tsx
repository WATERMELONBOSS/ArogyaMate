
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Heart, Baby } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const PeriodPregnancyMediator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [currentCraving, setCurrentCraving] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    console.info(`Fetching alternatives for: ${searchQuery}`);
    setIsSearching(true);
    setCurrentCraving(searchQuery);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      setShowAlternatives(true);
    }, 1500);
  };
  
  const handleSaveRecommendation = (item: string) => {
    toast({
      title: "Saved to favorites",
      description: `${item} has been added to your favorites`,
    });
  };
  
  // Period-specific food categories with real images
  const periodFoods = [
    {
      category: "Iron-Rich Foods",
      description: "Combat fatigue and replenish iron lost during menstruation",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
      items: ["Spinach", "Lentils", "Chickpeas", "Dark Chocolate", "Quinoa"]
    },
    {
      category: "Anti-Inflammatory Foods",
      description: "Help reduce inflammation and cramps",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554",
      items: ["Turmeric", "Ginger", "Berries", "Fatty Fish", "Nuts"]
    },
    {
      category: "Magnesium-Rich Foods",
      description: "Help with mood swings and reduce water retention",
      image: "https://images.unsplash.com/photo-1546554658-7c0cd626a084",
      items: ["Avocados", "Dark Chocolate", "Bananas", "Nuts", "Seeds"]
    }
  ];
  
  // Pregnancy-specific food categories with real images
  const pregnancyFoods = [
    {
      category: "Folate-Rich Foods",
      description: "Essential for early development and preventing birth defects",
      image: "https://images.unsplash.com/photo-1618287277800-26c229d860d1",
      items: ["Spinach", "Asparagus", "Broccoli", "Lentils", "Oranges"]
    },
    {
      category: "Calcium Sources",
      description: "Supports bone development and maternal bone health",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
      items: ["Yogurt", "Milk", "Paneer", "Ragi", "Almonds"]
    },
    {
      category: "Healthy Protein Sources",
      description: "Essential for baby's growth and development",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae",
      items: ["Eggs", "Tofu", "Lentils", "Fish", "Chicken"]
    }
  ];
  
  // Craving alternatives with real images
  const cravingAlternatives = {
    sweet: [
      {
        original: "Ice Cream",
        alternative: "Frozen Yogurt with Fresh Fruits",
        benefits: "Lower in sugar, higher in protein and probiotics",
        image: "https://images.unsplash.com/photo-1488900128323-21503983a07e"
      },
      {
        original: "Chocolate Bars",
        alternative: "Dark Chocolate with Nuts",
        benefits: "Higher in antioxidants, healthy fats from nuts",
        image: "https://images.unsplash.com/photo-1606312619070-d48b4c652212"
      }
    ],
    spicy: [
      {
        original: "Spicy Chips",
        alternative: "Baked Sweet Potato Sticks with Chaat Masala",
        benefits: "More nutrients, less processed ingredients",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
      },
      {
        original: "Instant Noodles",
        alternative: "Masala Upma or Poha",
        benefits: "Balanced nutrition, less sodium, whole grains",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8"
      }
    ],
    sour: [
      {
        original: "Sour Candies",
        alternative: "Amla or Tamarind with Jaggery",
        benefits: "Natural sourness with vitamins and minerals",
        image: "https://images.unsplash.com/photo-1574856344991-aaa4022d1a86"
      },
      {
        original: "Pickles",
        alternative: "Nimbu ka Achaar or Carrot Pickle",
        benefits: "Less sodium, healthier fats if homemade",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
      }
    ]
  };
  
  const getCravingAlternatives = (query: string) => {
    // Simple logic to determine category based on query
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('sweet') || lowerQuery.includes('chocolate') || lowerQuery.includes('sugar')) {
      return cravingAlternatives.sweet;
    } else if (lowerQuery.includes('spicy') || lowerQuery.includes('hot') || lowerQuery.includes('chili')) {
      return cravingAlternatives.spicy;
    } else if (lowerQuery.includes('sour') || lowerQuery.includes('tangy') || lowerQuery.includes('acidic')) {
      return cravingAlternatives.sour;
    } else {
      // Default to show all types
      return [...cravingAlternatives.sweet, ...cravingAlternatives.spicy, ...cravingAlternatives.sour];
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-arogya-primary/10 to-arogya-accent/10 rounded-xl p-6 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Period & Pregnancy Nutrition Guide</h1>
            <p className="text-gray-700">
              Find healthier alternatives to common cravings during periods and pregnancy, specially curated to provide the nutrients you need most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Craving Search */}
            <Card className="border-arogya-primary/20">
              <CardHeader>
                <CardTitle className="text-xl text-arogya-primary">Find Healthier Alternatives</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="What are you craving? (e.g., 'spicy chips', 'chocolate')"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isSearching} className="bg-arogya-primary hover:bg-arogya-primary/90">
                      {isSearching ? 'Searching...' : <Search className="h-4 w-4" />}
                    </Button>
                  </div>
                </form>
                
                {showAlternatives && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Alternatives for "{currentCraving}"</h3>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      {getCravingAlternatives(currentCraving).map((item, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="h-40 relative">
                            <img 
                              src={item.image} 
                              alt={item.alternative} 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-3 left-3 right-3">
                              <div className="text-white font-medium">{item.original}</div>
                              <div className="flex justify-between items-center">
                                <div className="text-white/80 text-sm">Try instead:</div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-white hover:bg-white/20" 
                                  onClick={() => handleSaveRecommendation(item.alternative)}
                                >
                                  <Heart className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium text-arogya-primary">{item.alternative}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.benefits}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Period and Pregnancy Tabs */}
            <Tabs defaultValue="period" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="period" className="data-[state=active]:bg-arogya-primary data-[state=active]:text-white">
                  <Heart className="h-4 w-4 mr-2" /> Period Nutrition
                </TabsTrigger>
                <TabsTrigger value="pregnancy" className="data-[state=active]:bg-arogya-accent data-[state=active]:text-white">
                  <Baby className="h-4 w-4 mr-2" /> Pregnancy Nutrition
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="period" className="mt-0">
                <div className="space-y-6">
                  {periodFoods.map((category, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3 h-40 md:h-auto relative">
                          <img 
                            src={category.image} 
                            alt={category.category} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="md:w-2/3 p-4">
                          <h3 className="text-lg font-semibold mb-1">{category.category}</h3>
                          <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {category.items.map((item, itemIndex) => (
                              <span 
                                key={itemIndex} 
                                className="px-3 py-1 bg-arogya-primary/10 text-arogya-primary rounded-full text-sm"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="pregnancy" className="mt-0">
                <div className="space-y-6">
                  {pregnancyFoods.map((category, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3 h-40 md:h-auto relative">
                          <img 
                            src={category.image} 
                            alt={category.category} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="md:w-2/3 p-4">
                          <h3 className="text-lg font-semibold mb-1">{category.category}</h3>
                          <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {category.items.map((item, itemIndex) => (
                              <span 
                                key={itemIndex} 
                                className="px-3 py-1 bg-arogya-accent/10 text-arogya-accent rounded-full text-sm"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PeriodPregnancyMediator;
