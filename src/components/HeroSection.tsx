import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from 'lucide-react';
import { AnimatedTextCycle, ThreeDBackground } from './ui/component';

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

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeDBackground />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Build the{" "}
            <AnimatedTextCycle
              words={["future", "impossible", "extraordinary", "intelligent"]}
              interval={3000}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400"
            />{" "}
            with AI
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your business with cutting-edge AI solutions, smart websites, and automation systems that work while you sleep.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <GetStartedButton />
            <Button variant="outline" size="lg" className="group">
              View Our Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}