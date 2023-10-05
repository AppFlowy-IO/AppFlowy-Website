import { createContext, useContext } from 'react';

export const DarkContext = createContext<boolean | undefined>(undefined);

export const useDarkContext = () => {
  return useContext(DarkContext) || false;
};
