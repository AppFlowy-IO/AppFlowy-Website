import { createContext } from 'react';

export const GitContext = createContext<
  | {
      stars?: number;
      lastVersion?: string;
      visitedLatestVersion?: string;
    }
  | undefined
>(undefined);
