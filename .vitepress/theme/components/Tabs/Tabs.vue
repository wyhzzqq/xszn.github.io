<script setup lang="ts">
import { provide, ref, watch, computed, onBeforeUnmount } from 'vue'
import type { TabItem } from './types'
import { TabsKey } from './keys'

interface Props {
    modelValue?: string
    direction?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
    direction: 'horizontal'
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const activeTab = ref(props.modelValue || '')
const tabs = ref(new Map<string, TabItem>())

/**
 * icon 安全校验
 */
function isValidIcon(icon?: string) {
    if (!icon) return true
    return /^\/images\/[a-zA-Z0-9\-_/\.]+$/.test(icon)
}

/**
 * 注册
 */
function registerTab(tab: TabItem) {
    if (!tab?.name) {
        console.warn('[Tabs] Tab must have a name')
        return
    }

    if (tabs.value.has(tab.name)) {
        console.warn(`[Tabs] Duplicate tab: ${tab.name}`)
        return
    }

    if (!isValidIcon(tab.icon)) {
        console.warn(`[Tabs] Invalid icon: ${tab.icon}`)
        tab.icon = ''
    }

    tabs.value.set(tab.name, Object.freeze({ ...tab }))

    if (!activeTab.value) {
        activeTab.value = tab.name
    }
}

/**
 * 注销
 */
function unregisterTab(name: string) {
    tabs.value.delete(name)

    if (activeTab.value === name) {
        const first = tabs.value.keys().next().value
        activeTab.value = first || ''
    }
}

/**
 * 切换
 */
function setActive(name: string) {
    const target = tabs.value.get(name)

    if (!target) {
        console.warn(`[Tabs] Tab not found: ${name}`)
        return
    }

    if (target.disabled) return

    activeTab.value = name
    emit('update:modelValue', name)
}

/**
 * 键盘导航
 */
function onKeydown(e: KeyboardEvent) {
    const keys = Array.from(tabs.value.keys())
    const index = keys.indexOf(activeTab.value)

    if (e.key === 'ArrowRight') {
        setActive(keys[index + 1] || keys[0])
    }

    if (e.key === 'ArrowLeft') {
        setActive(keys[index - 1] || keys[keys.length - 1])
    }
}

/**
 * v-model 同步
 */
watch(
    () => props.modelValue,
    (val) => {
        if (val && val !== activeTab.value) {
            setActive(val)
        }
    }
)

const tabList = computed(() => Array.from(tabs.value.values()))

provide(TabsKey, {
    activeTab,
    registerTab,
    unregisterTab,
    setActive
})

onBeforeUnmount(() => {
    tabs.value.clear()
})
</script>

<template>
    <div class="vp-tabs" :class="`is-${direction}`">
        <!-- nav -->
        <div class="vp-tabs__nav" role="tablist" tabindex="0" @keydown="onKeydown">
            <button v-for="tab in tabList" :key="tab.name" role="tab" :aria-selected="tab.name === activeTab" :class="[
                'vp-tabs__tab',
                { 'is-active': tab.name === activeTab },
                { 'is-disabled': tab.disabled }
            ]" @click="setActive(tab.name)" :disabled="tab.disabled">
                <!-- 自定义 header -->
                <slot name="tab" :tab="tab" :active="tab.name === activeTab">
                    <img v-if="tab.icon" :src="tab.icon" class="vp-tabs__icon" loading="lazy" />
                    <span>{{ tab.label }}</span>
                </slot>
            </button>
        </div>

        <!-- content -->
        <div class="vp-tabs__content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.vp-tabs__nav {
    display: flex;
    border-bottom: 1px solid #eee;
}

.vp-tabs.is-vertical .vp-tabs__nav {
    flex-direction: column;
    border-bottom: none;
    border-right: 1px solid #eee;
}

.vp-tabs__tab {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: none;
    border: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
}

.vp-tabs__tab.is-active {
    border-bottom: 2px solid var(--hero-alt);
    color: var(--hero-alt);
}

.vp-tabs.is-vertical .vp-tabs__tab.is-active {
    border-bottom: none;
    border-right: 2px solid var(--hero-alt);
}

.vp-tabs__tab.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.vp-tabs__icon {
    width: 24px;
    height: 24px;
}

@media (min-width: 1440px) {
    .vp-tabs {
        height: 572px;
    }
}

@media (max-width: 1024px) and (min-width: 769px) {
    .vp-tabs {
        height: 536px;
    }
}

@media (max-width: 768px) and (min-width: 426px) {
    .vp-tabs {
        height: 572px;
    }
}

@media (max-width: 425px) and (min-width: 376px) {
    .vp-tabs {
        height: 397.06px;
    }
}

@media (max-width: 375px) and (min-width: 321px) {
    .vp-tabs {
        height: 396.94px;
    }
}

@media (max-width: 320px) {
    .vp-tabs {
        height: 432px;
    }
}
</style>