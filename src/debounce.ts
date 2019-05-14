import Vue from 'vue'

function convertTime(time: string): number {
    const [amt, t = "ms",] = String(time).split(/(ms|s)/i);
    const types = {
        ms: 1,
        s: 1000,
    };

    return Number(amt) * types[t];
}

function Debounce<C = Vue>(fn: Function, delay: string|number = 300): Function {
    const _delay = convertTime(String(delay));
    let timer: NodeJS.Timeout | undefined = undefined;
    return function(...args): void {
        const that: C = this;
        clearTimeout(timer);
        timer = setTimeout((): void=> {
            fn.apply(that, args);
        }, _delay);
    };
}

export { Debounce, };
