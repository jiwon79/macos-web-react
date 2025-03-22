export function uniq<T>(array: T[]) {
  return [...new Set(array)];
}
