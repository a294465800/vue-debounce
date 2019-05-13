import Vue from "vue";

export interface DebounceContext extends Vue {
    timeout: string | number
    events: string
    eventsKey: string[]
}