
import React, { useState } from 'react';
import { Camera, Scan } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FoodScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning completion after 3 seconds
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  const resetScan = () => {
    setScanComplete(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden">
          <Card className="w-full h-full flex items-center justify-center bg-gray-100 border-2 border-dashed">
            <CardContent className="p-0 w-full h-full flex flex-col items-center justify-center">
              {scanComplete ? (
                <div className="w-full h-full relative">
                  {/* This would be the actual scanned image in a real app */}
                  <div className="absolute inset-0 bg-gradient-to-br from-nutri-purple/10 to-nutri-green/10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" 
                    alt="Food plate" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-xs">
                      <h3 className="text-lg font-semibold mb-2">Scan Complete</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Healthy salad with mixed greens, quinoa, avocado, and chicken.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-nutri-green rounded-full mr-2"></span>
                          <span className="font-medium">Protein: 32g</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-nutri-orange rounded-full mr-2"></span>
                          <span className="font-medium">Carbs: 45g</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-nutri-purple rounded-full mr-2"></span>
                          <span className="font-medium">Fat: 15g</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                          <span className="font-medium">Kcal: 442</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {isScanning ? (
                    <div className="relative w-full h-full bg-gray-800/10 flex items-center justify-center">
                      {/* Scanner animation */}
                      <div className="scanner-line animate-scanner"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Scan className="mx-auto h-10 w-10 text-nutri-purple animate-pulse-light" />
                          <p className="mt-2 font-medium text-nutri-dark/80">Scanning...</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <Camera className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                      <p className="text-gray-500 mb-2">
                        Take a photo of your food to analyze nutritional content
                      </p>
                      <p className="text-xs text-gray-400 mb-6">
                        For best results, ensure good lighting and include the entire plate
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex space-x-3">
          {scanComplete ? (
            <>
              <Button 
                variant="outline"
                onClick={resetScan}
                className="px-6"
              >
                Scan Again
              </Button>
              <Button className="bg-nutri-purple hover:bg-nutri-purple/90 px-6">
                Save to Log
              </Button>
            </>
          ) : (
            <Button 
              onClick={handleScan} 
              disabled={isScanning} 
              className="bg-nutri-purple hover:bg-nutri-purple/90 px-8 py-6"
            >
              {isScanning ? 'Scanning...' : 'Scan Food'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodScanner;
