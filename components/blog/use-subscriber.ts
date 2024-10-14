import { useToast } from '@/hooks/use-toast';
import { createHubSpotSubscriber } from '@/lib/hubspotAPI';
import React from 'react';

export function useSubscriber() {
  const [email, setEmail] = React.useState('');
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      await createHubSpotSubscriber(email);
      toast({
        title: 'Subscribed successfully',
        description: 'Thank you for subscribing',
      });
      setEmail('');
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to subscribe, please try again',
      });
    }
  };

  return {
    email,
    setEmail,
    handleSubscribe,
  };
}
