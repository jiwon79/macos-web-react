type ValueOf<T> = T[keyof T];

export function filterObject<T extends object>(
  obj: T,
  filter: (value: [keyof T, ValueOf<T>]) => boolean
): T {
  return (Object.entries(obj) as [keyof T, ValueOf<T>][]).reduce(
    (result, current) => {
      if (!filter(current)) {
        return result;
      }

      result[current[0]] = current[1];
      return result;
    },
    {} as T
  );
}
