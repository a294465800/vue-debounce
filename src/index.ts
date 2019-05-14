import { ComponentOptions, VNode, PluginObject } from "vue";

import { Debounce } from "./debounce";
import { DebounceContext } from "../types";

const component: ComponentOptions<DebounceContext> = {
    name: "debounce",
    props: ["timeout", "events"],
    data(): object {
        return {
            eventsKeys: []
        };
    },
    created(): void {
        this.eventsKeys = Array.isArray(this.events) ? this.events : [this.events];
    },
    render(): VNode {
        const vnode: VNode = this.$slots.default[0];
        let componentListeners = {};
        let nativeListeners = {};

        // components
        if (vnode.componentOptions) {
            componentListeners = vnode.componentOptions.listeners;
        }

        if (vnode.data && vnode.data.on) {
            nativeListeners = vnode.data.on;
        }
        this.eventsKeys.forEach(
            (event): void => {
                const cfn = componentListeners[event];
                const nfn = nativeListeners[event];
                if (cfn) {
                    componentListeners[event] = Debounce(cfn, this.timeout);
                } else if (nfn) {
                    nativeListeners[event] = Debounce(nfn, this.timeout);
                }
            }
        );

        return vnode;
    }
};

const VueDebounce: PluginObject<object> = {
    install(Vue): void {
        Vue.component("Debounce", component);
    }
};

export default VueDebounce;
