
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

interface FeaturedServiceProps {
  icon: LucideIcon;
  iconBgClass: string;
  iconColor: string;
  title: string;
  description: string;
  buttonText: string;
  buttonBgClass: string;
  onClick: (featureName: string) => void;
}

const FeaturedService: React.FC<FeaturedServiceProps> = ({
  icon: Icon,
  iconBgClass,
  iconColor,
  title,
  description,
  buttonText,
  buttonBgClass,
  onClick
}) => {
  return (
    <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200 card-hover">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`h-12 w-12 ${iconBgClass} flex items-center justify-center rounded-full`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-600 mb-3">
              {description}
            </p>
            <Button 
              size="sm" 
              className={`${buttonBgClass} text-white`}
              onClick={() => onClick(title)}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedService;
