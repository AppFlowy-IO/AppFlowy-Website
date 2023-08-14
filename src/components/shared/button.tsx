import React, { HTMLAttributes, useMemo } from 'react';

function Button({
  children,
  type,
  danger,
  ...buttonProps
}: {
  type: 'contained' | 'outlined' | 'text';
  danger?: boolean;
  children: React.ReactNode;
} & HTMLAttributes<HTMLButtonElement>) {
  const styleCls = useMemo(() => {
    switch (type) {
      case 'contained':
        return `${
          danger ? 'bg-danger border-danger-hover:text-danger' : 'bg-primary border-primary hover:text-primary'
        } text-text-on-fill border hover:bg-transparent shadow-button`;
      case 'outlined':
        return `${
          danger ? 'border-danger text-danger hover:bg-danger' : 'border-primary text-primary hover:bg-primary'
        } bg-transparent border hover:text-text-on-fill shadow-button`;
      case 'text':
        return `${danger ? 'text-danger hover:bg-danger-100' : 'text-primary hover:bg-primary-100'} bg-transparent`;
    }
  }, [danger, type]);

  return (
    <button
      {...buttonProps}
      className={`rounded-2xl p-1.5 px-4 transition-all ${styleCls} ${buttonProps.className || ''}`}
    >
      {children}
    </button>
  );
}

export default Button;
