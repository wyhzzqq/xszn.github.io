import type { InjectionKey, Ref } from "vue";
import type { TabItem } from "./types";

export interface TabsContext {
  activeTab: Ref<string>;
  registerTab: (tab: TabItem) => void;
  unregisterTab: (name: string) => void;
  setActive: (name: string) => void;
}

export const TabsKey: InjectionKey<TabsContext> = Symbol("Tabs");
