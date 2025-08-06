import { filterObject } from "./filterObject";

export function omitObject<T extends object>(obj: T, keys: (keyof T)[]): T {
  return filterObject(obj, ([key]) => !keys.includes(key));
}
