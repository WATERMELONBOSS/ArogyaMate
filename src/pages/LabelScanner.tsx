
import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Camera, Search, AlertCircle, CheckCircle, Info, HelpCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const LabelScanner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsScanning(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      setIsScanning(false);
      
      const mockResult = {
        productName: "Natural Orange Juice",
        overallRating: 6.8,
        nutritionalScore: 7.2,
        additiveScore: 8.5,
        ingredients: [
          {
            name: "Sugar",
            concern: "high",
            description: "Added sugar increases calorie content without nutritional benefit and may contribute to health issues.",
          },
          {
            name: "Natural Flavors",
            concern: "medium",
            description: "Umbrella term that can include various chemicals to enhance flavor. Limited transparency on specific components.",
          },
          {
            name: "Citric Acid (E330)",
            concern: "low",
            description: "Generally recognized as safe, used as a preservative and for tartness.",
          },
          {
            name: "Ascorbic Acid (Vitamin C)",
            concern: "positive",
            description: "Essential vitamin with antioxidant properties.",
          },
        ],
        nutritionalInfo: {
          calories: "120 kcal per 240ml",
          sugar: "28g (high)",
          fat: "0g",
          protein: "1g",
          fiber: "0.5g"
        },
        additives: [
          {
            code: "E330",
            name: "Citric Acid",
            purpose: "Acidity regulator, antioxidant",
            risk: "Low risk for most people"
          }
        ],
        healthWarnings: [
          "High sugar content",
          "Low fiber content",
        ],
        betterAlternatives: [
          "100% fresh-squeezed orange juice",
          "Water with fresh orange slices",
          "Whole oranges (more fiber, less sugar impact)"
        ]
      };
      
      setScanResults(mockResult);
      
      toast({
        title: "Analysis Complete",
        description: "Nutritional analysis of your product is ready.",
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
        description: "Point your camera at the product label and tap to scan",
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
            // Here you would normally send this blob to your API
            processImage(blob);
          }
        }, 'image/jpeg');
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const processImage = (imageData: Blob) => {
    // In a real app, you'd send this image to your API for processing
    // Here we'll simulate it
    setIsScanning(true);
    stopCamera();
    
    toast({
      title: "Processing image",
      description: "Analyzing food label from your photo...",
    });
    
    // Simulate API call delay
    setTimeout(() => {
      setIsScanning(false);
      
      const mockResult = {
        productName: "Fruit Yogurt",
        overallRating: 5.9,
        nutritionalScore: 6.2,
        additiveScore: 7.5,
        ingredients: [
          {
            name: "Added Sugar",
            concern: "high",
            description: "Contains 15g of added sugar per serving, which is 30% of the daily recommended limit.",
          },
          {
            name: "Artificial Colors (Red 40)",
            concern: "medium",
            description: "Synthetic food dye that may cause hyperactivity in some children.",
          },
          {
            name: "Carrageenan",
            concern: "medium",
            description: "Thickening agent derived from seaweed that may cause digestive irritation in some individuals.",
          },
          {
            name: "Live Active Cultures",
            concern: "positive",
            description: "Beneficial probiotics that support gut health and digestion.",
          },
        ],
        nutritionalInfo: {
          calories: "180 kcal per serving",
          sugar: "18g (high)",
          fat: "3.5g",
          protein: "5g",
          fiber: "0g"
        },
        additives: [
          {
            code: "Red 40",
            name: "Allura Red AC",
            purpose: "Artificial color",
            risk: "Moderate concern - may cause hyperactivity in sensitive individuals"
          },
          {
            code: "E407",
            name: "Carrageenan",
            purpose: "Thickener, stabilizer",
            risk: "Moderate concern - may cause digestive inflammation in some individuals"
          }
        ],
        healthWarnings: [
          "High sugar content",
          "Contains artificial colors",
          "Zero fiber content"
        ],
        betterAlternatives: [
          "Plain yogurt with fresh fruit",
          "Greek yogurt with honey",
          "Homemade fruit smoothies with yogurt"
        ]
      };
      
      setScanResults(mockResult);
      
      toast({
        title: "Scan Complete",
        description: "Nutritional analysis of your product is ready.",
      });
    }, 3000);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-500";
    if (rating >= 5) return "text-amber-500";
    return "text-red-500";
  };

  const getConcernBadge = (concern: string) => {
    switch (concern) {
      case "high":
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">High Concern</span>;
      case "medium":
        return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-medium">Medium Concern</span>;
      case "low":
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">Low Concern</span>;
      case "positive":
        return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">Beneficial</span>;
      default:
        return null;
    }
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
            Label & Additive Scanner
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Decode food labels and identify potentially harmful additives in packaged foods.
            Make informed decisions about what you're really eating.
          </p>
        </div>
        
        <div className="max-w-md mx-auto mb-8">
          <Card>
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
                    Capture & Analyze
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSearch}>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label htmlFor="ingredients" className="mb-2 font-medium">Enter product ingredients</label>
                      <textarea 
                        id="ingredients"
                        className="min-h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-arogya-primary"
                        placeholder="Paste ingredient list here or take a photo of the label"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      ></textarea>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        type="submit"
                        className="flex-1 bg-arogya-primary hover:bg-arogya-primary/90"
                        disabled={isScanning}
                      >
                        {isScanning ? (
                          <div className="flex items-center">
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                            <span>Analyzing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Search className="mr-2 h-4 w-4" />
                            <span>Analyze Label</span>
                          </div>
                        )}
                      </Button>
                      
                      <div className="flex gap-2">
                        <Button 
                          type="button"
                          variant="outline"
                          className="bg-white"
                          onClick={startCamera}
                        >
                          <Camera className="h-5 w-5" />
                        </Button>
                        
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                        
                        <Button 
                          type="button"
                          variant="outline"
                          className="bg-white"
                          onClick={triggerFileInput}
                        >
                          <Search className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
        
        {isScanning && (
          <div className="max-w-md mx-auto text-center py-8">
            <div className="mb-4">Analyzing ingredients...</div>
            <Progress value={45} className="mx-auto" />
          </div>
        )}
        
        {scanResults && (
          <div className="max-w-4xl mx-auto">
            <Card className="mb-6 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
                <h2 className="text-2xl font-semibold mb-2">{scanResults.productName}</h2>
                
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="text-xl font-bold mb-1 flex items-center gap-1">
                      <span className={getRatingColor(scanResults.overallRating)}>
                        {scanResults.overallRating}/10
                      </span>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-sm text-gray-500">Overall Rating</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="text-xl font-bold mb-1 flex items-center gap-1">
                      <span className={getRatingColor(scanResults.nutritionalScore)}>
                        {scanResults.nutritionalScore}/10
                      </span>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-sm text-gray-500">Nutrition Score</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="text-xl font-bold mb-1 flex items-center gap-1">
                      <span className={getRatingColor(scanResults.additiveScore)}>
                        {scanResults.additiveScore}/10
                      </span>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-sm text-gray-500">Additive Score</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-1">
                      <Info className="h-5 w-5 text-arogya-primary" />
                      Nutritional Information
                    </h3>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <ul className="space-y-2">
                        {Object.entries(scanResults.nutritionalInfo).map(([key, value], index) => (
                          <li key={index} className="flex justify-between">
                            <span className="capitalize">{key}:</span>
                            <span className="font-medium">{value as string}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-1">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      Health Warnings
                    </h3>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <ul className="space-y-2">
                        {scanResults.healthWarnings.map((warning: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-amber-500 mt-1">•</span>
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <h3 className="text-xl font-semibold mb-4">Ingredient Analysis</h3>
            <div className="space-y-4 mb-8">
              {scanResults.ingredients.map((ingredient: any, index: number) => (
                <Card key={index} className="border-l-4 border-l-gray-200">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{ingredient.name}</h4>
                        {getConcernBadge(ingredient.concern)}
                      </div>
                      <Button variant="ghost" size="sm" className="text-arogya-primary">
                        Learn more
                      </Button>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{ingredient.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {scanResults.additives.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Food Additives</h3>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-left text-gray-600">
                          <tr>
                            <th className="px-4 py-3 font-medium">Code</th>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Purpose</th>
                            <th className="px-4 py-3 font-medium">Risk Level</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {scanResults.additives.map((additive: any, index: number) => (
                            <tr key={index}>
                              <td className="px-4 py-4 font-medium">{additive.code}</td>
                              <td className="px-4 py-4">{additive.name}</td>
                              <td className="px-4 py-4 text-gray-600">{additive.purpose}</td>
                              <td className="px-4 py-4">{additive.risk}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            <Card className="mb-8 bg-green-50 border-green-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold">Healthier Alternatives</h3>
                </div>
                <ul className="space-y-2">
                  {scanResults.betterAlternatives.map((alternative: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{alternative}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <Button className="bg-arogya-primary hover:bg-arogya-primary/90">
                Save Analysis to Health Profile
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default LabelScanner;
