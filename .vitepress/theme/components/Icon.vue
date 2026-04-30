<script setup>
defineProps({
    text: String,
    href: String,
    src: String
})
</script>

<template>
    <a v-if="href" :href="href" target="_blank" rel="noreferrer" :title="src">
        <i :class="'bi bi-' + src"></i>
        <span>&nbsp;{{ text }}</span>
    </a>
    <i v-else :class="'bi bi-' + src"></i>
</template>

<style scoped>
a {
    text-decoration: none !important;
}
</style>