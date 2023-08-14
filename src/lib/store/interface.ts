import { Store } from '@/lib/interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Payload = any;
export interface Reducer {
  [key: string]: ReducerFunction<Payload>;
}

export type ReducerFunction<TPayload> = (state: Store, payload: TPayload) => void;

type ActionFunction<TPayload> = (state: Store, payload: TPayload) => void;

export type ActionTypes = {
  [key: string]: ActionFunction<Payload>;
};
