import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Bot, Cog, MessageSquare, User, Sparkles, Settings, Zap } from 'lucide-react';

interface ServicesSectionProps {
  setCurrentPage?: (page: string) => void;
}

export default function ServicesSection({ setCurrentPage }: ServicesSectionProps) {
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