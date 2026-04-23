<template>
    <ClientOnly>
        <div ref="feedbackContainer" />
    </ClientOnly>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

/**
 * =========================
 * CONFIG
 * =========================
 */
const CONFIG = {
    selectors: ['.vp-doc h2'],
    debounce: 120,
    formBase:
        'https://docs.google.com/forms/d/e/1FAIpQLSdR9RXzyHJEt_D90EXNZ4js_kLPKttM7iW-usL15eXm2A3ydA/viewform?usp=pp_url',
}

/**
 * =========================
 * STATE
 * =========================
 */
let observer = null
let debounceTimer = null
const injected = new WeakSet()

const feedbackContainer = ref(null)

/**
 * =========================
 * NO ENCODING (按你的要求)
 * =========================
 */
function safeValue(value = '') {
    return String(value)
}

/**
 * =========================
 * OPEN FORM
 * =========================
 */
function openFeedbackForm(h2) {
    const pageUrl = window.location.origin + window.location.pathname

    const titleText = h2?.innerText?.trim() || 'Untitled'
    const id = h2.id || titleText.replace(/\s+/g, '-').toLowerCase()

    const fullUrl = `${pageUrl}#${id}`

    const params = new URLSearchParams({
        'entry.303459280': safeValue(titleText),
        'entry.186312065': safeValue(fullUrl),
        t: Date.now(),
    })

    const url = `${CONFIG.formBase}&${params.toString()}`

    window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * =========================
 * BUTTON CREATE
 * =========================
 */
function createButton(h2) {
    if (!h2) return null
    if (injected.has(h2)) return null

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

    const handler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        openFeedbackForm(h2)
    }

    btn.addEventListener('click', handler)

    // 键盘支持（可用性）
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openFeedbackForm(h2)
        }
    })

    injected.add(h2)

    return btn
}

/**
 * =========================
 * INJECT LOGIC
 * =========================
 */
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

/**
 * =========================
 * OBSERVER (优化范围)
 * =========================
 */
function createObserver() {
    const root = document.querySelector('.vp-doc') || document.body

    observer = new MutationObserver(() => {
        clearTimeout(debounceTimer)

        debounceTimer = setTimeout(() => {
            inject()
        }, CONFIG.debounce)
    })

    observer.observe(root, {
        childList: true,
        subtree: true,
    })
}

/**
 * =========================
 * LIFECYCLE
 * =========================
 */
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
}

.feedback-btn:hover {
    opacity: 1;
}

.feedback-btn:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
    opacity: 1;
}

.feedback-icon {
    width: 16px;
    height: 16px;
    color: currentColor;
    transition: color 0.2s ease;
}

.feedback-btn:hover .feedback-icon {
    color: #3b82f6;
}
</style>