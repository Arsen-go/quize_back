export const generateRandomString = (length = 8): string =>
  Math.random()
    .toString(36)
    .slice(length * -1);
