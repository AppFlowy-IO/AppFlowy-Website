import React from 'react';
import { Item } from '@/lib/config/navigation';
import { useRouter } from 'next/navigation';

function NavbarItem({
  item,
  onMouseEnter,
  onMouseLeave,
}: {
  item: Item;
  onMouseEnter: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const { href, children } = item;
  const router = useRouter();

  return (
    <button
      onClick={
        href
          ? () => {
              router.push(href);
            }
          : undefined
      }
      className={`navigation-item navigation-item-${item.key}`}
      onMouseEnter={children ? onMouseEnter : undefined}
      onMouseLeave={children ? onMouseLeave : undefined}
    >
      {item.name}
    </button>
  );
}

export default NavbarItem;
