import MuiButton, { ButtonProps } from '@mui/material/Button';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const fontSize = {
  small: '0.875rem',
  medium: '1rem',
  large: '1.25rem',
};

export default function Button({ variant = 'text', color = 'primary', ...props }: ButtonProps) {
  return (
    <MuiButton
      {...props}
      variant={variant}
      color={color}
      className={`rounded-2xl shadow-none ${props.className} ${inter.className}`}
      style={{
        backgroundColor: `var(--button-${color}-${variant}-background)`,
      }}
      sx={{
        fontWeight: 400,
        textTransform: 'none',
        padding: '0.9em 1.5em',
        fontSize: fontSize[props.size || 'medium'],
        color: `var(--button-${color}-${variant}-text)`,
        border: `1px solid var(--button-${color}-${variant}-border)`,
        '&:hover': {
          backgroundColor: `var(--button-${color}-${variant}-hover-background) !important`,
          color: `var(--button-${color}-${variant}-hover-text)`,
        },
        ...props.sx,
      }}
    >
      {props.children}
    </MuiButton>
  );
}
