import { ComponentOptions, VNode, PluginObject } from "vue";

import { Debounce } from "./debounce";
import { DebounceContext } from "../types";

const component: ComponentOptions<DebounceContext> = {
    name: "debounce",
    props: ["timeout", "events"],
    data() {
        return {
            eventsKeys: []
        };
    },
    created() {
        this.eventsKeys = this.events.split(",");
    },
    render() {
        const vnode: VNode = this.$slots.default[0];
        const listeners = vnode.componentOptions.listeners;
        this.eventsKeys.forEach(event => {
            const fn = listeners[event];
            if (fn) {
                listeners[event] = Debounce(fn, this.timeout);
            }
        });

        return vnode;
    }
};

const VueDebounce: PluginObject<object> = {
    install(Vue) {
        Vue.component("debounce", component);
    }
};

export default VueDebounce;
