import { CSSProperties } from 'react';

export interface CursorPointerIconProps {
  className?: string;
  style?: CSSProperties;
  color?: string;
}

function CursorPointerIcon({ className, style, color = 'currentColor' }: CursorPointerIconProps) {
  return (
    <svg
      width={20}
      height={21}
      viewBox={'0 0 26 27'}
      fill={'none'}
      className={className}
      style={style}
    >
      <path
        d={
          'M1.08301 3.53229C0.611953 1.84823 2.35671 0.480038 3.87891 1.19244L23.8525 10.5411C25.4724 11.2994 25.3646 13.6229 23.6797 14.2266L15.1689 17.2764C15.167 17.2771 15.1657 17.2779 15.165 17.2784L10.6377 25.0059C9.74589 26.5285 7.43745 26.2443 6.95898 24.5342L1.08301 3.53229Z'
        }
        fill={color}
        stroke={'white'}
        strokeWidth={2}
      />
    </svg>
  );
}

export default CursorPointerIcon;
