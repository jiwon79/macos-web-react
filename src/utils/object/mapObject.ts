type ValueOf<T> = T[keyof T];

export function mapObject<
  T extends object,
  NewKey extends string | number | symbol,
  NewValue
>(
  obj: T,
  map: (value: [keyof T, ValueOf<T>], index: number) => [NewKey, NewValue]
): Record<NewKey, NewValue> {
  return (Object.entries(obj) as [keyof T, ValueOf<T>][]).reduce(
    (result, current, index) => {
      const [key, value] = map(current, index);
      result[key] = value;
      return result;
    },
    {} as Record<NewKey, NewValue>
  );
}
