import React from 'react';
import { Item } from '@/lib/config/navigation';
import { useRouter } from 'next/navigation';
import ExpandMore from '@/components/icons/expand-more';

function NavbarItem({
  item,
  onMouseEnter,
  onMouseLeave,
  isPopoverOpen,
}: {
  item: Item;
  onMouseEnter: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isPopoverOpen?: boolean;
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
      {children ? (
        <span className={`${isPopoverOpen ? 'expand-icon rotated' : 'expand-icon'}`}>
          <ExpandMore />
        </span>
      ) : ''
      }
    </button>
  );
}

export default NavbarItem;
