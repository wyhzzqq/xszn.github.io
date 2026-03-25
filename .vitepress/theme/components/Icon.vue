<script setup>
defineProps({
    href: String,
    src: String
})
</script>

<template>
    <a v-if="href" :href="href" target="_blank" rel="noreferrer" :title="src">
        <i :class="'bi bi-' + src"></i>
    </a>
    <i v-else :class="'bi bi-' + src"></i>
</template>