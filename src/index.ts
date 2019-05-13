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
    let componentListeners = {};
    let nativeListeners = {};

    // components
    if (vnode.componentOptions) {
      componentListeners = vnode.componentOptions.listeners;
    }

    if (vnode.data && vnode.data.on) {
      nativeListeners = vnode.data.on;
    }
    this.eventsKeys.forEach(event => {
      const cfn = componentListeners[event];
      const nfn = nativeListeners[event];
      if (cfn) {
        componentListeners[event] = Debounce(cfn, this.timeout);
      } else if (nfn) {
        nativeListeners[event] = Debounce(cfn, this.timeout);
      }
    });

    return vnode;
  }
};

const VueDebounce: PluginObject<object> = {
  install(Vue) {
    Vue.component("Debounce", component);
  }
};

export default VueDebounce;
