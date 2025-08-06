import { isRecord } from "./isRecord";

// biome-ignore lint/suspicious/noExplicitAny: any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// biome-ignore lint/suspicious/noExplicitAny: any
export function deepMergeObject<T extends Record<string, any>[]>(
  ...objects: T
): UnionToIntersection<T[number]> {
  return objects.reduce((result, current) => {
    return Object.keys(current).reduce((currentResult, key) => {
      if (["__proto__", "constructor", "prototype"].includes(key)) {
        return currentResult;
      }

      const resultValueByKey = result[key];
      const currentValueByKey = current[key];
      currentResult[key] =
        isRecord(resultValueByKey) && isRecord(currentValueByKey)
          ? deepMergeObject(resultValueByKey, currentValueByKey)
          : current[key];
      return currentResult;
    }, result);
  }, {}) as UnionToIntersection<T[number]>;
}
