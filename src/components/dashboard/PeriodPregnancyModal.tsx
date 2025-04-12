
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from 'lucide-react';

interface Recommendation {
  name: string;
  benefit: string;
}

interface Category {
  title: string;
  image: string;
  recommendations: Recommendation[];
}

interface PeriodPregnancyData {
  categories: Category[];
}

interface PeriodPregnancyModalProps {
  data: PeriodPregnancyData;
  onClose: () => void;
  onNavigate: () => void;
}

const PeriodPregnancyModal: React.FC<PeriodPregnancyModalProps> = ({ data, onClose, onNavigate }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-auto">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-arogya-primary/20 to-arogya-accent/20 p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Period & Pregnancy Nutrition Guide</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-6 space-y-6">
            <p className="text-gray-600">
              Discover personalized nutritional options designed specifically for periods and 
              pregnancy, helping you deal with cravings in a healthier way.
            </p>
            
            {data.categories.map((category, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={category.image}
                        alt={category.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <ul className="space-y-3">
                      {category.recommendations.map((rec, recIdx) => (
                        <li key={recIdx} className="bg-white p-3 border rounded-md shadow-sm">
                          <div className="font-medium">{rec.name}</div>
                          <div className="text-sm text-gray-600">{rec.benefit}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-4 flex justify-end">
              <Button 
                onClick={onNavigate}
                className="bg-arogya-primary hover:bg-arogya-primary/90 gap-2"
              >
                View Full Guide <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PeriodPregnancyModal;
