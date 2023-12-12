import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const storeAtom = atomWithStorage("value", false);

export function useStore() {
  return useAtom(storeAtom);
}
