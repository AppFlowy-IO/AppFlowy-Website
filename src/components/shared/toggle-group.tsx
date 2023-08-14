'use client';
import React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';

const toggleGroupItemClasses =
  'hover:bg-primary-100 text-primary data-[state=on]:bg-primary data-[state=on]:text-text-on-fill flex h-[60px] w-[60px] items-center justify-center text-base leading-4 rounded-xl';

export default function ToggleGroup({
  elements,
  ...props
}: { elements: React.ReactNode[] } & ToggleGroupSingleProps & React.RefAttributes<HTMLDivElement>) {
  return (
    <ToggleGroupPrimitive.Root
      className='bg-body inline-flex space-x-px rounded-xl opacity-40'
      defaultValue='0'
      {...props}
    >
      {elements.map((element, index) => (
        <ToggleGroupPrimitive.Item
          key={index}
          className={toggleGroupItemClasses}
          value={String(index)}
          aria-label='Left aligned'
        >
          {element}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  );
}
