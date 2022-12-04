import { atom, AtomEffect } from 'recoil';

export type ThemeMode = 'light' | 'dark';

const localStorageEffect =
  (key: string): AtomEffect<ThemeMode> =>
  ({ setSelf, onSet }) => {
    const stored = localStorage.getItem(key);
    if (stored === 'dark' || stored === 'light') {
      setSelf(stored);
    }
    onSet((value, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value || _); // the || is a fail-safe if for any reason value is null the value will revert to default
      }
    });
  };

export const appThemeMode = atom<ThemeMode>({
  key: 'AppThemeMode',
  default: 'dark',
  effects: [localStorageEffect('theme-mode')],
});

export const coinIDState = atom({
  key: "coinId",
  default: "bitcoin"
})