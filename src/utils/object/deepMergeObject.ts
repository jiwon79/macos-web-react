import { isRecord } from './isRecord';

type UnionToIntersection<U> =
   
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

export function deepMergeObject<T extends Record<string, any>[]>(
  ...objects: T
): UnionToIntersection<T[number]> {
  return objects.reduce((result, current) => {
    return Object.keys(current).reduce((currentResult, key) => {
      if (['__proto__', 'constructor', 'prototype'].includes(key)) {
        return currentResult;
      }

      const resultValueByKey = result[key];
      const currentValueByKey = current[key];
      return {
        ...currentResult,
        [key]:
          isRecord(resultValueByKey) && isRecord(currentValueByKey)
            ? deepMergeObject(resultValueByKey, currentValueByKey)
            : current[key],
      };
    }, result);
  }, {}) as UnionToIntersection<T[number]>;
}
