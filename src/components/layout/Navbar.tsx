
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  BarChart, 
  LogIn,
  User
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context in real app

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <BarChart className="h-6 w-6 text-primary" />
          <span className="font-display font-bold text-xl">SentInvest</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground/80 hover:text-primary transition">Home</Link>
          <Link to="/features" className="text-foreground/80 hover:text-primary transition">Features</Link>
          <Link to="/pricing" className="text-foreground/80 hover:text-primary transition">Pricing</Link>
          <Link to="/about" className="text-foreground/80 hover:text-primary transition">About</Link>
          <Link to="/contact" className="text-foreground/80 hover:text-primary transition">Contact</Link>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40 p-6">
          <div className="flex flex-col space-y-6">
            <Link to="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/features" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Features</Link>
            <Link to="/pricing" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Pricing</Link>
            <Link to="/about" className="text-lg font-medium" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Contact</Link>
            
            <div className="flex flex-col space-y-4 pt-4 border-t">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Dashboard</Button>
                  </Link>
                  <Link to="/profile" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Profile</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
