
import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search, Camera, AlertCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const CosmeticScanner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any[]>([]);
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
      const mockResults = [
        {
          name: "Sodium Lauryl Sulfate",
          rating: "Moderate Concern",
          description: "Common foaming agent that can cause skin irritation and dryness in some individuals.",
          alternatives: ["Sodium Cocoyl Isethionate", "Cocamidopropyl Betaine"]
        },
        {
          name: "Parabens (Methylparaben, Propylparaben)",
          rating: "High Concern",
          description: "Preservatives that may disrupt hormone function and potentially increase cancer risk.",
          alternatives: ["Phenoxyethanol", "Sodium Benzoate", "Potassium Sorbate"]
        },
        {
          name: "Fragrance/Perfume",
          rating: "High Concern",
          description: "Undisclosed mixture of scenting chemicals, common allergen and irritant.",
          alternatives: ["Products labeled 'Fragrance-Free'", "Essential oils (for those not sensitive)"]
        }
      ];
      
      setScanResults(mockResults);
      toast({
        title: "Ingredients Analyzed",
        description: "Found 3 ingredients of concern in this product",
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
        description: "Point your camera at the product ingredient list and tap to scan",
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
      description: "Analyzing ingredients from your photo...",
    });
    
    // Simulate API call delay
    setTimeout(() => {
      setIsScanning(false);
      const mockResults = [
        {
          name: "Titanium Dioxide",
          rating: "Moderate Concern",
          description: "Common sunscreen ingredient and color additive that may have potential health concerns when inhaled.",
          alternatives: ["Zinc Oxide", "Iron Oxides"]
        },
        {
          name: "Butylated Hydroxyanisole (BHA)",
          rating: "High Concern",
          description: "Preservative that may disrupt endocrine function and potentially has carcinogenic properties.",
          alternatives: ["Tocopherol (Vitamin E)", "Rosemary Extract"]
        },
        {
          name: "Talc",
          rating: "Moderate Concern",
          description: "Powder used in many cosmetics that may be contaminated with asbestos in some sources.",
          alternatives: ["Corn Starch", "Rice Powder", "Arrowroot Powder"]
        }
      ];
      
      setScanResults(mockResults);
      toast({
        title: "Scan Complete",
        description: "Found 3 ingredients of concern in this product",
      });
    }, 3000);
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
            Cosmetic & Personal Care Scanner
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Analyze ingredients in your personal care products for potential allergens and harmful chemicals. 
            Get healthier alternatives for products you use daily.
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
                            <span>Analyze Ingredients</span>
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
        
        {scanResults.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Ingredient Analysis Results</h2>
            
            {scanResults.map((ingredient, index) => (
              <Card key={index} className="mb-4 border-l-4 border-l-amber-500">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className={`
                      h-10 w-10 rounded-full flex items-center justify-center mr-4
                      ${ingredient.rating.includes('High') ? 'bg-red-100 text-red-500' : 'bg-amber-100 text-amber-500'}
                    `}>
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{ingredient.name}</h3>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 
                        ${ingredient.rating.includes('High') ? 'bg-red-100 text-red-500' : 'bg-amber-100 text-amber-500'}`}
                      >
                        {ingredient.rating}
                      </div>
                      <p className="text-gray-700 mb-3">{ingredient.description}</p>
                      
                      {ingredient.alternatives.length > 0 && (
                        <div>
                          <p className="font-medium text-sm text-gray-600">Better alternatives:</p>
                          <ul className="list-disc list-inside text-sm text-gray-700 ml-2">
                            {ingredient.alternatives.map((alt: string, i: number) => (
                              <li key={i}>{alt}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
              <p className="text-gray-700 font-medium">
                Looking for safer alternatives? Check out our recommended products that avoid these ingredients:
              </p>
              <Button className="mt-3 bg-arogya-accent hover:bg-arogya-accent/90">
                View Safe Alternatives
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CosmeticScanner;
