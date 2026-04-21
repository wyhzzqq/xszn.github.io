---
giscus: false
next: false
---

# 更新日志

增加新软件记录。

::: tip
2026 年 5 月初增加国际化支持、文档列表布局，将添加多个软件列表，敬请期待。
:::

<ul v-for="log of changelog.filter(item => 
    typeof item.frontmatter.date === 'string'
)">
    <li>
        {{ log.frontmatter.date.slice(0, 10) }}：<a :href="log.url">{{ log.url.replace(/\.html$/, '') }}</a>
    </li>
</ul>

<script setup>
import { data as changelog } from '../../.vitepress/theme/data/changelog.data.js'
</script>
