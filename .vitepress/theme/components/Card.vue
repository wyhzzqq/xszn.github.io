<template>
    <div class="vp-raw">
        <fwb-card :href="link" target="_blank">
            <div class="p-5 flex flex-col gap-2">
                <div class="flex flex-row items-center gap-2">
                    <fwb-avatar bordered :img="icon" />
                    <h5 class="text-base font-bold tracking-tight text-gray-900 dark:text-white">
                        {{ title }}
                    </h5>
                </div>
                <p class="font-normal text-gray-700 dark:text-gray-400 truncate">
                    {{ details }}
                </p>
            </div>
        </fwb-card>
    </div>
</template>

<script setup>
import { FwbAvatar, FwbCard } from './index'

defineProps({
    icon: String,
    title: String,
    details: String,
    link: String
})
</script>