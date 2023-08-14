import React from 'react';

function GradientCard({
  type,
  children,
  className,
}: {
  type: string | 'purple' | 'gray' | 'blue' | 'yellow' | 'red';
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`gradient-card card-${type} flex h-full w-full flex-1 flex-col items-center overflow-hidden rounded-3xl border ${className}`}
    >
      {children}
    </div>
  );
}

export default GradientCard;
