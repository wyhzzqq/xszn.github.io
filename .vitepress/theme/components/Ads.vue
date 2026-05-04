<script setup>
import { useData } from 'vitepress'

const { theme } = useData()
</script>

<template>
  <div class="ads">
    <span>
      <span>
        <a :href="theme.ads.link" target="_blank" rel="noreferrer sponsored">
          <img :src="theme.ads.image" :alt="theme.ads.alt" />
          <span class="ads-text">{{ theme.ads.details }}</span>
        </a>
      </span>
      <span class="ads-poweredby" v-if="theme.ads.link">Sponsored Ad</span>
      <span class="ads-poweredby" v-else>
        <a :href="theme.ads.sponsor">
          <span class="ads-text">Become a sponsor</span>
        </a>
      </span>
    </span>
  </div>
</template>

<style scoped>
.ads {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  border-radius: 12px;
  min-height: 256px;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  font-weight: 500;
  background-color: var(--vp-carbon-ads-bg-color);
}

.ads :deep(img) {
  margin: 0 auto;
  border-radius: 6px;
}

.ads :deep(.ads-text) {
  display: block;
  margin: 0 auto;
  padding-top: 12px;
  color: var(--vp-carbon-ads-text-color);
  transition: color 0.25s;
}

.ads :deep(.ads-text:hover) {
  color: var(--vp-carbon-ads-hover-text-color);
}

.ads :deep(.ads-poweredby) {
  display: block;
  padding-top: 6px;
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-carbon-ads-poweredby-color);
  text-transform: uppercase;
  transition: color 0.25s;
}

.ads :deep(.ads-poweredby:hover) {
  color: var(--vp-carbon-ads-hover-poweredby-color);
}

.ads :deep(> div) {
  display: none;
}

.ads :deep(> div:first-of-type) {
  display: block;
}
</style>
