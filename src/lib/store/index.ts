import { proxy, useSnapshot } from 'valtio';
import { Store } from '@/lib/interface';
import { useCallback, useContext } from 'react';
import { ActionTypes, Payload, Reducer } from '@/lib/store/interface';
import { StateContext, useStateContext } from '@/lib/context/store-context';

export function createStore() {
  const store = proxy<Store>({
    newVersionState: {
      version: '',
      show: false,
    },
  });

  return store;
}

const actionsTypes: ActionTypes = {};

export function createSlice<TReducers extends Reducer>({ name, reducers }: { name: string; reducers: TReducers }) {
  type ActionsType = {
    [K in keyof TReducers]: (payload?: Parameters<TReducers[K]>[1]) => {
      type: string;
      payload?: Parameters<TReducers[K]>[1];
    };
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const actions: ActionsType = {};

  Object.entries(reducers).forEach(([funcName, func]) => {
    const type = `${name}_${funcName}`.toUpperCase();

    actionsTypes[type] = func;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    actions[funcName] = (payload) => ({
      type,
      payload,
    });
  });
  return {
    actions,
  };
}

export function useDispatch() {
  const store = useContext(StateContext);
  const dispatch = useCallback(
    (action: { type: string; payload?: Payload }) => {
      actionsTypes[action.type].apply(undefined, [store, action.payload]);
    },
    [store]
  );

  return dispatch;
}

export function useSelector<T extends object>(selector: (state: Store) => T) {
  const store = useStateContext();
  const state = selector(store);

  return useSnapshot(state);
}
