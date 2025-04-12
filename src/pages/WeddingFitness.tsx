
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CalendarCheck, Cake, Target, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const WeddingFitness = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventDate: '',
    currentWeight: '',
    targetWeight: '',
    dietaryPreferences: '',
    fitnessLevel: 'moderate'
  });
  const [planGenerated, setPlanGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      setIsGenerating(false);
      setPlanGenerated(true);
      toast({
        title: "Wedding Fitness Plan Created",
        description: "Your personalized plan is now ready!",
      });
    }, 2000);
  };

  const calculateWeeksRemaining = () => {
    if (!formData.eventDate) return 0;
    
    const eventDate = new Date(formData.eventDate);
    const currentDate = new Date();
    const diffTime = eventDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(Math.floor(diffDays / 7), 0);
  };

  const weeksRemaining = calculateWeeksRemaining();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-nutri-purple hover:text-nutri-purple/80 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Wedding & Event Fitness Pack
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Look and feel your best on your special day with a personalized nutrition and fitness plan.
            Our AI will create a timeline-based approach to help you reach your goals.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {!planGenerated ? (
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Step {step} of 3</span>
                    <span className="text-sm text-gray-500">{Math.floor((step / 3) * 100)}% Complete</span>
                  </div>
                  <Progress value={(step / 3) * 100} className="h-2" />
                </div>
                
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Event Details</h2>
                      
                      <div>
                        <label htmlFor="eventDate" className="block mb-2 font-medium">Event Date</label>
                        <input
                          type="date"
                          id="eventDate"
                          name="eventDate"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nutri-purple"
                          value={formData.eventDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="dietaryPreferences" className="block mb-2 font-medium">Dietary Preferences or Restrictions</label>
                        <textarea
                          id="dietaryPreferences"
                          name="dietaryPreferences"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nutri-purple min-h-24"
                          placeholder="e.g., vegetarian, gluten-free, allergies, etc."
                          value={formData.dietaryPreferences}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={handleNext}
                          className="bg-nutri-purple hover:bg-nutri-purple/90"
                        >
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Body & Goals</h2>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="currentWeight" className="block mb-2 font-medium">Current Weight (kg)</label>
                          <input
                            type="number"
                            id="currentWeight"
                            name="currentWeight"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nutri-purple"
                            min="30"
                            max="200"
                            value={formData.currentWeight}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="targetWeight" className="block mb-2 font-medium">Target Weight (kg)</label>
                          <input
                            type="number"
                            id="targetWeight"
                            name="targetWeight"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nutri-purple"
                            min="30"
                            max="200"
                            value={formData.targetWeight}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="fitnessLevel" className="block mb-2 font-medium">Current Fitness Level</label>
                        <select
                          id="fitnessLevel"
                          name="fitnessLevel"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nutri-purple"
                          value={formData.fitnessLevel}
                          onChange={handleChange}
                        >
                          <option value="beginner">Beginner - Rarely exercise</option>
                          <option value="moderate">Moderate - Exercise 1-3 times per week</option>
                          <option value="active">Active - Exercise 3-5 times per week</option>
                          <option value="very_active">Very Active - Exercise 6+ times per week</option>
                        </select>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button
                          type="button"
                          onClick={handlePrev}
                          variant="outline"
                          className="bg-white"
                        >
                          Previous
                        </Button>
                        <Button
                          type="button"
                          onClick={handleNext}
                          className="bg-nutri-purple hover:bg-nutri-purple/90"
                        >
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Review & Generate Plan</h2>
                      
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-medium mb-4">Your Event Plan Summary</h3>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Event Date:</span>
                            <span className="font-medium">{formData.eventDate}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Weeks Remaining:</span>
                            <span className="font-medium">{weeksRemaining} weeks</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Current Weight:</span>
                            <span className="font-medium">{formData.currentWeight} kg</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Target Weight:</span>
                            <span className="font-medium">{formData.targetWeight} kg</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Weight Goal:</span>
                            <span className="font-medium">
                              {formData.currentWeight && formData.targetWeight 
                                ? `${Math.abs(Number(formData.currentWeight) - Number(formData.targetWeight))} kg ${Number(formData.currentWeight) > Number(formData.targetWeight) ? 'loss' : 'gain'}`
                                : '-'
                              }
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Fitness Level:</span>
                            <span className="font-medium capitalize">{formData.fitnessLevel.replace('_', ' ')}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Dietary Preferences:</span>
                            <span className="font-medium">{formData.dietaryPreferences || 'None specified'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button
                          type="button"
                          onClick={handlePrev}
                          variant="outline"
                          className="bg-white"
                        >
                          Previous
                        </Button>
                        <Button
                          type="submit"
                          className="bg-nutri-purple hover:bg-nutri-purple/90"
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <div className="flex items-center">
                              <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                              <span>Generating Plan...</span>
                            </div>
                          ) : (
                            <span>Generate My Plan</span>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              <Card className="bg-gradient-to-r from-nutri-purple/10 to-nutri-green/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Gift className="h-8 w-8 text-nutri-purple" />
                    <h2 className="text-2xl font-semibold">Your Wedding Fitness Plan</h2>
                  </div>
                  
                  <p className="mb-4">
                    Based on your goals and timeline, we've created a personalized plan to help you
                    {Number(formData.currentWeight) > Number(formData.targetWeight) ? ' lose ' : ' gain '}
                    {Math.abs(Number(formData.currentWeight) - Number(formData.targetWeight))} kg in {weeksRemaining} weeks.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <CalendarCheck className="h-8 w-8 text-nutri-green mx-auto mb-2" />
                      <h3 className="font-medium mb-1">Timeline</h3>
                      <p className="text-gray-600">{weeksRemaining} weeks remaining</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg text-center">
                      <Cake className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                      <h3 className="font-medium mb-1">Weekly Plan</h3>
                      <p className="text-gray-600">
                        {(Math.abs(Number(formData.currentWeight) - Number(formData.targetWeight)) / weeksRemaining).toFixed(1)} kg per week
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg text-center">
                      <Target className="h-8 w-8 text-nutri-orange mx-auto mb-2" />
                      <h3 className="font-medium mb-1">Target Goal</h3>
                      <p className="text-gray-600">{formData.targetWeight} kg</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Weekly Nutrition Plan</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Daily Calorie Target</h4>
                        <p className="text-gray-700 mb-1">
                          {Number(formData.currentWeight) > Number(formData.targetWeight) 
                            ? '1,800 - 2,000 calories per day'
                            : '2,500 - 2,700 calories per day'
                          }
                        </p>
                        <div className="w-full bg-gray-200 h-2 rounded-full">
                          <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Macronutrient Breakdown</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Protein</span>
                              <span>30%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full">
                              <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Carbs</span>
                              <span>40%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full">
                              <div className="bg-purple-500 h-2 rounded-full w-2/5"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Fat</span>
                              <span>30%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full">
                              <div className="bg-yellow-500 h-2 rounded-full w-1/3"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-nutri-green hover:bg-nutri-green/90">
                        View Detailed Meal Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Weekly Exercise Plan</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">
                          {formData.fitnessLevel === 'beginner' 
                            ? 'Beginner-Friendly Workout Schedule'
                            : formData.fitnessLevel === 'moderate'
                              ? 'Moderate Intensity Workout Schedule'
                              : 'Advanced Workout Schedule'
                          }
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex justify-between">
                            <span>Monday:</span>
                            <span>30 min cardio + core</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Tuesday:</span>
                            <span>Upper body strength</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Wednesday:</span>
                            <span>Rest or light activity</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Thursday:</span>
                            <span>HIIT workout</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Friday:</span>
                            <span>Lower body strength</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Weekend:</span>
                            <span>Active recovery + yoga</span>
                          </li>
                        </ul>
                      </div>
                      
                      <Button className="w-full bg-nutri-green hover:bg-nutri-green/90">
                        View Detailed Exercise Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-nutri-purple/10 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Weekly Progress Tracking</h3>
                <p className="text-gray-700 mb-4">
                  Your personalized plan includes weekly check-ins to track progress and adjust as needed.
                  We'll help you stay on track with reminders and adjustments to your plan.
                </p>
                <Button className="bg-nutri-purple hover:bg-nutri-purple/90">
                  Enable Weekly Check-ins
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WeddingFitness;
