'use client';

import Apple from '@mui/icons-material/Apple';
import Window from '@mui/icons-material/Window';
import Linux from '@mui/icons-material/Google';

export default function Icon({ name, size }: { name: string; size: number }) {
  switch (name) {
    case 'macos':
      return (
        <Apple
          sx={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      );
    case 'windows':
      return (
        <Window
          sx={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      );
    case 'linux':
      return (
        <Linux
          sx={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      );
    default:
      return null;
  }
}
