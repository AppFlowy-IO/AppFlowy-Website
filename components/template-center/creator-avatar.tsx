import { Avatar } from '@mui/material';
import React, { useMemo } from 'react';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;

    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  if (!name) {
    return null;
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
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
      <div className={'relative h-10 w-10 cursor-pointer'}>
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
