import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  InfoCircledIcon,
  ExclamationTriangleIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

export type AdmonitionType = 'info' | 'warning' | 'success' | 'error' | 'default';

export interface AdmonitionProps extends Omit<React.ComponentProps<typeof Alert>, 'variant'> {
  content: string;
  type?: AdmonitionType;
  icon?: React.ReactNode;
}

const iconMap: Record<AdmonitionType, React.ReactNode> = {
  info: <InfoCircledIcon className='h-5 w-5' />,
  warning: <ExclamationTriangleIcon className='h-5 w-5' />,
  success: <CheckCircledIcon className='h-5 w-5' />,
  error: <CrossCircledIcon className='h-5 w-5' />,
  default: <QuestionMarkCircledIcon className='h-5 w-5' />,
};

const Admonition: React.FC<AdmonitionProps> = ({ content, type = 'default', icon, className, ...props }) => {
  const Icon = icon || iconMap[type];

  return (
    <Alert variant='default' className={cn('my-2 rounded-[8px]', className)} {...props}>
      <div className='flex items-start gap-2'>
        <div className='bg-primary-light text-primary-dark mt-[13px] flex h-8 w-8 items-center justify-center rounded-full'>
          {Icon}
        </div>
        {
          <AlertDescription>
            <ReactMarkdown>{content}</ReactMarkdown>
          </AlertDescription>
        }
      </div>
    </Alert>
  );
};

export default Admonition;
