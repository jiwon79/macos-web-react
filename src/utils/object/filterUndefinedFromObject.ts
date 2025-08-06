import { filterObject } from "./filterObject";
import { isNotUndefined } from "./isNotUndefined";

type FilterUndefinedFromObjectResult<T extends object> = {
  [key in keyof T]: NonNullable<T[key]>;
};

export function filterUndefinedFromObject<T extends object>(
  obj: T
): FilterUndefinedFromObjectResult<T> {
  return filterObject(obj, ([, value]) => isNotUndefined(value)) as Record<
    string,
    T
  > as FilterUndefinedFromObjectResult<T>;
}
