import Vue from "vue";

export interface DebounceContext extends Vue {
    timeout: string | number;
    events: string;
    eventsKey: string[];
}

export function install (vue: typeof Vue, options: object): void