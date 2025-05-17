/**
 * Generate a random string of a given length.
 * @param length - The length of the string to generate.
 * @returns A random string of the given length.
 */
export const generateRandomString = (length: number = 8) => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};
