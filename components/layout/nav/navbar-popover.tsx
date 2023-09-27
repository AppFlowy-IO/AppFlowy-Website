import React, { useCallback } from 'react';
import Popover from '@/components/shared/popover';
import { navigation } from '@/lib/config/navigation';
import { DebouncedFunc } from 'lodash-es';
import Link from 'next/link';

function NavbarPopover({
  anchorEl,
  setAnchorEl,
  debounceClose,
  type,
}: {
  debounceClose: DebouncedFunc<() => void>;
  setAnchorEl: (anchorEl?: HTMLButtonElement) => void;
  anchorEl?: HTMLButtonElement;
  type?: string;
}) {
  const open = Boolean(anchorEl);
  const renderPopoverContent = useCallback(() => {
    const children = navigation.find((item) => item.key === type)?.children;

    return (
      <div className={'menu-popover-content'}>
        {children?.map((group) => (
          <div key={group.name} className={'group'}>
            <div className={'name'}>{group.name}</div>
            {group.children?.map((item) => (
              <Link
                target={item.href?.startsWith('https') ? '_blank' : ''}
                href={item.href || ''}
                key={item.name}
                className={`group-item ${item.image ? 'items-center' : ''}`}
              >
                {item.icon && <div className={'h-[24px] w-[24px]'}>{item.icon}</div>}
                {item.image && (
                  <div className={'group-item-image'}>
                    <img src={item.image.src} alt={item.image.alt} />
                  </div>
                )}
                <div className={'item-content'}>
                  <div className={'item-name'}>{item.name}</div>
                  <div className={'item-desc'}>{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    );
  }, [type]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(undefined)}
      onMouseEnterPaper={() => debounceClose.cancel()}
      onMouseLeavePaper={() => debounceClose()}
    >
      {renderPopoverContent()}
    </Popover>
  );
}

export default NavbarPopover;
