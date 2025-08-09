import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { 
  ArrowRight, 
  ChevronRight, 
  Globe, 
  Bot, 
  Cog, 
  MessageSquare, 
  User, 
  Sparkles, 
  Settings, 
  Zap,
  Menu,
  X,
  Send,
  Loader2,
  CheckCircle,
  Clock,
  Target,
  Star,
  Code,
  Smartphone,
  Search,
  Shield,
  Lightbulb,
  TrendingUp,
  Users,
  Calendar,
  Briefcase,
  Building,
  ShoppingCart,
  Heart
} from 'lucide-react';

// Animated Text Cycle Component
export function AnimatedTextCycle({ 
  words, 
  interval = 2000, 
  className = "" 
}: { 
  words: string[]; 
  interval?: number; 
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={className}
      >
        {words[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );
}

// 3D Background Component
export function ThreeDBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900" />
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg opacity-20"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full opacity-20"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-green-400 to-cyan-600 rounded-lg opacity-20"
        animate={{
          y: [0, 25, 0],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

// Get Started Button Component
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

// Navigation Component
function Navigation({ setCurrentPage, currentPage }: { setCurrentPage?: (page: string) => void; currentPage?: string }) {
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

// Contact Form Component
function ContactForm({ variant = 'default' }: { variant?: 'default' | 'smart-websites' | 'ai-agents' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to submit the form.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let tableName: string;
      
      switch (variant) {
        case 'smart-websites':
          tableName = 'smart_websites_contacts';
          break;
        case 'ai-agents':
          tableName = 'ai_agents_contacts';
          break;
        default:
          tableName = 'contacts';
      }

      console.log(`Submitting to table: ${tableName}`, formData);

      const { data, error } = await supabase
        .from(tableName)
        .insert([formData])
        .select();
        
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Form submitted successfully to', tableName, ':', data);

      // Success
      toast({
        title: "Message sent successfully!",
        description: `Your message has been saved to ${tableName}. We'll get back to you within 24 hours.`,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        service: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error sending message",
        description: `Failed to save to database. Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getServiceOptions = () => {
    switch (variant) {
      case 'smart-websites':
        return [
          { value: 'landing-page', label: 'Landing Page' },
          { value: 'business-website', label: 'Business Website' },
          { value: 'e-commerce', label: 'E-commerce Site' },
          { value: 'portfolio', label: 'Portfolio Site' },
          { value: 'saas-platform', label: 'SaaS Platform' },
          { value: 'custom-website', label: 'Custom Website' }
        ];
      case 'ai-agents':
        return [
          { value: 'customer-support-bot', label: 'Customer Support Bot' },
          { value: 'sales-assistant', label: 'Sales Assistant' },
          { value: 'booking-agent', label: 'Booking Agent' },
          { value: 'lead-qualification', label: 'Lead Qualification' },
          { value: 'custom-ai-agent', label: 'Custom AI Agent' }
        ];
      default:
        return [
          { value: 'smart-websites', label: 'Smart Websites' },
          { value: 'ai-agents', label: 'AI Agents & Chatbots' },
          { value: 'automation', label: 'Automation Systems' },
          { value: 'custom-ai', label: 'Custom AI Tools' },
          { value: 'consultation', label: 'Consultation' }
        ];
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-card/60 backdrop-blur-xl rounded-xl border border-border/40 hover:border-primary/30 transition-all duration-500 overflow-hidden"
    >
      <div className="relative z-10 p-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">
          {variant === 'smart-websites' ? 'Start Your Website Project' : 
           variant === 'ai-agents' ? 'Build Your AI Agent' : 
           'Get Started Today'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">What are you looking for?</Label>
            <Select
              value={formData.service}
              onValueChange={(value) => handleInputChange('service', value)}
              required
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {getServiceOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              required
              disabled={isSubmitting}
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}

// Hero Section Component
function HeroSection() {
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

// Services Section Component
function ServicesSection({ setCurrentPage }: { setCurrentPage?: (page: string) => void }) {
  const services = [
    {
      icon: Globe,
      decorativeIcon: User,
      title: "Smart Websites",
      description: "Beautiful, responsive websites with integrated AI features that convert visitors into customers",
      features: ["AI-powered chatbots", "Dynamic content", "SEO optimization", "Analytics integration"],
      gradient: "from-blue-500 to-purple-600",
      decorativeGradient: "from-blue-300 to-blue-500",
      decorativeBg: "bg-blue-400",
      page: "smart-websites"
    },
    {
      icon: Bot,
      decorativeIcon: MessageSquare,
      title: "AI Agents & Chatbots",
      description: "Intelligent conversational AI that provides instant customer support and engagement",
      features: ["Natural conversations", "Multi-platform support", "Learning capabilities", "Human handoff"],
      gradient: "from-orange-500 to-red-600",
      decorativeGradient: "from-pink-400 to-pink-600",
      decorativeBg: "bg-pink-500",
      page: "ai-agents"
    },
    {
      icon: Cog,
      decorativeIcon: Settings,
      title: "Automation Systems",
      description: "Streamline operations with intelligent automation that handles repetitive tasks seamlessly",
      features: ["Workflow automation", "Task scheduling", "Error handling", "Performance monitoring"],
      gradient: "from-green-500 to-blue-600",
      decorativeGradient: "from-gray-400 to-gray-600",
      decorativeBg: "bg-gray-500"
    },
    {
      icon: Sparkles,
      decorativeIcon: Zap,
      title: "Custom AI Tools",
      description: "Tailored AI solutions that automate your specific business processes and workflows",
      features: ["Process automation", "Data analysis", "Custom integrations", "24/7 operation"],
      gradient: "from-purple-500 to-pink-600",
      decorativeGradient: "from-green-400 to-green-600",
      decorativeBg: "bg-green-500"
    }
  ];

  const handleServiceClick = (page?: string) => {
    if (page && setCurrentPage) {
      setCurrentPage(page);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From intelligent websites to custom AI solutions, we build technology that works for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-card border border-border rounded-xl p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 hover:border-border/50 min-h-[480px]"
            >
              <div className="flex flex-col h-full">
                {/* Header with Icons and Title */}
                <div className="flex items-start gap-4 mb-6 relative">
                  {/* Main Icon Container */}
                  <div className="relative flex-shrink-0">
                    {/* Primary Service Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-xl`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Decorative Badge - Always visible and prominent */}
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${service.decorativeBg} flex items-center justify-center shadow-lg border-3 border-background z-10 group-hover:scale-110 transition-all duration-300`}>
                      <service.decorativeIcon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-500 group-hover:to-cyan-400 transition-all duration-300 leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="mb-8 flex-1">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  {service.page ? (
                    <Button 
                      variant="outline" 
                      className="w-full group/button border-border hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300"
                      onClick={() => handleServiceClick(service.page)}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full group/button border-border hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300"
                      onClick={() => {
                        const contactElement = document.getElementById('contact');
                        if (contactElement) {
                          contactElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section Component
function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Planning",
      description: "We dive deep into your business needs, goals, and challenges to create a tailored strategy.",
      icon: Target,
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      number: "02",
      title: "Design & Development",
      description: "Our team creates beautiful, functional solutions using the latest AI and web technologies.",
      icon: Code,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      number: "03",
      title: "Testing & Optimization",
      description: "Rigorous testing ensures your solution works perfectly across all devices and scenarios.",
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-600"
    },
    {
      number: "04",
      title: "Launch & Support",
      description: "We launch your solution and provide ongoing support to ensure continued success.",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section id="process" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">Process</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From concept to launch, we follow a proven methodology that delivers exceptional results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative text-center group"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
              )}
              
              {/* Step Number */}
              <div className={`relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white font-bold text-lg shadow-xl group-hover:scale-110 transition-all duration-300`}>
                {step.number}
              </div>
              
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors duration-300">
                  <step.icon className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-500 group-hover:to-cyan-400 transition-all duration-300">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section Component
function FAQSection() {
  const faqs = [
    {
      question: "What makes your AI solutions different?",
      answer: "Our AI solutions are custom-built for your specific needs, not generic templates. We focus on practical applications that solve real business problems and provide measurable ROI."
    },
    {
      question: "How long does it take to build a smart website?",
      answer: "Typically 2-4 weeks depending on complexity. We work in sprints with regular check-ins to ensure we're building exactly what you need."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes! We offer comprehensive support packages including maintenance, updates, and optimization. Your success is our success."
    },
    {
      question: "Can you integrate with existing systems?",
      answer: "Absolutely. We specialize in seamless integrations with CRMs, databases, payment systems, and other business tools you already use."
    },
    {
      question: "What's included in the pricing?",
      answer: "Our pricing includes design, development, testing, deployment, and initial training. We provide transparent, fixed-price quotes with no hidden fees."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get answers to common questions about our services and process
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`} className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Let's discuss your project and create something amazing together
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

// Smart Websites Page Component
function SmartWebsitesPage({ setCurrentPage }: { setCurrentPage?: (page: string) => void }) {
  return (
    <div className="min-h-screen">
      <Navigation setCurrentPage={setCurrentPage} currentPage="smart-websites" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <ThreeDBackground />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Smart{" "}
              <AnimatedTextCycle
                words={["Websites", "Solutions", "Technology", "Innovation"]}
                interval={3000}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400"
              />{" "}
              That Convert
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Beautiful, responsive websites with integrated AI features that turn visitors into customers automatically.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
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
              <Button variant="outline" size="lg" className="group">
                View Examples
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Smart Websites Section */}
      <section id="why-smart-websites" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">Smart Websites</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your website should work as hard as you do. Our smart websites don't just look good - they convert.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Smartphone,
                title: "Mobile-First Design",
                description: "Responsive designs that look perfect on every device, from phones to desktops.",
                gradient: "from-blue-500 to-cyan-600"
              },
              {
                icon: Search,
                title: "SEO Optimized",
                description: "Built-in SEO best practices to help your website rank higher in search results.",
                gradient: "from-purple-500 to-pink-600"
              },
              {
                icon: Bot,
                title: "AI Integration",
                description: "Smart chatbots and AI features that engage visitors and capture leads 24/7.",
                gradient: "from-green-500 to-emerald-600"
              },
              {
                icon: Shield,
                title: "Security First",
                description: "Enterprise-grade security to protect your business and customer data.",
                gradient: "from-orange-500 to-red-600"
              },
              {
                icon: TrendingUp,
                title: "Performance Optimized",
                description: "Lightning-fast loading speeds that improve user experience and conversions.",
                gradient: "from-indigo-500 to-blue-600"
              },
              {
                icon: Lightbulb,
                title: "Smart Analytics",
                description: "Detailed insights into visitor behavior to help you optimize and grow.",
                gradient: "from-yellow-500 to-orange-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:border-border/50"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-500 group-hover:to-cyan-400 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section id="whats-included" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">Included</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need for a successful online presence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "Custom responsive design",
              "AI-powered chatbot",
              "Contact form integration",
              "SEO optimization",
              "Performance optimization",
              "Mobile-first approach",
              "Analytics integration",
              "Security implementation",
              "Content management",
              "Social media integration",
              "Email automation",
              "Ongoing support"
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 p-4 rounded-lg bg-card/50 border border-border/50 hover:bg-card hover:border-border transition-all duration-300"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-foreground font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section id="perfect-for" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Perfect for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">Every Business</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're a startup or established business, our smart websites scale with your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Briefcase,
                title: "Professional Services",
                description: "Lawyers, consultants, agencies, and service providers who need to showcase expertise and capture leads.",
                gradient: "from-blue-500 to-cyan-600"
              },
              {
                icon: Building,
                title: "Local Businesses",
                description: "Restaurants, retail stores, and local services that want to attract more customers online.",
                gradient: "from-purple-500 to-pink-600"
              },
              {
                icon: ShoppingCart,
                title: "E-commerce",
                description: "Online stores that need smart product recommendations and automated customer support.",
                gradient: "from-green-500 to-emerald-600"
              },
              {
                icon: Users,
                title: "SaaS Companies",
                description: "Software companies that need high-converting landing pages and customer onboarding.",
                gradient: "from-orange-500 to-red-600"
              },
              {
                icon: Heart,
                title: "Non-Profits",
                description: "Organizations that want to increase donations and volunteer engagement through smart features.",
                gradient: "from-pink-500 to-rose-600"
              },
              {
                icon: Star,
                title: "Personal Brands",
                description: "Influencers, coaches, and creators who need professional websites that convert followers to customers.",
                gradient: "from-indigo-500 to-purple-600"
              }
            ].map((business, index) => (
              <motion.div
                key={business.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:border-border/50"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${business.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <business.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-500 group-hover:to-cyan-400 transition-all duration-300">
                  {business.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {business.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="smart-websites-contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Let's Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">Smart Website</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your online presence? Let's discuss your project and create something amazing together.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <ContactForm variant="smart-websites" />
          </div>
        </div>
      </section>
    </div>
  );
}

// AI Agents Page Component
function AIAgentsPage({ setCurrentPage }: { setCurrentPage?: (page: string) => void }) {
  return (
    <div className="min-h-screen">
      <Navigation setCurrentPage={setCurrentPage} currentPage="ai-agents" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <ThreeDBackground />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              AI{" "}
              <AnimatedTextCycle
                words={["Agents", "Assistants", "Chatbots", "Intelligence"]}
                interval={3000}
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400"
              />{" "}
              That Work 24/7
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Intelligent conversational AI that provides instant customer support and engagement, never sleeps, and gets smarter over time.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
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
                Build Your AI Agent
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                See Demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section id="why-this-matters" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why This <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">Matters</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your customers expect instant responses. AI agents deliver personalized support at scale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Clock,
                title: "24/7 Availability",
                description: "Never miss a customer inquiry. Your AI agent works around the clock, even when you're sleeping.",
                gradient: "from-purple-500 to-pink-600"
              },
              {
                icon: Users,
                title: "Unlimited Conversations",
                description: "Handle hundreds of customer conversations simultaneously without additional staff costs.",
                gradient: "from-blue-500 to-cyan-600"
              },
              {
                icon: TrendingUp,
                title: "Instant ROI",
                description: "Reduce support costs while increasing customer satisfaction and conversion rates.",
                gradient: "from-green-500 to-emerald-600"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:border-border/50"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-500 group-hover:to-cyan-400 transition-all duration-300">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section id="whats-included" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">Included</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete AI agent solution with everything you need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "Natural language processing",
              "Multi-platform integration",
              "Custom knowledge base",
              "Lead qualification",
              "Appointment booking",
              "CRM integration",
              "Analytics dashboard",
              "Human handoff system",
              "Conversation history",
              "Sentiment analysis",
              "A/B testing",
              "Ongoing optimization"
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 p-4 rounded-lg bg-card/50 border border-border/50 hover:bg-card hover:border-border transition-all duration-300"
              >
                <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <span className="text-foreground font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section id="perfect-for" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Perfect for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">Your Industry</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              AI agents that understand your business and speak your language
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Briefcase,
                title: "Professional Services",
                description: "Qualify leads, schedule consultations, and provide instant answers to common questions.",
                gradient: "from-purple-500 to-pink-600"
              },
              {
                icon: ShoppingCart,
                title: "E-commerce",
                description: "Product recommendations, order tracking, and customer support that increases sales.",
                gradient: "from-blue-500 to-cyan-600"
              },
              {
                icon: Building,
                title: "Real Estate",
                description: "Property inquiries, scheduling viewings, and qualifying potential buyers automatically.",
                gradient: "from-green-500 to-emerald-600"
              },
              {
                icon: Heart,
                title: "Healthcare",
                description: "Appointment scheduling, symptom pre-screening, and patient support within compliance.",
                gradient: "from-red-500 to-pink-600"
              },
              {
                icon: Calendar,
                title: "SaaS & Tech",
                description: "User onboarding, technical support, and feature education that reduces churn.",
                gradient: "from-indigo-500 to-purple-600"
              },
              {
                icon: Users,
                title: "Any Business",
                description: "Custom AI agents tailored to your specific industry, processes, and customer needs.",
                gradient: "from-orange-500 to-red-600"
              }
            ].map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:border-border/50"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${industry.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <industry.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-500 group-hover:to-cyan-400 transition-all duration-300">
                  {industry.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {industry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="ai-agents-contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">AI Agent</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to revolutionize your customer experience? Let's create an AI agent that works for your business.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <ContactForm variant="ai-agents" />
          </div>
        </div>
      </section>
    </div>
  );
}

// Main Website Component
export default function XonaiWebsite() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'smart-websites':
        return <SmartWebsitesPage setCurrentPage={setCurrentPage} />;
      case 'ai-agents':
        return <AIAgentsPage setCurrentPage={setCurrentPage} />;
      default:
        return (
          <div className="min-h-screen">
            <Navigation setCurrentPage={setCurrentPage} currentPage={currentPage} />
            <HeroSection />
            <ServicesSection setCurrentPage={setCurrentPage} />
            <ProcessSection />
            <FAQSection />
            <ContactSection />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {renderPage()}
    </div>
  );
}