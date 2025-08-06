import { type StateCreator, create as zustandCreate } from "zustand";
import type { Store } from "./interface";

export function create<S, A>(initializer: StateCreator<Store<S, A>, [], []>) {
  return zustandCreate<Store<S, A>>(initializer);
}
