'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { usePricingState } from './pricing-state-context';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
  inquiryType: string;
  userCount: string;
  currentPlan: string;
  deploymentMode: string;
  source: string;
}

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const cloudInquiryTypes = ['Pricing Questions', 'General Support'];

const selfHostedInquiryTypes = [
  'Pricing Questions',
  'Enterprise Plan',
  'Custom Deployment',
  'Volume Discount', 
  'General Support'
];

const cloudPlans = [
  'Free',
  'Pro',
  'Not using AppFlowy yet'
];

const selfHostedPlans = [
  'Free',
  'Seed ($1/month)',
  'One ($6/month)', 
  'Team ($10/seat/month)',
  'Enterprise (Custom)',
  'Not using AppFlowy yet'
];



// Custom Radix Select component
function CustomSelect({ 
  value, 
  onValueChange, 
  placeholder, 
  options,
  label 
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: string[];
  label: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8427E0] focus:border-transparent bg-white flex items-center justify-between">
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="bg-white rounded-[8px] border border-gray-200 shadow-lg z-50">
            <Select.Viewport className="p-1">
              {options.map((option) => (
                <Select.Item
                  key={option}
                  value={option}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 focus:bg-[#8427E0] focus:text-white rounded-[4px] outline-none"
                >
                  <Select.ItemText>{option}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const { deploymentMode } = usePricingState();
  
  // Convert deployment mode to display format
  const getDisplayDeploymentMode = (mode: string) => {
    return mode === 'self-hosted' ? 'AppFlowy Self-hosted' : 'AppFlowy Cloud';
  };
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    inquiryType: '',
    userCount: '',
    currentPlan: '',
    deploymentMode: getDisplayDeploymentMode(deploymentMode),
    source: searchParams.get('source') || 'pricing-page'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOptionalFields, setShowOptionalFields] = useState(true);

  const formRef = useRef<HTMLFormElement>(null);

  // Auto scroll to bottom when expanding optional fields
  const handleToggleOptionalFields = () => {
    setShowOptionalFields(!showOptionalFields);
    
    if (!showOptionalFields) {
      // Scroll to bottom when expanding
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.scrollTo({
            top: formRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100); // Wait for animation to start
    }
  };

  // Update form data when deployment mode changes from context
  useEffect(() => {
    setFormData(prev => ({ 
      ...prev, 
      deploymentMode: getDisplayDeploymentMode(deploymentMode),
      currentPlan: '', // Reset current plan when deployment mode changes
      inquiryType: '' // Reset inquiry type when deployment mode changes
    }));
  }, [deploymentMode]);

  // Set source parameter from URL
  useEffect(() => {
    const sourceParam = searchParams.get('source') || 'pricing-page';

    setFormData(prev => ({ ...prev, source: sourceParam }));
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert display deployment mode to API format
      const apiDeploymentMode = formData.deploymentMode === 'AppFlowy Self-hosted' ? 'self-hosted' : 'cloud';

      // Only submit fields with values
      const submitData: Partial<FormData> = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
        deploymentMode: apiDeploymentMode,
        source: formData.source,
      };

      // Only add optional fields with values
      if (formData.inquiryType && formData.inquiryType !== 'Pricing Questions') {
        submitData.inquiryType = formData.inquiryType;
      }

      if (formData.userCount && formData.userCount.trim() !== '') {
        submitData.userCount = formData.userCount;
      }

      if (formData.currentPlan && formData.currentPlan !== 'Not using AppFlowy yet') {
        submitData.currentPlan = formData.currentPlan;
      }

      const response = await fetch('/api/pricing-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!', {
          description: "We'll get back to you as soon as possible.",
          duration: 4000,
          style: {
            background: 'white',
            border: '1px solid #10b981',
            color: '#065f46',
          },
        });
        handleClose();
      } else {
        toast.error('Failed to send message', {
          description: 'Please try again later.',
          duration: 4000,
          style: {
            background: 'white',
            border: '1px solid #ef4444',
            color: '#dc2626',
          },
        });
        // Don't close dialog on failure, just show toast
      }
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please check your connection and try again.',
        duration: 4000,
        style: {
          background: 'white',
          border: '1px solid #ef4444',
          color: '#dc2626',
        },
      });
      // Don't close dialog on failure, just show toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Check if we need to clear URL parameters
    const hasAction = searchParams.has('action');
    const hasSource = searchParams.has('source');

    if (hasAction || hasSource) {
      // Clear URL parameters only if they exist
      const params = new URLSearchParams(searchParams);

      params.delete('action');
      params.delete('source');
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;

      router.replace(newUrl, { scroll: false });
    }

    // Reset form with current deployment mode from context
    const sourceParam = searchParams.get('source') || 'pricing-page';

    setFormData({
      name: '',
      email: '',
      company: '',
      message: '',
      inquiryType: '',
      userCount: '',
      currentPlan: '',
      deploymentMode: getDisplayDeploymentMode(deploymentMode),
      source: sourceParam,
    });
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content 
          ref={dialogContentRef}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] sm:w-[calc(100%-64px)] md:w-full max-w-[560px] bg-white rounded-[15px] z-50 flex flex-col" 
          style={{ 
            height: 'calc(100vh - 240px)',
            maxHeight: '600px',
            top: 'calc(50% + 60px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col h-full"
          >
            {/* Fixed Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <Dialog.Title className="text-2xl font-semibold text-gray-900">
                Contact Support
              </Dialog.Title>
              <Dialog.Close asChild>
                <button 
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  onClick={handleClose}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>

            {/* Scrollable Form Content */}
            <form 
              id="contact-form"
              ref={formRef}
              onSubmit={handleSubmit} 
              className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-4"
            >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-[#8427E0]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8427E0] focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-[#8427E0]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8427E0] focus:border-transparent"
                      placeholder="your@company.com"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company <span className="text-[#8427E0]">*</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8427E0] focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-[#8427E0]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8427E0] focus:border-transparent resize-none"
                      placeholder="Please describe your inquiry in detail..."
                    />
                  </div>

                  {/* Optional Fields Divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <button
                      type="button"
                      onClick={handleToggleOptionalFields}
                      className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <span>Optional Information</span>
                      <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                        {showOptionalFields ? (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </div>
                    </button>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>

                  {/* Optional Fields */}
                  <AnimatePresence>
                    {showOptionalFields && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.1, ease: 'easeInOut' }}
                        className="space-y-4 overflow-hidden px-0.5 py-0.5"
                      >
                        {/* Deployment Mode */}
                        <CustomSelect
                          value={formData.deploymentMode}
                          onValueChange={(value) => setFormData(prev => ({ 
                            ...prev, 
                            deploymentMode: value,
                            currentPlan: '', // Reset current plan when deployment mode changes
                            inquiryType: '' // Reset inquiry type when deployment mode changes
                          }))}
                          placeholder="Select deployment mode..."
                          options={['AppFlowy Cloud', 'AppFlowy Self-hosted']}
                          label="Deployment Mode"
                        />

                        {/* Inquiry Type */}
                        <CustomSelect
                          value={formData.inquiryType}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, inquiryType: value }))}
                          placeholder="Select inquiry type..."
                          options={formData.deploymentMode === 'AppFlowy Cloud' ? cloudInquiryTypes : selfHostedInquiryTypes}
                          label="Inquiry Type"
                        />

                        {/* User Count */}
                        <div>
                          <label htmlFor="userCount" className="block text-sm font-medium text-gray-700 mb-1">
                            User Count
                          </label>
                          <input
                            id="userCount"
                            name="userCount"
                            type="number"
                            value={formData.userCount}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8427E0] focus:border-transparent"
                            placeholder="e.g. 50"
                          />
                        </div>

                        {/* Current Plan */}
                        <CustomSelect
                          value={formData.currentPlan}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, currentPlan: value }))}
                          placeholder="Select current plan..."
                          options={formData.deploymentMode === 'AppFlowy Cloud' ? cloudPlans : selfHostedPlans}
                          label="Current Plan"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                </form>

                {/* Fixed Footer with Submit Button */}
                <div className="border-t border-gray-200 p-4 sm:p-6 flex-shrink-0">
                  <button
                    type="submit"
                    form="contact-form"
                    disabled={isSubmitting}
                    className="w-full bg-[#8427E0] text-white font-medium py-3 px-4 rounded-[8px] hover:bg-[#7020C7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}