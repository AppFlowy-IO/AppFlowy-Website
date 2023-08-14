import { Store } from '@/lib/interface';
import { createSlice, useSelector } from '@/lib/store/index';

export const useSelectorNewVersionState = () => useSelector((state) => state.newVersionState);

export const newVersionSlice = createSlice({
  name: 'newVersion',
  reducers: {
    open: (state: Store, payload: string) => {
      state.newVersionState.show = true;
      state.newVersionState.version = payload;
    },

    close: (state: Store) => {
      state.newVersionState.show = false;
    },
  },
});

export const newVersionActions = newVersionSlice.actions;
