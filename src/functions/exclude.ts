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

/**
 * Excludes particular values from objects in array
 * @param value objects
 * @param values values to exclude from objects
 * @returns array of objects, without excluded values
 */
export function excludeValues<T extends object, TOut>(value: T[], values: unknown[]): TOut[] {
    return value.map((item) => excludeValuesOf<T, TOut>(item, values));
}

/**
 * Excludes particular values from object
 * @param value object
 * @param values values to exclude from object
 * @returns object, without excluded values
 */
export function excludeValuesOf<T extends object, TOut = unknown>(value: T, values: unknown[]): TOut {
    // Forming a object WITHOUT values from array
    return Object.keys(value)
        .filter((key) => !values.includes(value[key as keyof T]))
        .reduce((acc, key) => ({ ...acc, [key]: value[key as keyof T] }), {}) as TOut;
}
