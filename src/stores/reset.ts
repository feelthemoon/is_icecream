import { cloneDeep } from "lodash";
import { Store } from "pinia";

export function resetStore({ store }: { store: Store }) {
  const initialState = cloneDeep(store.$state);
  store.$reset = () => store.$patch(cloneDeep(initialState));
}
