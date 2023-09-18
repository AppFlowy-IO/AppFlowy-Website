import React from 'react';

function Focus({ color = 'var(--color-primary)' }: { color?: string }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 54 54' fill='none'>
      <path d='M27 3L27 18' stroke={color} strokeWidth='5' strokeLinecap='square' />
      <path d='M27 36L27 51' stroke={color} strokeWidth='5' strokeLinecap='square' />
      <path d='M51 27L36 27' stroke={color} strokeWidth='5' strokeLinecap='square' />
      <path d='M18 27L3 27' stroke={color} strokeWidth='5' strokeLinecap='square' />
    </svg>
  );
}

export default Focus;
