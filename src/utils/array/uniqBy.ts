export function uniqBy<T>(array: T[], fn: (item: T) => string): T[] {
  const set = new Set<string>();

  return array.filter((item) => {
    const key = fn(item);
    if (set.has(key)) {
      return false;
    }
    set.add(key);
    return true;
  });
}
