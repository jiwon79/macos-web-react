import { create as zustandCreate, StateCreator } from 'zustand';
import { Store } from './interface';

export function create<S, A>(initializer: StateCreator<Store<S, A>, [], []>) {
  return zustandCreate<Store<S, A>>(initializer);
}
