import React from 'react';
import { Grow } from '@mui/material';

export function TabPanel(props: { children: React.ReactNode; value: string; index: string }) {
  const { children, value, index } = props;

  return (
    <Grow in={value === index} timeout={500}>
      <div
        style={{
          display: value === index ? 'flex' : 'none',
        }}
        className={`tab-panel tab-panel-${index}`}
      >
        {children}
      </div>
    </Grow>
  );
}
