
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScanLine, AlertTriangle, Check } from 'lucide-react';

const NutrientAnalyzer: React.FC = () => {
  return (
    <Card className="w-full card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ScanLine className="h-5 w-5 text-nutri-purple" />
          <span>Nutrition Label Scanner</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Scan any nutrition label to instantly analyze ingredients and nutritional value.
          </p>
          
          <div className="mt-4 grid gap-3">
            <div className="bg-gray-100 p-3 rounded-lg flex items-center">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-nutri-purple/20 to-nutri-green/20 flex items-center justify-center">
                <Check className="h-5 w-5 text-nutri-green" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium">Additive Analysis</h4>
                <p className="text-xs text-gray-500">Identifies potentially harmful additives</p>
              </div>
            </div>
            
            <div className="bg-gray-100 p-3 rounded-lg flex items-center">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-nutri-purple/20 to-nutri-orange/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-nutri-orange" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium">Health Score</h4>
                <p className="text-xs text-gray-500">1-10 rating based on your health profile</p>
              </div>
            </div>
          </div>
          
          <Alert className="bg-nutri-light border-nutri-purple/20">
            <AlertDescription className="text-xs text-gray-600">
              Mandatory nutrition tags in India provide valuable data we can analyze for your health.
            </AlertDescription>
          </Alert>
          
          <Button className="w-full bg-gradient-to-r from-nutri-purple to-nutri-green hover:opacity-90 text-white">
            Open Scanner
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutrientAnalyzer;
