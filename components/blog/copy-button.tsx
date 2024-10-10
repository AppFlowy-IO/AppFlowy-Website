'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const copyToClipboard = () => {
    if (typeof text === 'string') {
      toast({
        title: '== Copied to clipboard ==',
        description: 'You can now paste the code snippet anywhere',
      });
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      className='absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100'
      onClick={copyToClipboard}
    >
      {copied ? <CheckIcon className='h-4 w-4' /> : <CopyIcon className='h-4 w-4' />}
      <span className='sr-only'>{copied ? 'Copied' : 'Copy code'}</span>
    </Button>
  );
}

export default CopyButton;
