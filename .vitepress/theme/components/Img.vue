<script setup>
import { FwbImg } from './index'

defineProps({
    alt: String,
    caption: String,
    src: String
})
</script>

<template>
    <div class="vp-raw">
        <fwb-img :alt="alt" :caption="alt" :src="src" />
    </div>
</template>

<style scoped>
.vp-tabs__content img {
    border-radius: 12px;
}
</style>
