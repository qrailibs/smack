/**
 * Excludes particular keys from objects in array
 * @param values objects
 * @param keys keys to exclude from objects
 * @returns array of objects, without excluded keys
 */
export function excludeKeys<T extends object>(values: T[], keys: (keyof T)[]): Omit<T, (typeof keys)[number]>[] {
    return values.map((value) => excludeKeysOf(value, keys));
}

/**
 * Excludes particular keys from object
 * @param value object
 * @param keys keys to exclude from object
 * @returns object, without excluded keys
 */
export function excludeKeysOf<T extends object>(value: T, keys: (keyof T)[]): Omit<T, (typeof keys)[number]> {
    // Forming a object WITHOUT keys from array
    return Object.keys(value)
        .filter((key) => !keys.includes(key as keyof T))
        .reduce((acc, key) => ({ ...acc, [key]: value[key as keyof T] }), {}) as Omit<T, (typeof keys)[number]>;
}
