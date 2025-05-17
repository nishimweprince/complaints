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

/**
 * Capitalize a string.
 * @param string - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalizeString = (string: string | undefined | null) => {
  if (!string) return '';
  const isCamelCase = /^[a-z]+([A-Z][a-z]*)*$/.test(string);
  if (isCamelCase) return capitalizeCamelCase(string);
  if (string.includes('@')) return string;
  const words = string?.toLowerCase()?.split('_');
  const capitalizedWords =
    words && words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords && capitalizedWords.join(' ');
};

/**
 * Capitalize a camel case string.
 * @param string - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalizeCamelCase(string: string) {
  return string
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, function (str) {
      return str.toUpperCase();
    })
    .trim();
}
