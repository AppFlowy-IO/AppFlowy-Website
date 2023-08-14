export const Storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') {
      return null;
    }

    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  },

  set: (key: string, value: string | number | typeof Array | object) => {
    if (typeof window === 'undefined') {
      return;
    }

    const valueString = JSON.stringify(value);

    localStorage.setItem(key, valueString);
  },
};
