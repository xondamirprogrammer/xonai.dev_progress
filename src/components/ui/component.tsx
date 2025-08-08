"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Globe, Brain, Zap, Bot, Cog, Puzzle, Rocket, MessageSquare, Settings, Sparkles, ArrowRight, Menu, X, Eye, Layers, Code, TrendingUp, ChevronDown, Plus, Minus, Phone, Mail, Send } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

function AnimatedTextCycle({
  words = ["future", "impossible", "extraordinary", "intelligent"],
  interval = 5000,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (measureRef.current) {
      const elements = measureRef.current.children;
      if (elements.length > currentIndex) {
        const newWidth = elements[currentIndex].getBoundingClientRect().width;
        setWidth(`${newWidth}px`);
      }
    }
  }, [currentIndex, words]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  const containerVariants = {
    hidden: {
      y: -20,
      opacity: 0,
      filter: "blur(8px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    },
  };

  return (
    <>
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`font-bold ${className}`}>
            {word}
          </span>
        ))}
      </div>

      <motion.span
        className="relative inline-block"
        animate={{
          width,
          transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 1.2,
          }
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block font-bold ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
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

function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: Math.random() * 2 + 1,
        size: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    particlesRef.current = particles;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;

        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        const scale = 1000 / (1000 - particle.z);
        const x2d = particle.x * scale;
        const y2d = particle.y * scale;
        const size2d = particle.size * scale;

        ctx.globalAlpha = particle.opacity * (particle.z / 1000);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
        ctx.fill();

        particlesRef.current.forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.globalAlpha = 0.1 * (1 - distance / 100);
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(other.x * (1000 / (1000 - other.z)), other.y * (1000 / (1000 - other.z)));
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)' }}
    />
  );
}

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
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-300"
          onClick={handleLogoClick}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">X</span>
          </div>
          <span className="text-xl font-bold text-foreground">xonai.dev</span>
        </div>

        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm lg:text-base">
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

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
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
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <ThreeDBackground />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Build the{" "}
            <AnimatedTextCycle
              words={["future", "impossible", "extraordinary", "intelligent"]}
              interval={3000}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400"
            />{" "}
            with AI
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your business with cutting-edge AI solutions, smart websites, and automation systems that work while you sleep.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <GetStartedButton />
            <Button
              variant="outline"
              size="lg"
              className="group"
              onClick={() => {
                const processElement = document.getElementById('process');
                if (processElement) {
                  processElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              See Our Process
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection({ setCurrentPage }: { setCurrentPage?: (page: string) => void }) {
  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Smart Websites",
      description: "Beautiful, modern websites built with intelligence and style.",
      features: ["Futuristic landing pages", "3D interactive designs", "Portfolios, SaaS, and eCommerce"],
      emoji: "🔮",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Agents & Chatbots",
      description: "Custom GPT-powered bots that talk, think, and take action.",
      features: ["Booking bots, support bots, and sales agents", "Trained on your business data", "Multi-platform deployment"],
      emoji: "🧠",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Automation Systems",
      description: "End-to-end workflows that connect your tools and run your business on autopilot.",
      features: ["CRM + Notion + Google Sheets automation", "Auto-form processing, reminders", "Lead tracking & onboarding logic"],
      emoji: "⚙️",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Puzzle className="w-8 h-8" />,
      title: "Custom AI Tools",
      description: "Custom AI-powered tools built to solve real-world problems with intelligent design.",
      features: ["Summarizers, generators, extractors", "Trained for specific workflows", "Hosted tools or embeddable widgets"],
      emoji: "🧩",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="services" className="relative w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive AI solutions designed to transform your business operations and accelerate growth.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                      {service.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-2xl leading-none">{service.emoji}</div>
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-tight pt-1">{service.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg">{service.description}</p>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Button
                      className="w-full group"
                      variant="outline"
                      onClick={() => {
                        if (service.title === "Smart Websites" && setCurrentPage) {
                          setCurrentPage('smart-websites');
                        } else if (service.title === "AI Agents & Chatbots" && setCurrentPage) {
                          setCurrentPage('ai-agents');
                        } else {
                          const contactElement = document.getElementById('contact');
                          if (contactElement) {
                            contactElement.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function WhatYouGetSection() {
  const deliverables = [
    {
      icon: <Eye className="w-10 h-10" />,
      title: "Vision Alignment",
      description: "Clarify client goals, needs, and automation ideas",
      details: "We start by understanding your unique challenges and opportunities, mapping out a clear roadmap for AI integration.",
      color: "from-blue-500 to-cyan-500",
      step: "01"
    },
    {
      icon: <Layers className="w-10 h-10" />,
      title: "Visual Prototype",
      description: "Present futuristic UI mockups or system blueprints",
      details: "See your solution before it's built with detailed wireframes, mockups, and interactive prototypes.",
      color: "from-purple-500 to-pink-500",
      step: "02"
    },
    {
      icon: <Code className="w-10 h-10" />,
      title: "AI Logic Build",
      description: "Build tailored AI agents, automations, or websites",
      details: "Custom development using cutting-edge AI technologies, perfectly tailored to your specific requirements.",
      color: "from-green-500 to-emerald-500",
      step: "03"
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Launch & Iterate",
      description: "Fast deployment with continuous improvements",
            details: "Fast launch with continuous improvements, monitoring, and real-world performance upgrades.",
      color: "from-orange-500 to-red-500",
      step: "04"
    }
  ];

  return (
    <section id="process" className="relative w-full py-20 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-56 h-56 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-3000"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Our Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text">
            What You Get
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A proven methodology that transforms your vision into reality with precision engineering,
            cutting-edge technology, and continuous innovation at every step.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden xl:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {deliverables.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="relative h-full bg-card/80 backdrop-blur-xl border-border/50 hover:border-primary/30 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-primary/10 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-all duration-700`}></div>

                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                    <span className="text-xs font-bold text-muted-foreground">{item.step}</span>
                  </div>

                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex flex-col items-center text-center space-y-6">
                      <div className="relative">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                          {item.icon}
                        </div>
                        <div className={`absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}></div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 pt-0 pb-8 px-6">
                    <p className="text-muted-foreground/90 text-sm text-center leading-relaxed mb-6">
                      {item.details}
                    </p>

                    <div className="flex justify-center">
                      <div className="relative w-16 h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${item.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </CardContent>

                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center space-x-6 px-8 py-4 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-12 h-px bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-300"></div>
              <div className="w-12 h-px bg-gradient-to-r from-purple-500 to-green-500"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-700"></div>
              <div className="w-12 h-px bg-gradient-to-r from-green-500 to-orange-500"></div>
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => {
              const contactElement = document.getElementById('contact');
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer: "Most projects are completed within 2-4 weeks, depending on complexity. Simple AI chatbots and automations can be delivered in 1-2 weeks, while comprehensive websites with advanced AI features typically take 3-4 weeks. We provide detailed timelines during our initial consultation.",
      icon: <Rocket className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      category: "Timeline"
    },
    {
      question: "Do you only work with startups or also individuals?",
      answer: "We work with everyone! From individual entrepreneurs and freelancers to startups, SMBs, and enterprise clients. Our solutions are scalable and can be tailored to any budget or business size. Whether you're a solopreneur or a growing company, we have the right AI solution for you.",
      icon: <Globe className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      category: "Clients"
    },
    {
      question: "Can I request only AI automation without a full website?",
      answer: "Absolutely! We offer standalone AI automation services including chatbots, workflow automation, CRM integrations, and custom AI tools. You don't need a full website project to benefit from our AI solutions. We can integrate automations into your existing systems and platforms.",
      icon: <Cog className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
      category: "Services"
    },
    {
      question: "Do you offer post-launch support?",
      answer: "Yes, we provide comprehensive post-launch support including bug fixes, performance monitoring, feature updates, and ongoing optimization. We offer flexible support packages ranging from basic maintenance to full-service management, ensuring your AI solutions continue to evolve with your business needs.",
      icon: <Settings className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
      category: "Support"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full py-20 md:py-32 bg-gradient-to-b from-background via-muted/5 to-background overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-60 right-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-3000"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

        <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-primary/15 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-3/4 right-1/5 w-2 h-2 bg-purple-500/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-2.5 h-2.5 bg-cyan-500/15 rounded-full animate-bounce delay-1500"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-green-500/20 rounded-full animate-bounce delay-2000"></div>

        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-cyan-500/10 border border-primary/20 mb-8 backdrop-blur-sm">
            <MessageSquare className="w-5 h-5 text-primary mr-3" />
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">Frequently Asked Questions</span>
            <div className="ml-3 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
            Got Questions?
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
              We've Got Answers
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Everything you need to know about our AI solutions, development process, and how we can transform your business with intelligent automation.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="relative bg-card/60 backdrop-blur-xl border-border/40 hover:border-primary/40 transition-all duration-700 overflow-hidden hover:shadow-2xl hover:shadow-primary/5">
                  <div className={`absolute inset-0 bg-gradient-to-br ${faq.color} opacity-0 group-hover:opacity-5 transition-all duration-700`}></div>

                  <div className="w-full text-left p-6 md:p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-4 flex-1 pr-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${faq.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0 mt-1`}>
                          {faq.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                            {faq.question}
                          </h3>
                          <div className="mt-2 w-16 h-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full group-hover:w-24 transition-all duration-500"></div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-2 ml-4">
                        <div className="px-3 py-1 rounded-full bg-muted/50 backdrop-blur-sm">
                          <span className="text-xs font-medium text-muted-foreground">{faq.category}</span>
                        </div>
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110"
                          aria-expanded={openIndex === index}
                          aria-controls={`faq-answer-${index}`}
                        >
                          <motion.div
                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          >
                            <ChevronDown className="w-5 h-5 text-primary" />
                          </motion.div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8">
                          <div className="ml-16">
                            <div className="w-full h-px bg-gradient-to-r from-border via-primary/30 to-transparent mb-6"></div>
                            <motion.div
                              initial={{ y: -20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -20, opacity: 0 }}
                              transition={{ duration: 0.4, delay: 0.1 }}
                              className="space-y-4"
                            >
                              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                                {faq.answer}
                              </p>
                              <div className="flex items-center space-x-3 pt-2">
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                <span className="text-sm text-primary font-medium">Need more details? Contact our team</span>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${faq.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none blur-xl`}></div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="relative inline-block">
            <Card className="bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-xl border-border/50 p-8 hover:border-primary/40 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-300"></div>
                  <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse delay-700"></div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Still have questions?</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Our AI experts are here to help you find the perfect solution for your business needs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open('https://t.me/M_X_Mirsaidov', '_blank')}
                  >
                    Ask a Question
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="outline" className="group border-primary/30 hover:border-primary/50 hover:bg-primary/5">
                    View Documentation
                    <MessageSquare className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      service: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="relative w-full py-20 md:py-32 bg-gradient-to-b from-background via-muted/10 to-background/50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-cyan-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-green-500/3 rounded-full blur-3xl animate-pulse delay-3000"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-primary/10 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-3/4 right-1/6 w-1.5 h-1.5 bg-purple-500/15 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-2.5 h-2.5 bg-cyan-500/10 rounded-full animate-bounce delay-1500"></div>

        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/5 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-cyan-500/10 border border-primary/20 mb-8 backdrop-blur-sm">
            <Send className="w-5 h-5 text-primary mr-3" />
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">Get In Touch</span>
            <div className="ml-3 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Let's build something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
              smart
            </span>{" "}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tell us what you need, and we'll get back to you.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/60 backdrop-blur-xl border-border/40 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Name
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder-muted-foreground"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder-muted-foreground"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                          What are you looking for?
                        </label>
                        <Select onValueChange={handleSelectChange} value={formData.service}>
                          <SelectTrigger className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border">
                            <SelectItem value="ai-automation">AI Automation</SelectItem>
                            <SelectItem value="website">Website</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                            <SelectItem value="something-else">Something Else</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder-muted-foreground resize-none"
                          placeholder="Tell us about your project..."
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                      size="lg"
                    >
                      Send Message
                      <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </form>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-8">Get in touch directly</h3>

                <div className="space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-card/40 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a
                        href="tel:+998901326467"
                        className="text-foreground font-medium hover:text-primary transition-colors duration-300"
                      >
                        +998901326467
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-card/40 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href="mailto:xmirsaidov5@gmail.com?subject=Project%20Inquiry&body=Hello,%20I'm%20interested%20in%20your%20AI%20services..."
                        className="text-foreground font-medium hover:text-primary transition-colors duration-300"
                      >
                        xmirsaidov5@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-card/40 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telegram</p>
                      <a
                        href="https://t.me/M_X_Mirsaidov"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground font-medium hover:text-primary transition-colors duration-300"
                      >
                        @M_X_Mirsaidov
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-r from-card/60 via-card/40 to-card/60 backdrop-blur-xl border-border/40 p-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-lg"></div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-primary">Available for new projects</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      We typically respond within 24 hours. For urgent inquiries,
                      reach out via Telegram for the fastest response.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Smart Websites Page Component
function SmartWebsitesPage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Navigation setCurrentPage={setCurrentPage} currentPage="smart-websites" />
      <SmartWebsitesHero />
      <WhySmartWebsites />
      <WhatsIncluded />
      <PerfectFor />
      <SmartWebsitesContact />
    </div>
  );
}

// AI Agents & Chatbots Page Component
function AIAgentsPage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Navigation setCurrentPage={setCurrentPage} currentPage="ai-agents" />
      <AIAgentsHero />
      <WhyThisMatters />
      <AIAgentsIncluded />
      <AIAgentsPerfectFor />
      <AIAgentsContact />
    </div>
  );
}

// AI Agents Hero Section
function AIAgentsHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ThreeDBackground />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 mb-8 backdrop-blur-sm">
            <Brain className="w-5 h-5 text-purple-400 mr-3" />
            <span className="text-sm font-semibold text-purple-400 tracking-wide uppercase">AI Agents & Chatbots</span>
            <div className="ml-3 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
              AI Agents & Chatbots
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Custom GPT-powered bots that talk, think, and take action.
          </p>

          <div className="mb-12 max-w-2xl mx-auto">
            <ul className="space-y-4 text-lg text-muted-foreground">
              <li className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Lead qualification bots, support bots, and booking bots</span>
              </li>
              <li className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span>Trained on your business data</span>
              </li>
              <li className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Multi-platform deployment</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4"
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
            <Button variant="outline" size="lg" className="group border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/5 px-8 py-4"
             onClick={() => {
                const includedElement = document.getElementById('whats-included');
                if (includedElement) {
                  includedElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}>
              What's Included
              <Eye className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Why This Matters Section
function WhyThisMatters() {
  return (
    <section id="why-this-matters" className="relative py-20 md:py-32 bg-gradient-to-b from-background via-muted/10 to-background overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Smarter Conversations. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Real Results.</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We build bots that actually understand your business — answering questions, qualifying leads, and automating workflows with precision. No canned responses. Just intelligent automation tailored to your brand.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// AI Agents What's Included Section
function AIAgentsIncluded() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "GPT-Powered Brain",
      description: "Custom-trained models on your own data."
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "Booking & Lead Capture",
      description: "Book appointments or qualify leads in real time."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Omni-Channel Support",
      description: "Deploy on websites, Telegram, WhatsApp, etc."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Custom UI Integration",
      description: "Embed seamlessly into your website."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Secure Data Handling",
      description: "Privacy-first architecture with clear control."
    }
  ];

  return (
    <section id="whats-included" className="relative py-20 md:py-32 bg-gradient-to-b from-background via-muted/5 to-background overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            What's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Included</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need for intelligent automation that understands your business and converts visitors into customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="relative h-full bg-card/30 backdrop-blur-sm border-border/20 hover:border-primary/30 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardContent className="relative z-10 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// AI Agents Perfect For Section
function AIAgentsPerfectFor() {
  const clientTypes = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Solo Founders",
      description: "Automate first response & capture leads 24/7.",
      color: "from-purple-500 to-pink-500",
      emoji: "🚀"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Startups",
      description: "Save time on support, qualify faster.",
      color: "from-pink-500 to-purple-500",
      emoji: "📈"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Learning Centers",
      description: "Answer common questions with ease.",
      color: "from-purple-500 to-blue-500",
      emoji: "🎓"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Marketplaces",
      description: "Help customers navigate and convert faster.",
      color: "from-blue-500 to-purple-500",
      emoji: "?️"
    }
  ];

  return (
    <section id="perfect-for" className="relative py-20 md:py-32 bg-gradient-to-b from-background via-muted/10 to-background overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">For</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            AI agents designed for businesses that want to automate intelligently and scale efficiently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {clientTypes.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="relative h-full bg-card/40 backdrop-blur-xl border-border/30 hover:border-primary/40 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-primary/10 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${client.color} opacity-0 group-hover:opacity-10 transition-all duration-700`}></div>

                <CardContent className="relative z-10 p-6 text-center">
                  <div className="flex flex-col items-center space-y-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${client.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {client.icon}
                    </div>
                    <div className="text-3xl">{client.emoji}</div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {client.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {client.description}
                  </p>
                </CardContent>

                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// AI Agents Contact Section
function AIAgentsContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    need: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      need: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('AI Agents Contact Form submitted:', formData);
    // Add actual form submission logic here (e.g., API call)
    alert('Thank you for your inquiry! We will get back to you within 12 hours.');
    setFormData({
      name: '',
      email: '',
      need: '',
      message: ''
    });
  };

  return (
    <section id="ai-agents-contact" className="relative py-20 md:py-32 bg-gradient-to-b from-background via-muted/10 to-background/50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40