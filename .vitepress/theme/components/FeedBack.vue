<template>
    <ClientOnly>
        <div ref="feedbackContainer" />
    </ClientOnly>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const CONFIG = {
    selectors: ['.vp-doc h2'],
    debounce: 120,
    formLinks: {
        en: 'https://docs.google.com/forms/d/e/1FAIpQLSdR9RXzyHJEt_D90EXNZ4js_kLPKttM7iW-usL15eXm2A3ydA/viewform?usp=pp_url', // 英文表单链接
        zh: 'https://docs.google.com/forms/d/e/1FAIpQLSfbRwMDxNzAFzLa6ZSWeH3IhHwS9Lii_tPmr2bAIx8o8kE6vg/viewform?usp=pp_url', // 中文表单链接
        // 你可以继续添加其他语言的表单链接
    },
}

let observer = null
let debounceTimer = null
const injected = new WeakSet()

const feedbackContainer = ref(null)

// Helper function to safely handle values (avoid XSS)
function safeValue(value = '') {
    return String(value).replace(/<[^>]+>/g, '')  // Strip any HTML tags
}

// Get the current language setting from the browser
function getLanguage() {
    // 优先级1：HTML lang 属性
    const htmlLang = document.documentElement.lang
    if (htmlLang) {
        const lang = htmlLang.toLowerCase()
        if (lang.startsWith('zh')) return 'zh'
        if (lang.startsWith('en')) return 'en'
    }

    // 优先级2：浏览器语言
    const browserLang = navigator.language || navigator.userLanguage
    if (browserLang) {
        if (browserLang.startsWith('zh')) return 'zh'
        if (browserLang.startsWith('en')) return 'en'
    }

    // 默认英文
    return 'en'
}

// Construct the feedback form URL based on current language
function getFeedbackFormUrl(h2) {
    const language = getLanguage()  // Get language from browser
    const formBase = CONFIG.formLinks[language]  // Choose the form link based on language

    const pageUrl = window.location.origin + window.location.pathname
    const titleText = h2?.innerText?.trim() || 'Untitled'
    const id = h2.id || titleText.replace(/\s+/g, '-').toLowerCase()
    const fullUrl = `${pageUrl}#${id}`

    // Prepare common params
    const params = new URLSearchParams({
        'entry.303459280': safeValue(titleText),
        'entry.186312065': safeValue(fullUrl),
        t: Date.now(),
    })

    // Add language-specific params for zh
    if (language === 'zh') {
        // 中文表单特有的字段
        params.append('entry.1013056495', safeValue(titleText))  // 中文标题的字段
        params.append('entry.1238370452', safeValue(fullUrl))    // 中文反馈内容字段
    }

    return `${formBase}&${params.toString()}`  // Return the full form URL with params
}

// Open the feedback form in a new window
function openFeedbackForm(h2) {
    const url = getFeedbackFormUrl(h2)  // Get the appropriate URL based on language
    window.open(url, '_blank', 'noopener,noreferrer')  // Open in new tab with security
}

// Create a feedback button and attach it to the heading element
function createButton(h2) {
    if (!h2 || injected.has(h2)) return null

    const btn = document.createElement('span')
    btn.className = 'feedback-btn'
    btn.setAttribute('role', 'button')
    btn.setAttribute('tabindex', '0')
    btn.setAttribute('aria-label', '反馈此章节')
    btn.title = '反馈此章节'

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

// Inject feedback buttons into the headers
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

// Create an observer to handle dynamic content injection
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