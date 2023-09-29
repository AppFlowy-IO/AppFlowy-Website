import { createContext } from 'react';

export const GitContext = createContext<
  | {
      stars?: number;
      lastVersion?: string;
    }
  | undefined
>(undefined);
