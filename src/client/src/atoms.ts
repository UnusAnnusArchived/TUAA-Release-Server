import { atom } from "recoil";
import type { IColorScheme, IPocketBaseAuth } from "../../types";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    try {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
    } catch (e) {}
    onSet((newValue) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (e) {}
    });
  };

export const userAtom = atom<IPocketBaseAuth>({
  key: "pocketbase_auth",
  default: undefined,
  effects: [localStorageEffect("pocketbase_auth")],
});

export const colorSchemeAtom = atom<IColorScheme>({
  key: "colorScheme",
  default: "dark",
  effects: [localStorageEffect("colorScheme")],
});

export const hamburgerOpen = atom<boolean>({
  key: "hamburgerOpen",
  default: false,
  effects: [localStorageEffect("hamburgerOpen")],
});
