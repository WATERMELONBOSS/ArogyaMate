
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import WelcomeMessage from './dashboard/WelcomeMessage';
import DailySummary from './dashboard/DailySummary';
import FeaturedServices from './dashboard/FeaturedServices';
import GoalProgress from './dashboard/GoalProgress';
import QuickActions from './dashboard/QuickActions';
import DetailedPlanModal from './dashboard/DetailedPlanModal';
import { useGoalProgress } from '@/hooks/use-mock-api';

const Dashboard: React.FC = () => {
  const [detailedPlanData, setDetailedPlanData] = useState<{goalType: string, progress: number} | null>(null);
  const { data: goalData } = useGoalProgress();
  
  // Handler for feature clicks
  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "Feature Selected",
      description: `You selected the ${featureName} feature`,
    });
  };
  
  // Handler for viewing detailed plan
  const handleViewDetailedPlan = (goalType: string) => {
    if (goalData) {
      const goal = goalData.find(g => g.goalType === goalType);
      if (goal) {
        setDetailedPlanData({
          goalType: goal.goalType,
          progress: goal.progress
        });
      } else {
        // If goal not found, create a default one
        setDetailedPlanData({
          goalType: goalType,
          progress: 25
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <WelcomeMessage />
      
      {/* Daily Summary */}
      <DailySummary />
      
      {/* Featured Services */}
      <FeaturedServices handleFeatureClick={handleFeatureClick} />
      
      {/* Goal Progress */}
      <GoalProgress 
        handleFeatureClick={handleFeatureClick} 
        onViewDetailedPlan={handleViewDetailedPlan}
      />
      
      {/* Quick Actions */}
      <QuickActions handleFeatureClick={handleFeatureClick} />
      
      {/* Detailed Plan Modal */}
      {detailedPlanData && (
        <DetailedPlanModal
          goalType={detailedPlanData.goalType}
          progress={detailedPlanData.progress}
          onClose={() => setDetailedPlanData(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
