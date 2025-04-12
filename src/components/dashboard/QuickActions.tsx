
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ScanLine, ChefHat, Moon } from 'lucide-react';
import QuickActionModal from './QuickActionModal';

interface QuickActionsProps {
  handleFeatureClick: (featureName: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ handleFeatureClick }) => {
  const [activeModal, setActiveModal] = useState<'log-meal' | 'scan-label' | 'find-recipes' | 'night-craving' | null>(null);
  
  const handleQuickActionClick = (actionType: 'log-meal' | 'scan-label' | 'find-recipes' | 'night-craving') => {
    handleFeatureClick(getFeatureNameFromAction(actionType));
    setActiveModal(actionType);
  };
  
  const getFeatureNameFromAction = (actionType: string): string => {
    switch (actionType) {
      case 'log-meal':
        return 'Log Meal';
      case 'scan-label':
        return 'Scan Label';
      case 'find-recipes':
        return 'Find Recipes';
      case 'night-craving':
        return 'Night Craving';
      default:
        return actionType;
    }
  };
  
  const closeModal = () => {
    setActiveModal(null);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card 
          className="card-hover cursor-pointer"
          onClick={() => handleQuickActionClick('log-meal')}
        >
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 bg-arogya-primary/10 rounded-full flex items-center justify-center mb-3">
              <Calendar className="h-6 w-6 text-arogya-primary" />
            </div>
            <h3 className="text-sm font-medium">Log Meal</h3>
          </CardContent>
        </Card>
        
        <Card 
          className="card-hover cursor-pointer"
          onClick={() => handleQuickActionClick('scan-label')}
        >
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 bg-arogya-secondary/10 rounded-full flex items-center justify-center mb-3">
              <ScanLine className="h-6 w-6 text-arogya-secondary" />
            </div>
            <h3 className="text-sm font-medium">Scan Label</h3>
          </CardContent>
        </Card>
        
        <Card 
          className="card-hover cursor-pointer"
          onClick={() => handleQuickActionClick('find-recipes')}
        >
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 bg-arogya-accent/10 rounded-full flex items-center justify-center mb-3">
              <ChefHat className="h-6 w-6 text-arogya-accent" />
            </div>
            <h3 className="text-sm font-medium">Find Recipes</h3>
          </CardContent>
        </Card>
        
        <Card 
          className="card-hover cursor-pointer"
          onClick={() => handleQuickActionClick('night-craving')}
        >
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
              <Moon className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-sm font-medium">Night Craving</h3>
          </CardContent>
        </Card>
      </div>
      
      {activeModal && (
        <QuickActionModal
          actionType={activeModal}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default QuickActions;
