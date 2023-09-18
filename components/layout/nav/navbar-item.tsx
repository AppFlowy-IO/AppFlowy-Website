import React from 'react';
import Link from 'next/link';
import { Item } from '@/lib/config/navigation';

function NavbarItem({
  item,
  onMouseEnter,
  onMouseLeave,
}: {
  item: Item;
  onMouseEnter: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const { href, name } = item;

  return href ? (
    <Link className={'navigation-item'} href={href}>
      {name}
    </Link>
  ) : (
    <button
      className={`navigation-item navigation-item-${item.key}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {item.name}
    </button>
  );
}

export default NavbarItem;
