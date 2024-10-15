import { colorArray, stringToColor } from '@/lib/utils';
import { Avatar } from '@mui/material';
import React, { useMemo } from 'react';

function stringAvatar(name: string) {
  if (!name) {
    return null;
  }

  return {
    sx: {
      bgcolor: stringToColor(name, colorArray),
    },
    children: `${name.split('')[0]}`,
  };
}

function CreatorAvatar({ src, name }: { src: string; name: string }) {
  const avatarProps = useMemo(() => {
    return stringAvatar(name || '');
  }, [name]);

  return (
    <>
      <div className={'relative h-10 w-10'}>
        <Avatar
          className={'border border-gray-200 object-cover p-2'}
          {...avatarProps}
          sx={{
            ...avatarProps?.sx,
            bgcolor: src ? 'white' : avatarProps?.sx.bgcolor,
          }}
          src={src}
        />
      </div>
    </>
  );
}

export default CreatorAvatar;
