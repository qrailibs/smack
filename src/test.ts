import * as smack from "./index";

console.log(smack.switchText().case(/_+old/g, 1).case("b", 2).case("c", 3).otherwise("none").with("___old"));
