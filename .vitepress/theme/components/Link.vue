<script setup>
import { computed } from 'vue'

const props = defineProps({
    href: {
        type: String,
        required: true
    },
    target: {
        type: String,
        default: '_blank'
    },
    rel: {
        type: String,
        default: 'noopener noreferrer nofollow'
    }
})

/* 可扩展域名规则 */
const DOMAIN_RULES = {
    'github.com': (url) => url.pathname + url.search
}

/* URL 标准化 */
function normalizeUrl(url) {
    if (!/^https?:\/\//i.test(url)) {
        return 'https://' + url
    }
    return url
}

/* 协议安全检查 */
function isSafeProtocol(urlObj) {
    return ['http:', 'https:'].includes(urlObj.protocol)
}

/* punycode 解码 */
function decodePunycode(domain) {
    const punycodeRegex = /xn--([a-zA-Z0-9]+)/g

    return domain.replace(punycodeRegex, (match, encoded) => {
        try {
            return decodeURIComponent(
                '%' + encoded.replace(/([a-fA-F0-9]{2})/g, '$1%')
            )
        } catch {
            return match
        }
    })
}

/* 计算显示文本 */
const displayText = computed(() => {
    try {
        const normalized = normalizeUrl(props.href)
        const parsedUrl = new URL(normalized)

        if (!isSafeProtocol(parsedUrl)) {
            return props.href
        }

        const rule = DOMAIN_RULES[parsedUrl.hostname]

        if (rule) {
            return rule(parsedUrl)
        }

        let url = normalized.replace(/^https?:\/\//i, '')

        url = decodePunycode(url)

        return url.replace(/\/.*$/, '')

    } catch {
        return props.href
    }
})
</script>

<template>
    <span :href="href" :target="target" :rel="rel" :title="href">
        <slot>
            {{ displayText }}
        </slot>
    </span>
</template>