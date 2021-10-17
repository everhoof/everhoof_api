export const Utils = {
  getDate(): string {
    const today = new Date();
    const dd = String(today.getUTCDate()).padStart(2, '0');
    const mm = String(today.getUTCMonth() + 1).padStart(2, '0');
    const yyyy = today.getUTCFullYear();

    return `${yyyy}-${mm}-${dd}`;
  },

  getRandomString(length = 64): string {
    // eslint-disable-next-line unicorn/new-for-builtins
    return Array(length)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
  },
};
