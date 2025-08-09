"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  Menu, 
  X, 
  Globe, 
  Bot, 
  Cog, 
  Sparkles, 
  Check, 
  Star, 
  Users, 
  Zap, 
  Shield, 
  Clock, 
  MessageSquare, 
  User, 
  Settings, 
  Send,
  Loader2,
  Brain,
  Target,
  Rocket,
  Code,
  Palette,
  Search,
  BarChart,
  Smartphone,
  Monitor,
  Headphones,
  FileText,
  Database,
  Cpu,
  Network,
  TrendingUp,
  Award,
  Coffee,
  Heart,
  Briefcase,
  GraduationCap,
  ShoppingCart,
  Camera,
  Music,
  Gamepad2,
  Plane,
  Home as HomeIcon,
  Car,
  Utensils,
  Dumbbell,
  Book,
  Stethoscope,
  Scale,
  Hammer,
  Shirt,
  Gift,
  Flower,
  Palette as PaletteIcon
} from 'lucide-react';

// Contact Form Component
function ContactForm({ variant = 'default', className = '' }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
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
      let tableName;
      
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

  return (
    <Card className={`bg-card/60 backdrop-blur-xl border-border/40 hover:border-primary/30 transition-all duration-500 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder-muted-foreground"
                placeholder="Your name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder-muted-foreground"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                What are you looking for?
              </Label>
              <Select onValueChange={(value) => handleInputChange('service', value)} value={formData.service}>
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
              <Label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder-muted-foreground resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
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
    </Card>
  );
}

export default function XonaiWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Your existing website content */}
    </div>
  );
}