
import React, { useState } from 'react';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import VideoDemo from '../VideoDemo';

const WelcomeMessage: React.FC = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

  const handleGetStartedClick = () => {
    toast({
      title: "Welcome to ArogyaMate!",
      description: "Let's begin your personalized health journey together."
    });
    navigate('/onboarding');
  };

  const handleWatchDemoClick = () => {
    setShowVideo(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-arogya-primary/10 to-arogya-accent/10 p-6 rounded-xl">
        <h1 className="text-xl md:text-2xl font-medium text-gray-800">
          Hey there, I'm ArogyaMate — the only one who scans your snacks and your shampoo, whispers sweet nothings about macros, and still lets you sneak a midnight dosa.
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white p-6 border border-arogya-primary/20 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 bg-arogya-primary/10 flex items-center justify-center rounded-full">
              <Sparkles className="h-5 w-5 text-arogya-primary" />
            </div>
            <h3 className="font-semibold">Personalized for You</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            We adapt our recommendations to your unique health needs, preferences, and goals.
          </p>
          <Button 
            className="bg-arogya-primary hover:bg-arogya-primary/90 w-full"
            onClick={handleGetStartedClick}
          >
            Get Started
          </Button>
        </Card>
        
        <Card className="bg-white p-6 border border-arogya-accent/20 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 bg-arogya-accent/10 flex items-center justify-center rounded-full">
              <Zap className="h-5 w-5 text-arogya-accent" />
            </div>
            <h3 className="font-semibold">Powered by AI</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Our advanced AI understands Indian foods, ingredients, and traditional nutrition practices.
          </p>
          <Button 
            variant="outline" 
            className="w-full border-arogya-accent/30 text-arogya-accent"
            onClick={handleWatchDemoClick}
          >
            Watch Demo <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Card>
        
        <Card className="bg-gradient-to-br from-arogya-light to-white p-6 border border-arogya-primary/20 shadow-sm">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="font-semibold mb-2">Daily Health Tip</h3>
              <p className="text-sm text-gray-600 italic">
                "Start your day with a glass of warm water with lemon to boost digestion and metabolism."
              </p>
            </div>
            <div className="flex justify-between items-center mt-4 text-xs text-arogya-primary/70">
              <span>Updated daily</span>
              <Button variant="ghost" size="sm" className="p-0 h-auto text-arogya-primary">
                Next tip
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Video Demo Modal */}
      <VideoDemo 
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
      />
    </div>
  );
};

export default WelcomeMessage;
