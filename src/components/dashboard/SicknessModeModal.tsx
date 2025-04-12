
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, HeartPulse } from 'lucide-react';

interface Food {
  name: string;
  benefit: string;
}

interface Condition {
  name: string;
  image: string;
  foods: Food[];
}

interface SicknessModeData {
  conditions: Condition[];
}

interface SicknessModeModalProps {
  data: SicknessModeData;
  onClose: () => void;
  onNavigate: () => void;
}

const SicknessModeModal: React.FC<SicknessModeModalProps> = ({ data, onClose, onNavigate }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-auto">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-arogya-success/20 to-blue-100 p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-arogya-success" />
              <span>Sickness Mode: Recovery Foods</span>
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-6 space-y-6">
            <p className="text-gray-600">
              When you're feeling unwell, what you eat can make a big difference in your recovery. 
              Here are recommendations for common conditions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.conditions.map((condition, index) => (
                <Card key={index} className="overflow-hidden border-arogya-success/20">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={condition.image} 
                      alt={condition.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-3">{condition.name}</h3>
                    <div className="space-y-2">
                      {condition.foods.map((food, foodIdx) => (
                        <div key={foodIdx} className="bg-gray-50 p-2 rounded border text-sm">
                          <div className="font-medium">{food.name}</div>
                          <div className="text-gray-600 text-xs">{food.benefit}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="pt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Always consult with a healthcare professional for specific dietary advice during illness.
              </p>
              <Button 
                onClick={onNavigate}
                className="bg-arogya-success hover:bg-arogya-success/90 gap-2"
              >
                Explore All Remedies <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SicknessModeModal;
