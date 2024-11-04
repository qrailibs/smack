import * as smack from "./index";

console.log(
    smack
        .switchText<string, string>()
        .case(/a.+/g, "starts with 'a'")
        .case("b", "matched 'b'")
        .case(
            (v) => v.startsWith("d"),
            (v) => `starts with 'd': "${v}"`
        )
        .otherwise("not matched any")
        .with("digma")
);
