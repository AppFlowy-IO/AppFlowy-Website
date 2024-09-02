import React from 'react';
import { Fade } from '@mui/material';

export function TabPanel(props: { children: React.ReactNode; value: string; index: string }) {
  const { children, value, index } = props;

  return (
    <Fade in={value === index} timeout={400}>
      <div
        style={{
          display: value === index ? 'flex' : 'none',
        }}
        className={`tab-panel tab-panel-${index}`}
      >
        {children}
      </div>
    </Fade>
  );
}
