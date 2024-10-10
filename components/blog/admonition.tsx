import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  InfoCircledIcon,
  ExclamationTriangleIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

export type AdmonitionType = 'info' | 'warning' | 'success' | 'error' | 'default';

export interface AdmonitionProps extends Omit<React.ComponentProps<typeof Alert>, 'variant'> {
  children: React.ReactNode;
  type?: AdmonitionType;
  title?: string;
  icon?: React.ReactNode;
}

const iconMap: Record<AdmonitionType, React.ReactNode> = {
  info: <InfoCircledIcon className='h-5 w-5' />,
  warning: <ExclamationTriangleIcon className='h-5 w-5' />,
  success: <CheckCircledIcon className='h-5 w-5' />,
  error: <CrossCircledIcon className='h-5 w-5' />,
  default: <QuestionMarkCircledIcon className='h-5 w-5' />,
};

const Admonition: React.FC<AdmonitionProps> = ({ children, type = 'default', title, icon, className, ...props }) => {
  const Icon = icon || iconMap[type];

  return (
    <Alert variant='default' className={cn('my-2 rounded-[8px]', className)} {...props}>
      <div className='flex items-start gap-2'>
        <div className='bg-primary-light text-primary-dark my-2 flex h-8 w-8 items-center justify-center rounded-full'>
          {Icon}
        </div>
        {title ? (
          <AlertTitle className='m-0 flex-1 font-medium'>{title}</AlertTitle>
        ) : (
          <AlertDescription>{children}</AlertDescription>
        )}
      </div>
      {title && <AlertDescription className='mt-2'>{children}</AlertDescription>}
    </Alert>
  );
};

export default Admonition;
