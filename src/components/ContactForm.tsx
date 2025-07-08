import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase, type ContactInsert, type SmartWebsitesContactInsert, type AIAgentsContactInsert } from "@/lib/supabase";
import { Send, Loader2 } from 'lucide-react';

interface ContactFormProps {
  variant?: 'default' | 'smart-websites' | 'ai-agents';
}

type FormDataType = ContactInsert | SmartWebsitesContactInsert | AIAgentsContactInsert;

export default function ContactForm({ variant = 'default' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormDataType, value: string) => {
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

      const { data, error } = await supabase
        .from(tableName)
        .insert([formData])
        .select();
        
      if (error) {
        throw error;
      }

      // Success
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
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
        description: "Please try again or contact us directly.",
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