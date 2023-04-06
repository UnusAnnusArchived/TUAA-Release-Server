import { atom } from "recoil";

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

export const userAtom = atom({
  key: "pocketbase_auth",
  default: undefined,
  effects: [localStorageEffect("pocketbase_auth")],
});
