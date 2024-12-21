// Copied from this StackOverflow answer: https://stackoverflow.com/a/57688223/19020549
export const excerpt = (string = "", maxLength = 400) =>
  string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;
