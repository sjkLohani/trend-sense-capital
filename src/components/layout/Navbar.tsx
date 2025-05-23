
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  BarChart, 
  LogIn,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut, isAdmin } = useAuth();
  
  // Check if we're on the landing page
  const isLandingPage = location.pathname === '/';

  // Scroll handler function for smooth scrolling to sections
  const handleSectionScroll = (sectionId: string) => {
    if (!isLandingPage) {
      // If not on landing page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // Get the element to scroll to
    const element = document.getElementById(sectionId);
    if (element) {
      // Close mobile menu if open
      setIsOpen(false);
      
      // Scroll smoothly to the element
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleDashboardClick = () => {
    navigate(isAdmin ? '/admin/users' : '/dashboard');
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <BarChart className="h-6 w-6 text-primary" />
          <span className="font-display font-bold text-xl">SentInvest</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => handleSectionScroll('features')} 
            className="text-foreground/80 hover:text-primary transition"
          >
            Features
          </button>
          <button 
            onClick={() => handleSectionScroll('pricing')} 
            className="text-foreground/80 hover:text-primary transition"
          >
            Pricing
          </button>
          <button 
            onClick={() => handleSectionScroll('how-it-works')} 
            className="text-foreground/80 hover:text-primary transition"
          >
            About
          </button>
          <button 
            onClick={() => handleSectionScroll('contact')} 
            className="text-foreground/80 hover:text-primary transition"
          >
            Contact
          </button>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleDashboardClick}>
                Dashboard
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
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
            <button 
              onClick={() => handleSectionScroll('features')} 
              className="text-lg font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => handleSectionScroll('pricing')} 
              className="text-lg font-medium"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleSectionScroll('how-it-works')} 
              className="text-lg font-medium"
            >
              About
            </button>
            <button 
              onClick={() => handleSectionScroll('contact')} 
              className="text-lg font-medium"
            >
              Contact
            </button>
            
            <div className="flex flex-col space-y-4 pt-4 border-t">
              {user ? (
                <>
                  <Button className="w-full" onClick={handleDashboardClick}>
                    Dashboard
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    Logout
                  </Button>
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
