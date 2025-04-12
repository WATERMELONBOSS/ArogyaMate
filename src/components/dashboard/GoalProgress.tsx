
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, BarChart3, Eye } from 'lucide-react';
import { useGoalProgress } from '@/hooks/use-mock-api';

interface GoalProgressProps {
  handleFeatureClick: (featureName: string) => void;
  onViewDetailedPlan: (goalType: string) => void;
}

const GoalProgress: React.FC<GoalProgressProps> = ({ handleFeatureClick, onViewDetailedPlan }) => {
  const { data: goals, status } = useGoalProgress();
  
  const formatDate = (dateString: string) => {
    if (dateString === 'ongoing') return 'Ongoing';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const handleViewPlan = (goalType: string) => {
    handleFeatureClick(`View ${goalType} Plan`);
    onViewDetailedPlan(goalType);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Goals</h2>
        <Button 
          variant="ghost" 
          className="text-sm flex items-center gap-1 text-arogya-primary"
          onClick={() => handleFeatureClick("Add New Goal")}
        >
          View All <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {status === 'loading' && (
          <div className="col-span-3 p-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-40 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-60 bg-gray-200 rounded"></div>
            </div>
          </div>
        )}
        
        {status === 'error' && (
          <div className="col-span-3 p-8 text-center">
            <p className="text-gray-500">Unable to load goals. Please try again later.</p>
          </div>
        )}
        
        {status === 'success' && goals && goals.map((goal, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 bg-arogya-primary/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-arogya-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{goal.goalType}</h3>
                  <p className="text-xs text-gray-500">
                    Target: {goal.targetDate === 'ongoing' ? 'Ongoing' : formatDate(goal.targetDate)}
                  </p>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>{goal.progress}% Complete</span>
                  <span>Updated {formatDate(goal.lastUpdated)}</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {goal.goalType === 'Weight Loss' ? 'Current weight' : 
                     goal.goalType === 'Protein Intake' ? 'Daily average' : 'Daily intake'}
                  </span>
                  <span className="font-medium">
                    {goal.currentValue}
                    {goal.goalType === 'Weight Loss' ? ' kg' : 
                     goal.goalType === 'Protein Intake' ? 'g' : 'L'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {goal.goalType === 'Weight Loss' ? 'Weekly target' : 'Target'}
                  </span>
                  <span className="font-medium text-arogya-primary">
                    {goal.goalType === 'Weight Loss' ? '-' : ''}
                    {goal.weeklyTarget}
                    {goal.goalType === 'Weight Loss' ? ' kg/week' : 
                     goal.goalType === 'Protein Intake' ? 'g/day' : 'L/day'}
                  </span>
                </div>
              </div>
              
              <Button 
                className="w-full flex justify-center gap-1 bg-arogya-primary hover:bg-arogya-primary/90"
                onClick={() => handleViewPlan(goal.goalType)}
              >
                <Eye className="h-4 w-4" /> View Detailed Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalProgress;
