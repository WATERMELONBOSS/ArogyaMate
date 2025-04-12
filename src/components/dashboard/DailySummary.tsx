
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Utensils, Droplets, Activity, BarChart2 } from 'lucide-react';

const DailySummary: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Today's Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Calories */}
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Calories</p>
                <h3 className="text-2xl font-bold">1,280 / 2,200</h3>
              </div>
              <div className="h-10 w-10 bg-nutri-purple/10 flex items-center justify-center rounded-full">
                <Utensils className="h-5 w-5 text-nutri-purple" />
              </div>
            </div>
            <Progress value={58} className="h-2 mt-4" />
          </CardContent>
        </Card>
        
        {/* Protein */}
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Protein</p>
                <h3 className="text-2xl font-bold">78g / 140g</h3>
              </div>
              <div className="h-10 w-10 bg-nutri-green/10 flex items-center justify-center rounded-full">
                <Activity className="h-5 w-5 text-nutri-green" />
              </div>
            </div>
            <Progress value={55} className="h-2 mt-4 bg-gray-200">
              <div className="h-full bg-nutri-green rounded-full" style={{ width: '55%' }}></div>
            </Progress>
          </CardContent>
        </Card>
        
        {/* Water */}
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Water</p>
                <h3 className="text-2xl font-bold">1.2L / 3.0L</h3>
              </div>
              <div className="h-10 w-10 bg-blue-500/10 flex items-center justify-center rounded-full">
                <Droplets className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <Progress value={40} className="h-2 mt-4 bg-gray-200">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
            </Progress>
          </CardContent>
        </Card>
        
        {/* Steps */}
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Steps</p>
                <h3 className="text-2xl font-bold">6,423 / 10,000</h3>
              </div>
              <div className="h-10 w-10 bg-nutri-orange/10 flex items-center justify-center rounded-full">
                <BarChart2 className="h-5 w-5 text-nutri-orange" />
              </div>
            </div>
            <Progress value={64} className="h-2 mt-4 bg-gray-200">
              <div className="h-full bg-nutri-orange rounded-full" style={{ width: '64%' }}></div>
            </Progress>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailySummary;
