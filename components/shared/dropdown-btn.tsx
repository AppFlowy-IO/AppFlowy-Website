import { Button } from '@/components/ui/button';
import React, { useEffect, useRef, useState } from 'react';
import Popover from '@mui/material/Popover';
import { List, MenuItem } from '@mui/material';

function DropdownBtn({
  title,
  extension,
  extensionOptions,
  onClick,
  disabled,
}: {
  title: React.ReactNode;
  extension?: string;
  extensionOptions?: {
    label: string;
    value: string;
  }[];
  disabled?: boolean;
  onClick?: (option: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setAnchorEl(null);
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`dropdown-btn ${disabled ? 'disabled' : ''}`}
    >
      <Button
        size={'2xl'}
        onClick={() => {
          extension && onClick?.(extension);
        }}
        className={`download-btn dropdown-btn__title`}
      >
        {title} .{extension}
      </Button>

      <div
        onClick={() => {
          setAnchorEl(ref.current);
        }}
        className={`download-btn dropdown-btn__file-extension ${open ? 'active' : ''}`}
      >
        <div className={`dropdown-btn__expand-icon ${open ? 'rotate-180' : ''}`}>
          <svg
            viewBox="0 0 24 24"
            className="h-full w-full"
          >
            <path
              fill="currentColor"
              d="M19.004 9h-14l7 8 7-8z"
            ></path>
          </svg>
        </div>
      </div>
      <Popover
        sx={{
          boxShadow: 'none',
          pointerEvents: 'auto',
        }}
        slotProps={{
          paper: {
            className: `dropdown-btn__popover-paper`,
            style: {
              width: ref.current?.clientWidth,
            },
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: -10,
          horizontal: 'right',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <List className={'dropdown-btn__extension-options'}>
          {extensionOptions?.map((option) => (
            <MenuItem
              selected={option.value === extension}
              onClick={() => onClick?.(option.value)}
              key={option.value}
              className={'dropdown-btn__extension-option'}
            >
              {option.label}
            </MenuItem>
          ))}
        </List>
      </Popover>
    </div>
  );
}

export default DropdownBtn;
