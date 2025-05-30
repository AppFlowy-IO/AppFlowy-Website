import { collectEvent, EventName } from '@/lib/collect';
import { webApplicationUrl } from '@/lib/web-application';
import React, { useCallback, useMemo } from 'react';
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
  const item = useMemo(() => navigation.find((item) => item.key === type), [type]);
  const renderPopoverContent = useCallback(() => {
    const children = item?.children;

    return (
      <div className={'menu-popover-content'}>
        {children?.map((group) => (
          <div
            key={group.name}
            className={'group'}
          >
            <div className={'name'}>{group.name}</div>
            {group.children?.map((item) => (
              <Link
                target={item.href?.startsWith('https') ? '_blank' : ''}
                href={item.href || ''}
                key={item.name}
                onClick={debounceClose}
                className={`group-item ${item.image ? 'items-center' : ''}`}
              >
                {item.icon && <div className={'flex h-[24px] w-[24px] items-center justify-center'}>{item.icon}</div>}
                {item.image && (
                  <div className={'group-item-image'}>
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                    />
                  </div>
                )}
                <div className={'item-content'}>
                  <div className={'item-name'}>{item.name}</div>
                  {item.desc && <div className={'item-desc'}>{item.desc}</div>}
                </div>
              </Link>
            ))}
            {group.name === 'Download' && (
              <div className={'w-full overflow-hidden whitespace-pre-wrap px-4 text-sm text-gray-400'}>
                AppFlowy is now in{' '}
                <Link
                  onClick={() => {
                    collectEvent(EventName.downloadBrowserBtn, {
                      type: 'click',
                    });
                  }}
                  className={'hover:text-primary underline'}
                  href={webApplicationUrl}
                >
                  your browser
                </Link>
              </div>
            )}
          </div>
        ))}
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
