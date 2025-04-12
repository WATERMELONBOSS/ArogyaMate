
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Calendar, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

interface PlanAction {
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
}

interface DetailedPlanModalProps {
  goalType: string;
  progress: number;
  onClose: () => void;
}

const DetailedPlanModal: React.FC<DetailedPlanModalProps> = ({ goalType, progress, onClose }) => {
  // Mock data for plan actions
  const planActions: PlanAction[] = [
    {
      title: "Track 3 full days of meals",
      description: "Log all meals for 3 consecutive days to establish baseline",
      completed: true,
      dueDate: "Completed on Apr 8"
    },
    {
      title: "Complete nutrition assessment",
      description: "Answer questions about your eating habits and preferences",
      completed: true,
      dueDate: "Completed on Apr 9"
    },
    {
      title: "Review AI nutrition analysis",
      description: "Check the insights from your eating patterns",
      completed: false,
      dueDate: "Due today"
    },
    {
      title: "Set up meal reminders",
      description: "Configure notifications for regular meal times",
      completed: false,
      dueDate: "Due in 2 days"
    },
    {
      title: "Try one new recipe",
      description: "Pick from our recommendations and prepare it",
      completed: false,
      dueDate: "Due in 5 days"
    }
  ];

  // Mock weekly targets based on goal type
  const getWeeklyTargets = () => {
    switch (goalType) {
      case 'Weight Loss':
        return [
          { name: "Calorie target", value: "1,800 kcal/day" },
          { name: "Protein target", value: "90g/day" },
          { name: "Water intake", value: "3 liters/day" },
          { name: "Steps", value: "8,000/day" }
        ];
      case 'Muscle Gain':
        return [
          { name: "Calorie target", value: "2,400 kcal/day" },
          { name: "Protein target", value: "120g/day" },
          { name: "Strength training", value: "4 sessions/week" },
          { name: "Sleep", value: "7-8 hours/night" }
        ];
      default:
        return [
          { name: "Calorie target", value: "2,000 kcal/day" },
          { name: "Protein target", value: "75g/day" },
          { name: "Fruits & vegetables", value: "5 servings/day" },
          { name: "Water intake", value: "2.5 liters/day" }
        ];
    }
  };

  const weeklyTargets = getWeeklyTargets();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-arogya-primary/20 to-arogya-accent/20 p-5 sticky top-0 flex justify-between items-center z-10">
            <div>
              <h2 className="text-xl font-semibold">{goalType} Plan</h2>
              <p className="text-sm text-gray-600">Personalized 6-week program</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Progress Overview */}
            <div className="bg-arogya-light rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Progress Overview</h3>
                <span className="text-arogya-primary font-semibold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Week 2 of 6</span>
              </div>
            </div>
            
            {/* Weekly Targets */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-arogya-primary" />
                <h3 className="font-semibold">This Week's Targets</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {weeklyTargets.map((target, index) => (
                  <div key={index} className="bg-white p-3 border rounded-md">
                    <div className="text-sm text-gray-500">{target.name}</div>
                    <div className="font-medium">{target.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Items */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-arogya-secondary" />
                <h3 className="font-semibold">Action Items</h3>
              </div>
              
              <div className="space-y-3">
                {planActions.map((action, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border rounded-lg flex ${action.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'}`}
                  >
                    <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 mt-0.5 ${action.completed ? 'bg-arogya-secondary' : 'border-2 border-gray-300'}`}>
                      {action.completed && <CheckCircle2 className="h-5 w-5 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className={`font-medium ${action.completed ? 'text-gray-500' : ''}`}>
                          {action.title}
                        </h4>
                        <div className="flex items-center text-xs">
                          <Clock className="h-3 w-3 mr-1 text-gray-400" />
                          <span className={`${action.completed ? 'text-gray-400' : 'text-arogya-primary'}`}>
                            {action.dueDate}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tips Section */}
            <div className="bg-gradient-to-r from-arogya-primary/5 to-arogya-secondary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Nutrition Coach Tips</h3>
              <p className="text-sm text-gray-600">
                Try adding protein to every meal to help with satiety and muscle maintenance. Good sources include dal, paneer, tofu, Greek yogurt, and legumes.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button variant="outline">
                Download Plan
              </Button>
              <Button className="bg-arogya-primary hover:bg-arogya-primary/90">
                Track Today's Progress
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedPlanModal;
