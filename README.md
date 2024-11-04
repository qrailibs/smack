# smack

Library to simplify and shorten your complex code. Shorthands to work with objects, arrays, etc.

## Pick

You can use pick functions like you use it in TypeScript – to pick particular keys in objects:

```ts
import { pickKeysOf, pickKeys } from "@proxymal/smack";

pickKeysOf(
    {
        a: 1,
        b: 2,
        c: 3,
    },
    ["a", "c"]
); // { a: 1, c: 3 }

pickKeys(
    [
        { a: 1, b: 2, c: 3 },
        { a: 4, b: 5, c: 6 },
        { a: 7, b: 8, c: 9 },
    ],
    ["a", "c"]
); // [{ a: 1, c: 3 }, { a: 4, c: 6 }, { a: 7, c: 9 }]
```

## Exclude

Exclude functions works like pick, but instead excludes keys from objects:

```ts
import { excludeKeysOf, excludeKeys } from "@proxymal/smack";

excludeKeysOf(
    {
        a: 1,
        b: 2,
        c: 3,
    },
    ["a", "c"]
); // { b: 2 }

excludeKeys(
    [
        { a: 1, b: 2, c: 3 },
        { a: 4, b: 5, c: 6 },
        { a: 7, b: 8, c: 9 },
    ],
    ["a", "c"]
); // [{ b: 2 }, { b: 5 }, { b: 8 }]
```

## Switch

You can use `switchAny` function to make fully-typed and flexible switches:

```ts
import { switchAny } from "@proxymal/smack";

switchAny<number, string>()
    .case(1, "value was 1")
    // you can also check value with function
    .case((v) => v >= 10 && v <= 20, "value was between 10 and 20")
    .case(
        (v) => v % 100 === 0,
        // you can also output value based on input
        (v) => `value was really big: ${v}`
    )
    // value that will be used if no cases matched
    .otherwise("idk what was value")
    .with(2000); // value was really big: 2000
```

You can use `switchText` function to make switches with support of regexp cases:

```ts
import { switchText } from "@proxymal/smack";

switchText<string, string>()
    // you can pass regexp to match text
    .case(/a.+/g, "starts with 'a'")
    .with("digma"); // starts with 'd': "digma"
```
