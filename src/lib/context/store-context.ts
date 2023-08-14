import { createContext, useContext } from 'react';
import { Store } from '@/lib/interface';
import { createStore } from '@/lib/store';

export const StateContext = createContext<Store>(createStore());

export const useStateContext = () => {
  const state = useContext(StateContext);

  return state;
};
