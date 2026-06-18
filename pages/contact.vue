<template>
  <main class="contact-page">
    <div class="page-header" :class="{ visible }">
      <p class="page-pre">SAY HELLO</p>
      <h1 class="page-title">LET'S<br />TALK<span class="dot">.</span></h1>
      <p class="page-desc">No spam. No recruiters. Just builders.</p>
    </div>

    <div class="contact-grid" :class="{ visible }">
      <!-- Contact Form -->
      <div class="form-side">
        <div v-if="formState === 'success'" class="success-message">
          <div class="success-icon">&checkmark;</div>
          <h2 class="success-title">MESSAGE SENT!</h2>
          <p class="success-text">
            Thanks for reaching out! I'll get back to you within 24 hours.
            Your message has been delivered successfully.
          </p>
          <button class="new-message-btn" @click="formState = 'idle'">
            SEND ANOTHER MESSAGE &nearr;
          </button>
        </div>

        <div v-else-if="formState === 'error'" class="success-message error">
          <div class="success-icon">&cross;</div>
          <h2 class="success-title">OOPS!</h2>
          <p class="success-text">
            Something went wrong. Please try again or reach out directly via email or Discord.
          </p>
          <button class="new-message-btn" @click="formState = 'idle'">
            TRY AGAIN &nearr;
          </button>
        </div>

        <form v-else id="contact-form" class="form" @submit.prevent="handleSubmit">
          <div class="field-group" :class="{ focused: focusedField === 'name', filled: name }">
            <label for="name" class="field-label">YOUR NAME</label>
            <input
              id="name"
              v-model="name"
              type="text"
              name="name"
              required
              class="field-input"
              placeholder="Natan Nobel"
              @focus="focusedField = 'name'"
              @blur="focusedField = null"
            />
            <div class="field-line" />
          </div>

          <div class="field-group" :class="{ focused: focusedField === 'email', filled: email }">
            <label for="email" class="field-label">EMAIL ADDRESS</label>
            <input
              id="email"
              v-model="email"
              type="email"
              name="email"
              required
              class="field-input"
              placeholder="you@example.com"
              @focus="focusedField = 'email'"
              @blur="focusedField = null"
            />
            <div class="field-line" />
          </div>

          <div class="field-group textarea-group" :class="{ focused: focusedField === 'message', filled: message }">
            <label for="message" class="field-label">MESSAGE</label>
            <textarea
              id="message"
              v-model="message"
              name="message"
              required
              rows="6"
              class="field-input"
              placeholder="Hey Natan, I'd love to collaborate on..."
              @focus="focusedField = 'message'"
              @blur="focusedField = null"
            />
            <div class="field-line" />
          </div>

          <button
            type="submit"
            class="submit-btn"
            :disabled="formState === 'sending'"
          >
            <span v-if="formState === 'sending'" class="btn-spinner" />
            {{ formState === 'sending' ? 'SENDING...' : 'SEND MESSAGE \u2197' }}
          </button>
        </form>
      </div>

      <!-- Contact Links -->
      <div class="links-side">
        <p class="links-intro">
          Prefer a direct line? Find me on any of these platforms.
          I try to respond within 24 hours.
        </p>
        <div class="contact-cards">
          <a
            v-for="(c, i) in contacts"
            :key="c.label"
            class="contact-card"
            :href="c.href"
            target="_blank"
            rel="noopener noreferrer"
            :style="{ transitionDelay: `${i * 100}ms` }"
          >
            <div class="card-icon" :style="{ background: c.color, color: '#fff' }">
              <Icon :name="c.iconName" size="20" />
            </div>
            <div class="card-info">
              <span class="card-platform">{{ c.label }}</span>
              <span class="card-handle">{{ c.handle }}</span>
              <span class="card-desc">{{ c.desc }}</span>
            </div>
            <div class="card-arrow">&nearr;</div>
          </a>
        </div>
      </div>
    </div>

    <section class="support-section">
      <div class="support-header">
        <span class="tag-line">SUPPORT MY WORK</span>
        <h2 class="support-title">FUEL THE <span class="accent">CREATIVE</span> ENGINE<span class="dot">.</span></h2>
        <p class="support-desc">
          If you find my projects, tools, or articles helpful, consider supporting my journey.
        </p>
      </div>
      <div class="methods-grid">
        <a
          v-for="(method, i) in methods"
          :key="method.name"
          :href="method.link"
          class="method-card"
          :style="{ transitionDelay: `${i * 100}ms` }"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="card-inner">
            <span class="method-icon">
              <Icon :name="method.iconName" size="48" />
            </span>
            <h3 class="method-name">{{ method.name }}</h3>
            <p class="method-desc">{{ method.desc }}</p>
            <div class="card-footer">
              <span class="action-text">DONATE NOW</span>
              <span class="arrow">&rarr;</span>
            </div>
          </div>
          <div class="card-border" :style="{ background: method.color }" />
        </a>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Contact — Natan Nobel',
  meta: [{ name: 'description', content: 'Get in touch with Natan Nobel.' }],
})

const visible = ref(false)
const formState = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const name = ref('')
const email = ref('')
const message = ref('')
const focusedField = ref<string | null>(null)

const contacts = [
  { label: 'X (TWITTER)', handle: '@therealrein_', href: 'https://x.com/therealrein_', desc: 'This person sleeps all the time', iconName: 'ph:x-logo-bold', color: '#333333' },
  { label: 'DISCORD', handle: 'reincal', href: 'https://discord.com/', desc: 'Best place to reach me fast', iconName: 'ph:discord-logo-bold', color: '#5865f2' },
  { label: 'EMAIL', handle: 'reincal@emailthing.xyz', href: 'mailto:reincal@emailthing.xyz', desc: 'For serious stuff', iconName: 'ph:envelope-bold', color: '#e63329' },
]

const methods = [
  { name: 'KO-FI', iconName: 'ph:coffee-bold', desc: 'Support with a coffee. No fees for creators.', link: 'https://ko-fi.com/reincal', color: '#FF5E5B' },
  { name: 'PAYPAL', iconName: 'ph:credit-card-bold', desc: 'Fast and secure worldwide payments.', link: 'https://www.paypal.com/paypalme/natanrein', color: '#003087' },
  { name: 'SAWERIA', iconName: 'ph:money-bold', desc: 'Support with saweria indonesia.', link: 'https://saweria.co/reincal', color: '#F7931A' },
]

async function handleSubmit() {
  if (!name.value || !email.value || !message.value) return

  formState.value = 'sending'

  try {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('email', email.value)
    formData.append('message', message.value)
    formData.append('_subject', 'New message from portfolio!')
    formData.append('_captcha', 'false')
    formData.append('_template', 'box')

    const response = await fetch('https://formsubmit.co/reincal@emailthing.xyz', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      formState.value = 'success'
      setTimeout(() => {
        name.value = ''
        email.value = ''
        message.value = ''
        formState.value = 'idle'
      }, 3000)
    } else {
      throw new Error('Failed to send')
    }
  } catch {
    formState.value = 'error'
    setTimeout(() => {
      formState.value = 'idle'
    }, 3000)
  }
}

onMounted(() => {
  visible.value = true
})
</script>

<style scoped>
.contact-page {
  padding: 10rem 6vw 0;
  min-height: 100dvh;
}

.page-header {
  max-width: 1200px;
  margin: 0 auto 5rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}

.page-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.page-pre {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 0.8rem;
}

.page-title {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(80px, 12vw, 180px);
  line-height: 0.85;
  color: var(--ink);
  margin-bottom: 1rem;
}

.dot {
  color: var(--accent);
}

.page-desc {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--mid);
}

.contact-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: start;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s 0.1s var(--ease-out), transform 0.8s 0.1s var(--ease-out);
}

.contact-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Success/Error */
.success-message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 4rem 3rem;
  border: 1.5px solid rgba(245, 240, 232, 0.08);
  animation: messageIn 0.5s var(--ease-out);
}

.light .success-message {
  border-color: rgba(10, 10, 15, 0.1);
}

.success-message.error {
  border-color: rgba(230, 50, 41, 0.15);
}

@keyframes messageIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.success-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #f5f0e8;
  background: var(--accent);
}

.success-message.error .success-icon {
  background: #e63329;
}

.success-title {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(28px, 4vw, 42px);
  color: var(--ink);
  line-height: 1;
  margin: 0;
}

.success-text {
  font-size: 14px;
  line-height: 1.75;
  color: var(--mid);
  max-width: 400px;
}

.new-message-btn {
  background: var(--ink);
  color: var(--paper);
  border: 2px solid var(--ink);
  padding: 14px 28px;
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: 16px;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s var(--ease-bounce);
  margin-top: 0.5rem;
}

.new-message-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
  transform: translate(-2px, -2px);
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.field-group {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--mid);
  transition: color 0.2s;
}

.field-group.focused .field-label {
  color: var(--accent);
}

.field-group.filled .field-label {
  color: var(--ink);
}

.field-input {
  background: none;
  border: none;
  border-bottom: 1.5px solid rgba(245, 240, 232, 0.12);
  color: var(--ink);
  font-family: var(--f-body, 'DM Sans', sans-serif);
  font-size: 15px;
  padding: 8px 0;
  width: 100%;
  outline: none;
  resize: none;
  transition: border-color 0.2s;
}

.light .field-input {
  border-color: rgba(10, 10, 15, 0.15);
}

.field-input::placeholder {
  color: rgba(245, 240, 232, 0.2);
}

.light .field-input::placeholder {
  color: var(--light);
}

.field-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.4s var(--ease-out);
}

.field-group.focused .field-line {
  width: 100%;
}

.textarea-group .field-input {
  padding-bottom: 12px;
}

.submit-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  background: var(--ink);
  color: var(--paper);
  border: 2px solid var(--ink);
  padding: 16px 36px;
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: 20px;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.2s var(--ease-bounce);
  align-self: flex-start;
}

.submit-btn:hover:not(:disabled) {
  background: var(--accent);
  border-color: var(--accent);
  transform: translate(-3px, -3px);
}

.submit-btn:disabled {
  opacity: 0.7;
}

.btn-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(245, 240, 232, 0.3);
  border-top-color: var(--paper);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Links */
.links-intro {
  font-size: 15px;
  line-height: 1.75;
  color: var(--mid);
  margin-bottom: 2.5rem;
  max-width: 380px;
}

.contact-cards {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(245, 240, 232, 0.03);
  border: 1px solid rgba(245, 240, 232, 0.07);
  padding: 1.5rem 1.8rem;
  text-decoration: none;
  color: var(--ink);
  transition: background 0.3s, border-color 0.3s, transform 0.3s var(--ease-bounce);
}

.light .contact-card {
  background: rgba(10, 10, 15, 0.03);
  border-color: rgba(10, 10, 15, 0.07);
}

.contact-card:hover {
  background: rgba(245, 240, 232, 0.06);
  border-color: rgba(245, 240, 232, 0.12);
  transform: translateX(-4px);
}

.light .contact-card:hover {
  background: rgba(10, 10, 15, 0.06);
  border-color: rgba(10, 10, 15, 0.12);
}

.card-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-platform {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--mid);
  text-transform: uppercase;
}

.card-handle {
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
}

.card-desc {
  font-size: 12px;
  color: var(--mid);
}

.card-arrow {
  font-size: 18px;
  color: var(--mid);
  transition: color 0.2s, transform 0.2s;
}

.contact-card:hover .card-arrow {
  color: var(--accent);
  transform: translate(2px, -2px);
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .submit-btn {
    align-self: stretch;
    justify-content: center;
  }

  .success-message {
    padding: 3rem 2rem;
  }
}

/* Support / Donate Section */
.support-section {
  max-width: 1200px;
  margin: 8rem auto 0;
  padding: 4rem 0;
  border-top: 1px solid rgba(245, 240, 232, 0.08);
}

.light .support-section {
  border-top-color: rgba(10, 10, 15, 0.08);
}

.support-header {
  margin-bottom: 4rem;
}

.tag-line {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--accent);
  text-transform: uppercase;
  display: block;
  margin-bottom: 1.5rem;
}

.support-title {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(40px, 6vw, 80px);
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
  color: var(--ink);
}

.accent {
  color: var(--accent);
}

.support-desc {
  font-size: 16px;
  line-height: 1.6;
  color: var(--mid);
  max-width: 500px;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.method-card {
  background: var(--paper-2);
  padding: 2.5rem;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 280px;
  transition: transform 0.4s var(--ease-bounce), background 0.3s;
}

.method-card:hover {
  transform: translateY(-8px);
  background: color-mix(in srgb, var(--paper-2) 95%, var(--accent));
}

.method-card .card-inner {
  position: relative;
  z-index: 1;
}

.method-icon {
  color: var(--accent);
  display: block;
  margin-bottom: 1.5rem;
}

.method-name {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: 36px;
  letter-spacing: 0.05em;
  color: var(--ink);
  margin-bottom: 0.8rem;
}

.method-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--mid);
  margin-bottom: 2rem;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.action-text {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--ink);
}

.arrow {
  font-size: 18px;
  color: var(--accent);
  transition: transform 0.3s var(--ease-out);
}

.method-card:hover .arrow {
  transform: translateX(8px);
}

.card-border {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease-out);
}

.method-card:hover .card-border {
  transform: scaleX(1);
}

@media (max-width: 768px) {
  .support-section {
    margin-top: 5rem;
  }

  .method-card {
    min-height: 240px;
    padding: 2rem;
  }
}
</style>
