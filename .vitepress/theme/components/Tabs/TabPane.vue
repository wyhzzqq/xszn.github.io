<script setup lang="ts">
import {
    inject,
    onMounted,
    onBeforeUnmount,
    computed,
} from 'vue'
import { TabsKey } from './keys'
import type { TabItem } from './types'

interface Props {
    name: string
    label: string
    disabled?: boolean
    icon?: string
}

const props = defineProps<Props>()

const tabs = inject(TabsKey)

if (!tabs) {
    throw new Error('[TabPane] must be used inside <Tabs>')
}

/**
 * 注册
 */
onMounted(() => {
    tabs.registerTab({
        name: props.name,
        label: props.label,
        disabled: props.disabled,
        icon: props.icon
    } as TabItem)
})

/**
 * 注销
 */
onBeforeUnmount(() => {
    tabs.unregisterTab(props.name)
})

/**
 * 激活状态
 */
const isActive = computed(() => {
    return tabs.activeTab.value === props.name
})
</script>

<template>
    <div v-show="isActive" role="tabpanel">
        <slot />
    </div>
</template>