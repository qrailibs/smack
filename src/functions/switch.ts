/**
 * Create simple switch
 * @returns switcher, to create cases
 */
export function switchAny<TIn, TOut>() {
    return new Switcher<TIn, TOut>();
}

/**
 * Create switch with text values (allows to switch with RegExp)
 * @returns text switcher, to create cases
 */
export function switchText<TIn extends string, TOut>() {
    return new TextSwitcher<TIn, TOut>();
}

type TCaseHandler<TIn, TCase> = TCase | ((v: TIn) => boolean);
type TCaseOut<TIn, TOut> = TOut | ((v: TIn) => TOut);

class Switcher<TIn, TOut, TCase = TIn> {
    protected cases: { in: TCaseHandler<TIn, TCase>; out: TCaseOut<TIn, TOut> }[] = [];
    protected default: TCaseOut<TIn, TOut> | undefined = void 0;

    constructor() {}

    public case(when: TCaseHandler<TIn, TCase>, gives: TCaseOut<TIn, TOut>) {
        this.cases.push({ in: when, out: gives });
        return this;
    }

    public otherwise(gives: TOut) {
        this.default = gives;
        return this;
    }

    public with(value: TIn): TOut | undefined {
        for (const _case of this.cases) {
            // Function call check
            if (typeof _case.in === "function") {
                if (!(_case.in as (v: TIn) => boolean)(value)) continue;

                return this.getCaseOut(_case.out, value);
            }
            // Equatation check
            if ((_case.in as unknown) === (value as unknown)) return this.getCaseOut(_case.out, value);
        }

        return this.getDefaultOut(value);
    }

    /**
     * Get out value of case
     */
    protected getCaseOut(gives: TCaseOut<TIn, TOut>, val: TIn) {
        if (typeof gives === "function") return (gives as (v: TIn) => TOut)(val);
        else return gives;
    }
    protected getDefaultOut(val: TIn): TOut | undefined {
        return this.default !== undefined ? this.getCaseOut(this.default, val) : void 0;
    }
}

class TextSwitcher<TIn extends string, TOut> extends Switcher<TIn, TOut, TIn | RegExp> {
    constructor() {
        super();
    }

    public with(value: TIn): TOut | undefined {
        for (const _case of this.cases) {
            // Function call check
            if (typeof _case.in === "function") {
                if (!(_case.in as (v: TIn) => boolean)(value)) continue;

                return this.getCaseOut(_case.out, value);
            }
            // RegExp match check
            else if (typeof _case.in === "string" && _case.in === value) return this.getCaseOut(_case.out, value);
            // Equatation check
            else if (_case.in instanceof RegExp && _case.in.test(value)) return this.getCaseOut(_case.out, value);
        }

        return this.getDefaultOut(value);
    }
}
