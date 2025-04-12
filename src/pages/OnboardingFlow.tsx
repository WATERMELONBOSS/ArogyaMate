
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Flower,
  ArrowRight, 
  ArrowLeft,
  User,
  Calendar,
  Ruler,
  Weight,
  Heart,
  Target,
  Check
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const OnboardingFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    goal: '',
    medicalConditions: [] as string[],
    dietaryPreferences: [] as string[]
  });
  
  const totalSteps = 5;
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const toggleArrayItem = (field: 'medicalConditions' | 'dietaryPreferences', item: string) => {
    if (formData[field].includes(item)) {
      setFormData({
        ...formData,
        [field]: formData[field].filter(i => i !== item)
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...formData[field], item]
      });
    }
  };
  
  const handleSubmit = () => {
    // In a real app, we would send this data to an API
    console.log('Onboarding data:', formData);
    
    toast({
      title: "Profile Created!",
      description: "Your personalized nutrition journey begins now.",
    });
    
    // Redirect to dashboard
    navigate('/');
  };
  
  const medicalConditions = [
    'Diabetes', 'Hypertension', 'PCOS/PCOD', 'Thyroid Issues', 
    'IBS/IBD', 'Heart Disease', 'Lactose Intolerance', 'Gluten Sensitivity'
  ];
  
  const dietaryPreferences = [
    'Vegetarian', 'Vegan', 'Eggetarian', 'Non-Vegetarian', 
    'Jain', 'Keto', 'Low-Carb', 'Low-Fat', 'High-Protein'
  ];
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Welcome to ArogyaMate</h2>
            <p className="text-center text-gray-600">
              Let's set up your personalized nutrition profile to provide the best recommendations.
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  What's your name?
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  How old are you?
                </label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  What's your gender?
                </label>
                <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Body Metrics</h2>
            <p className="text-center text-gray-600">
              This helps us calculate your nutritional needs more accurately.
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                  Your height (in cm)
                </label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Height in centimeters"
                  value={formData.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Your weight (in kg)
                </label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Weight in kilograms"
                  value={formData.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-1">
                  Activity Level
                </label>
                <Select 
                  value={formData.activityLevel} 
                  onValueChange={(value) => handleChange('activityLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                    <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="very-active">Very Active (intense exercise daily)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Health Conditions</h2>
            <p className="text-center text-gray-600">
              Select any health conditions you have so we can tailor recommendations.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {medicalConditions.map((condition) => (
                <Button
                  key={condition}
                  type="button"
                  variant={formData.medicalConditions.includes(condition) ? "default" : "outline"}
                  className={`justify-start ${formData.medicalConditions.includes(condition) ? 'bg-arogya-primary hover:bg-arogya-primary/90' : ''}`}
                  onClick={() => toggleArrayItem('medicalConditions', condition)}
                >
                  {formData.medicalConditions.includes(condition) && <Check className="mr-2 h-4 w-4" />}
                  {condition}
                </Button>
              ))}
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Dietary Preferences</h2>
            <p className="text-center text-gray-600">
              Select your dietary preferences to personalize your food recommendations.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {dietaryPreferences.map((preference) => (
                <Button
                  key={preference}
                  type="button"
                  variant={formData.dietaryPreferences.includes(preference) ? "default" : "outline"}
                  className={`justify-start ${formData.dietaryPreferences.includes(preference) ? 'bg-arogya-accent hover:bg-arogya-accent/90' : ''}`}
                  onClick={() => toggleArrayItem('dietaryPreferences', preference)}
                >
                  {formData.dietaryPreferences.includes(preference) && <Check className="mr-2 h-4 w-4" />}
                  {preference}
                </Button>
              ))}
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Your Health Goals</h2>
            <p className="text-center text-gray-600">
              What's your primary health goal right now?
            </p>
            
            <div className="grid gap-3">
              {['Weight Loss', 'Weight Maintenance', 'Weight Gain', 'Muscle Building', 'Better Digestion', 'Improved Energy', 'Hormone Balance'].map((goal) => (
                <Card 
                  key={goal}
                  className={`cursor-pointer transition-all ${formData.goal === goal ? 'border-arogya-primary ring-1 ring-arogya-primary' : 'hover:border-arogya-primary/50'}`}
                  onClick={() => handleChange('goal', goal)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <span>{goal}</span>
                    {formData.goal === goal && <Check className="h-5 w-5 text-arogya-primary" />}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center">
          <div className="flex items-center gap-2">
            <Flower className="h-6 w-6 text-arogya-primary" />
            <h1 className="text-xl font-bold">ArogyaMate</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-arogya-primary h-2 rounded-full transition-all" 
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-500">
              Step {step} of {totalSteps}
            </div>
          </div>
          
          <Card className="border-arogya-primary/10">
            <CardContent className="p-6">
              {renderStep()}
              
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={step === 1}
                  className={step === 1 ? 'invisible' : ''}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-arogya-primary hover:bg-arogya-primary/90"
                >
                  {step === totalSteps ? 'Complete Setup' : 'Continue'}
                  {step !== totalSteps && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center mt-4">
            <Button 
              variant="link" 
              className="text-gray-500"
              onClick={() => navigate('/')}
            >
              Skip for now
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnboardingFlow;
