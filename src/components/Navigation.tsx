import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, Menu, X } from 'lucide-react';

interface NavigationProps {
  setCurrentPage?: (page: string) => void;
  currentPage?: string;
}

function GetStartedButton({ onClick }: { onClick?: () => void }) {
  const handleGetStartedClick = () => {
    if (onClick) {
      onClick();
    } else {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Button 
      className="group relative overflow-hidden" 
      size="lg"
      onClick={handleGetStartedClick}
    >
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        Get Started
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-primary-foreground/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-black-500">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  );
}

export default function Navigation({ setCurrentPage, currentPage }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, page?: string) => {
    e.preventDefault();
    if (page && setCurrentPage) {
      setCurrentPage(page);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    if (setCurrentPage) {
      if (currentPage === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGetStartedClick = () => {
    if (currentPage === 'smart-websites' && setCurrentPage) {
      setCurrentPage('home');
      setTimeout(() => {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const isSmartWebsitesPage = currentPage === 'smart-websites';
  const isAIAgentsPage = currentPage === 'ai-agents';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-4 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-300"
            onClick={handleLogoClick}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">X</span>
            </div>
            <span className="text-xl font-bold text-foreground">xonai.dev</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {isSmartWebsitesPage ? (
              <>
                <a href="#why-smart-websites" onClick={(e) => handleNavLinkClick(e, 'why-smart-websites')} className="text-muted-foreground hover:text-foreground transition-colors">Why Us</a>
                <a href="#whats-included" onClick={(e) => handleNavLinkClick(e, 'whats-included')} className="text-muted-foreground hover:text-foreground transition-colors">Included</a>
                <a href="#perfect-for" onClick={(e) => handleNavLinkClick(e, 'perfect-for')} className="text-muted-foreground hover:text-foreground transition-colors">Smart Fit</a>
                <a href="#smart-websites-contact" onClick={(e) => handleNavLinkClick(e, 'smart-websites-contact')} className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              </>
            ) : isAIAgentsPage ? (
              <>
                <a href="#why-this-matters" onClick={(e) => handleNavLinkClick(e, 'why-this-matters')} className="text-muted-foreground hover:text-foreground transition-colors">Why This Matters</a>
                <a href="#whats-included" onClick={(e) => handleNavLinkClick(e, 'whats-included')} className="text-muted-foreground hover:text-foreground transition-colors">Included</a>
                <a href="#perfect-for" onClick={(e) => handleNavLinkClick(e, 'perfect-for')} className="text-muted-foreground hover:text-foreground transition-colors">Perfect For</a>
                <a href="#ai-agents-contact" onClick={(e) => handleNavLinkClick(e, 'ai-agents-contact')} className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              </>
            ) : (
              <>
                <a href="#services" onClick={(e) => handleNavLinkClick(e, 'services')} className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
                <a href="#process" onClick={(e) => handleNavLinkClick(e, 'process')} className="text-muted-foreground hover:text-foreground transition-colors">Our Process</a>
                <a href="#faq" onClick={(e) => handleNavLinkClick(e, 'faq')} className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
                <a href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')} className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isSmartWebsitesPage ? (
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => {
                  const contactElement = document.getElementById('smart-websites-contact');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : isAIAgentsPage ? (
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => {
                  const contactElement = document.getElementById('ai-agents-contact');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <GetStartedButton onClick={handleGetStartedClick} />
            )}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
            <div className="py-4 space-y-4">
              {isSmartWebsitesPage ? (
                <>
                  <a href="#why-smart-websites" onClick={(e) => handleNavLinkClick(e, 'why-smart-websites')} className="block text-muted-foreground hover:text-foreground transition-colors">Why Us</a>
                  <a href="#whats-included" onClick={(e) => handleNavLinkClick(e, 'whats-included')} className="block text-muted-foreground hover:text-foreground transition-colors">Included</a>
                  <a href="#perfect-for" onClick={(e) => handleNavLinkClick(e, 'perfect-for')} className="block text-muted-foreground hover:text-foreground transition-colors">Smart Fit</a>
                  <a href="#smart-websites-contact" onClick={(e) => handleNavLinkClick(e, 'smart-websites-contact')} className="block text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                </>
              ) : isAIAgentsPage ? (
                <>
                  <a href="#why-this-matters" onClick={(e) => handleNavLinkClick(e, 'why-this-matters')} className="block text-muted-foreground hover:text-foreground transition-colors">Why This Matters</a>
                  <a href="#whats-included" onClick={(e) => handleNavLinkClick(e, 'whats-included')} className="block text-muted-foreground hover:text-foreground transition-colors">Included</a>
                  <a href="#perfect-for" onClick={(e) => handleNavLinkClick(e, 'perfect-for')} className="block text-muted-foreground hover:text-foreground transition-colors">Perfect For</a>
                  <a href="#ai-agents-contact" onClick={(e) => handleNavLinkClick(e, 'ai-agents-contact')} className="block text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                </>
              ) : (
                <>
                  <a href="#services" onClick={(e) => handleNavLinkClick(e, 'services')} className="block text-muted-foreground hover:text-foreground transition-colors">Services</a>
                  <a href="#process" onClick={(e) => handleNavLinkClick(e, 'process')} className="block text-muted-foreground hover:text-foreground transition-colors">Our Process</a>
                  <a href="#faq" onClick={(e) => handleNavLinkClick(e, 'faq')} className="block text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
                  <a href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')} className="block text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                </>
              )}
              
              <div className="pt-4 space-y-2">
                {isSmartWebsitesPage ? (
                  <Button 
                    size="lg" 
                    className="w-full group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                    onClick={() => {
                      const contactElement = document.getElementById('smart-websites-contact');
                      if (contactElement) {
                        contactElement.scrollIntoView({ behavior: 'smooth' });
                      }
                      setIsOpen(false);
                    }}
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                ) : isAIAgentsPage ? (
                  <Button 
                    size="lg" 
                    className="w-full group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                    onClick={() => {
                      const contactElement = document.getElementById('ai-agents-contact');
                      if (contactElement) {
                        contactElement.scrollIntoView({ behavior: 'smooth' });
                      }
                      setIsOpen(false);
                    }}
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                ) : (
                  <GetStartedButton onClick={handleGetStartedClick} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}