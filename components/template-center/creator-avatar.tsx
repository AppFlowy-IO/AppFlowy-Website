import { Avatar } from '@mui/material';
import React, { useMemo } from 'react';

export function stringToColor(string: string, colorArray?: string[]) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  if (colorArray) {
    return colorArray[string.slice(0, 1).charCodeAt(0) % colorArray.length];
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;

    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const colorArray = [
  '#5287D8',
  '#6E9DE3',
  '#8BB3ED',
  '#A7C9F7',
  '#979EB6',
  '#A2A8BF',
  '#ACB2C8',
  '#C1C7DA',
  '#E8AF53',
  '#E6C25A',
  '#E6D26F',
  '#E6E288',
  '#589599',
  '#68AD8E',
  '#79C47F',
  '#8CDB6A',
  '#AA94DC',
  '#C49EEB',
  '#BAACEE',
  '#D5C4FB',
  '#F597D2',
  '#FCB2E3',
  '#FDC5E8',
  '#F8D2E1',
  '#D1D269',
  '#C7C98D',
  '#CED09B',
  '#DAD9B6',
  '#DDD2C6',
  '#DDD6C7',
  '#EADED3',
  '#FED5C4',
  '#72A7D8',
  '#8FCAE3',
  '#64B3DA',
  '#52B2D4',
  '#90A4FF',
  '#A8BEF4',
  '#AEBDFF',
  '#C2CDFF',
  '#86C1B7',
  '#A6D8D0',
  '#A7D7A8',
  '#C8E4C9',
  '#FF9494',
  '#FFBDBD',
  '#DCA8A8',
  '#E3C4C4',
];

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
