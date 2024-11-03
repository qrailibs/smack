/**
 * Create simple typed switch
 * @returns switcher, to create cases
 */
export function switchTyped<TIn, TOut>() {
    return new Switcher<TIn, TOut>();
}

/**
 * Create switch with text values (allows to switch with RegExp)
 * @returns text switcher, to create cases
 */
export function switchText<TIn extends string, TOut>() {
    return new TextSwitcher<TIn, TOut>();
}

class Switcher<TIn, TOut, TCaseHandler = TIn> {
    protected cases: { in: TCaseHandler; out: TOut }[] = [];
    protected default: TOut | undefined = void 0;

    constructor() {}

    public case(when: TCaseHandler, gives: TOut) {
        this.cases.push({ in: when, out: gives });
        return this;
    }

    public otherwise(gives: TOut) {
        this.default = gives;
        return this;
    }

    public with(value: TIn): TOut | undefined {
        for (const _case of this.cases) {
            if ((_case.in as unknown) === (value as unknown)) return _case.out;
        }

        return this.default;
    }
}

class TextSwitcher<TIn extends string, TOut> extends Switcher<TIn, TOut, TIn | RegExp> {
    constructor() {
        super();
    }

    public with(value: TIn): TOut | undefined {
        for (const _case of this.cases) {
            if (typeof _case.in === "string" && _case.in === value) return _case.out;
            else if (_case.in instanceof RegExp && _case.in.test(value)) return _case.out;
        }

        return this.default;
    }
}
