import React, { useCallback, useMemo } from 'react';
import Popover from '@/components/shared/popover';
import { navigation } from '@/lib/config/navigation';
import { DebouncedFunc } from 'lodash-es';
import Link from 'next/link';
import FeaturedCarousel from '@/components/layout/nav/featured-carousel';

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
  const item = useMemo(() => navigation.find((item) => item.key === type), [type]);
  const renderPopoverContent = useCallback(() => {
    const children = item?.children;

    return (
      <div className={'menu-popover-content'}>
        {children?.map((group) =>
          group.key === 'featured' ? (
            <div
              key={group.name}
              className={'group featured'}
            >
              <FeaturedCarousel
                items={group.children || []}
                onNavigate={debounceClose}
              />
            </div>
          ) : (
            <div
              key={group.name}
              className={'group'}
            >
              <p className='py-3 px-6 text-style-h5 font-bold'>{group.name}</p>
              {group.children?.map((item) => (
                <Link
                  target={item.href?.startsWith('https') ? '_blank' : ''}
                  href={item.href || ''}
                  key={item.name}
                  onClick={debounceClose}
                  className={`group-item ${item.desc ? '' : 'items-center'}`}
                >
                  {item.icon && <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#d6d6d6] bg-white'>{item.icon}</div>}
                  <div className='ml-[16px] flex max-w-[280px] flex-col justify-center'>
                    <p className='font-medium'>{item.name}</p>
                    {item.desc && <div className='text-sm text-gray-400'>{item.desc}</div>}
                  </div>
                </Link>
              ))}

            </div>
          )
        )}
      </div>
    );
  }, [item, debounceClose]);

  return (
    <Popover
      open={open}
      disableAutoFocus={true}
      disableRestoreFocus={true}
      transformOrigin={{
        vertical: -10,
        horizontal: item?.placement || 'center',
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: item?.placement || 'center',
      }}
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
