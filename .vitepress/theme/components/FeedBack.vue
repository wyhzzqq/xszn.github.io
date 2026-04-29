<template>
    <ClientOnly>
        <div ref="feedbackContainer" />
    </ClientOnly>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const I18N = {
    zh: {
        label: '点击反馈此章节内容',
        title: '反馈此章节',
    },
    en: {
        label: 'Click to give feedback on this section',
        title: 'Give feedback',
    },
}

const CONFIG = {
    selectors: ['.vp-doc h2'],
    debounce: 120,
    formLinks: {
        en: 'https://docs.google.com/forms/d/e/1FAIpQLSdR9RXzyHJEt_D90EXNZ4js_kLPKttM7iW-usL15eXm2A3ydA/viewform?usp=pp_url',
        zh: 'https://docs.google.com/forms/d/e/1FAIpQLSfbRwMDxNzAFzLa6ZSWeH3IhHwS9Lii_tPmr2bAIx8o8kE6vg/viewform?usp=pp_url',
    },
    fieldMapping: {
        en: {
            title: 'entry.303459280',
            url: 'entry.186312065',
        },
        zh: {
            title: 'entry.1013056495',
            url: 'entry.1238370452',
        },
    },
}

let observer = null
let debounceTimer = null
const injected = new WeakSet()

const feedbackContainer = ref(null)

function safeValue(value = '') {
    return String(value).replace(/<[^>]+>/g, '')
}

function getLanguage() {
    const htmlLang = document.documentElement.lang
    if (htmlLang) {
        const lang = htmlLang.toLowerCase()
        if (lang.startsWith('zh')) return 'zh'
        if (lang.startsWith('en')) return 'en'
    }

    const browserLang = navigator.language || navigator.userLanguage
    if (browserLang) {
        if (browserLang.startsWith('zh')) return 'zh'
        if (browserLang.startsWith('en')) return 'en'
    }

    return 'en'
}

function getFeedbackFormUrl(h2) {
    const language = getLanguage()
    const formBase = CONFIG.formLinks[language]

    const pageUrl = window.location.origin + window.location.pathname
    const titleText = h2?.innerText?.trim() || 'Untitled'
    const id = h2.id || titleText.replace(/\s+/g, '-').toLowerCase()
    const fullUrl = `${pageUrl}#${id}`

    const params = new URLSearchParams()
    const mapping = CONFIG.fieldMapping[language] || CONFIG.fieldMapping.en

    Object.entries(mapping).forEach(([key, entryId]) => {
        if (key === 'title') {
            params.append(entryId, safeValue(titleText))
        } else if (key === 'url') {
            params.append(entryId, safeValue(fullUrl))
        } else {
            params.append(entryId, safeValue(titleText))
        }
    })

    params.append('t', Date.now())

    return `${formBase}&${params.toString()}`
}

function openFeedbackForm(h2) {
    const url = getFeedbackFormUrl(h2)
    if (url) {
        window.open(url, '_blank', 'noopener,noreferrer')
    }
}

function createButton(h2) {
    if (!h2 || injected.has(h2)) return null

    const i18n = I18N[getLanguage()] || I18N.en
    const btn = document.createElement('span')
    btn.className = 'feedback-btn'
    btn.setAttribute('role', 'button')
    btn.setAttribute('tabindex', '0')
    btn.setAttribute('aria-label', i18n.label)
    btn.title = i18n.title

    btn.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
</svg>
`

    btn.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        openFeedbackForm(h2)
    })

    injected.add(h2)
    return btn
}

function inject() {
    const headers = document.querySelectorAll(CONFIG.selectors.join(','))

    headers.forEach((h2) => {
        if (!h2) return
        if (h2.querySelector('.feedback-btn')) return

        const btn = createButton(h2)
        if (!btn) return

        const anchor = h2.querySelector('.header-anchor')
        if (anchor) {
            anchor.insertAdjacentElement('afterend', btn)
        } else {
            h2.appendChild(btn)
        }
    })
}

function createObserver() {
    const root = document.querySelector('.vp-doc') || document.body
    observer = new MutationObserver(() => {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            inject()
        }, CONFIG.debounce)
    })

    observer.observe(root, { childList: true, subtree: true })
}

onMounted(() => {
    setTimeout(inject, 100)
    createObserver()
})

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect()
        observer = null
    }
    clearTimeout(debounceTimer)
})

defineExpose({
    config: CONFIG,
})
</script>

<style>
.feedback-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.2s ease;
    vertical-align: middle;
    line-height: 1;
    color: var(--hero-alt);
}

.feedback-btn:hover {
    color: var(--hero-brand);
    opacity: 1;
}
</style>