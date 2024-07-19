import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractParamKey(
  params: Record<
    string,
    string | number | string[] | number[] | null | undefined
  >
) {
  let paramkey = "?";
  const keys = Object.keys(params).sort();

  for (const index in keys) {
    const key = keys[index];
    const value = params[key];

    if (!value || (Array.isArray(value) && !value.length)) continue;

    paramkey = paramkey + "$" + key + "=";
    if (Array.isArray(value)) {
      const strValue = value.sort().join(",");
      paramkey = paramkey + strValue;
    } else {
      paramkey = paramkey + value;
    }
  }

  return paramkey;
}

export const isValid = (value: unknown) => {
  return value !== null && value !== undefined;
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay = 500
): ((...params: Parameters<T>) => void) => {
  let isWaiting = false;
  let args: Parameters<T>;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...params: Parameters<T>) => {
    if (isWaiting) {
      args = params;
      if (!timeout)
        timeout = setTimeout(() => {
          isWaiting = false;
          func(...args);
          timeout = null;
        }, delay);
    } else {
      isWaiting = true;

      func(...params);
    }
  };
};
