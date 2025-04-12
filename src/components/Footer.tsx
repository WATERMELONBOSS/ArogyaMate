
import React from 'react';
import { Flower, Github, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flower className="h-6 w-6 text-arogya-primary" />
              <h2 className="text-lg font-bold gradient-text">ArogyaMate</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Your smart companion for healthier food choices and personalized nutrition guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-arogya-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-arogya-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-arogya-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">Food Scanner</a></li>
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">Label Analysis</a></li>
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">Recipe Finder</a></li>
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">Wedding Prep Plans</a></li>
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">Midnight Craving Manager</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">Indian Food Database</a></li>
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">Nutrition Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">Regional Recipes</a></li>
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">Health Conditions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">Wellness Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-arogya-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; 2025 ArogyaMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
