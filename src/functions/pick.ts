/**
 * Picks particular keys from objects in array, excluding other keys
 * @param values objects
 * @param keys keys to pick from objects
 * @returns array of objects with only picked keys
 */
export function pickKeys<T extends object>(values: T[], keys: (keyof T)[]): Pick<T, (typeof keys)[number]>[] {
    return values.map((value) => pickKeysOf(value, keys));
}

/**
 * Picks particular keys from object, excluding other keys
 * @param value object
 * @param keys keys to pick from object
 * @returns object with only picked keys
 */
export function pickKeysOf<T extends object>(value: T, keys: (keyof T)[]): Pick<T, (typeof keys)[number]> {
    // Forming a object with ONLY keys from array
    return keys.reduce((acc, key) => {
        // Object has key -> include it
        if (key in value) return { ...acc, [key]: value[key] };
        // Object has no key -> do not include it
        else return acc;
    }, {}) as Pick<T, (typeof keys)[number]>;
}
