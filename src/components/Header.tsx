
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Search, 
  BarChart2, 
  User, 
  Menu, 
  X,
  ScanLine,
  Flower,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <div className="flex items-center gap-2">
              <Flower className="h-7 w-7 text-arogya-primary" />
              <h1 className="text-xl font-bold gradient-text">ArogyaMate</h1>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-arogya-dark hover:text-arogya-primary transition-colors font-medium">Dashboard</Link>
          <Link to="/" className="text-arogya-dark hover:text-arogya-primary transition-colors font-medium">Food Scanner</Link>
          <Link to="/period-pregnancy-mediator" className="text-arogya-dark hover:text-arogya-primary transition-colors font-medium">Period & Pregnancy</Link>
          <Link to="/sickness-mode" className="text-arogya-dark hover:text-arogya-primary transition-colors font-medium">Sickness Mode</Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="relative">
            <ScanLine className="h-5 w-5" />
          </Button>
          <Button className="bg-arogya-primary hover:bg-arogya-primary/90">
            Get Premium
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-50">
          <div className="container mx-auto px-4 py-4 flex flex-col">
            <Link to="/" className="py-3 text-arogya-dark hover:text-arogya-primary transition-colors font-medium" onClick={toggleMenu}>Dashboard</Link>
            <Link to="/" className="py-3 text-arogya-dark hover:text-arogya-primary transition-colors font-medium" onClick={toggleMenu}>Food Scanner</Link>
            <Link to="/period-pregnancy-mediator" className="py-3 text-arogya-dark hover:text-arogya-primary transition-colors font-medium" onClick={toggleMenu}>Period & Pregnancy</Link>
            <Link to="/sickness-mode" className="py-3 text-arogya-dark hover:text-arogya-primary transition-colors font-medium" onClick={toggleMenu}>Sickness Mode</Link>
            <div className="flex space-x-4 py-3">
              <Button variant="outline" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <ScanLine className="h-5 w-5" />
              </Button>
              <Button className="bg-arogya-primary hover:bg-arogya-primary/90">
                Get Premium
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
