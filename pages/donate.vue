<template>
  <main class="donate-page" :class="{ visible }">
    <div class="bg-text" aria-hidden="true">SUPPORT</div>

    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <span class="tag-line">SUPPORT MY WORK</span>
          <h1 class="title">FUEL THE <span class="accent">CREATIVE</span> ENGINE<span class="dot">.</span></h1>
          <p class="desc">
            If you find my projects, tools, or articles helpful, consider supporting my journey.
            Your contributions help me dedicate more time to open source and creating high-quality content.
          </p>
        </div>
      </div>
    </section>

    <section class="methods-section">
      <div class="container">
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
      </div>
    </section>

    <section class="thanks-section">
      <div class="container">
        <div class="thanks-box">
          <span class="thanks-icon">
            <Icon name="ph:heart-bold" size="40" />
          </span>
          <h2 class="thanks-title">EVERY BIT COUNTS</h2>
          <p class="thanks-desc">
            Whether it's a coffee or a subscription, your support directly impacts the frequency and quality of my work.
            Thank you for being part of this journey.
          </p>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Donate — Natan Nobel',
})

const visible = ref(false)

const methods = [
  {
    name: 'KO-FI',
    iconName: 'ph:coffee-bold',
    desc: 'Support with a coffee. No fees for creators.',
    link: 'https://ko-fi.com/reincal',
    color: '#FF5E5B',
  },
  {
    name: 'PAYPAL',
    iconName: 'ph:credit-card-bold',
    desc: 'Fast and secure worldwide payments.',
    link: 'https://www.paypal.com/paypalme/natanrein',
    color: '#003087',
  },
  {
    name: 'SAWERIA',
    iconName: 'ph:money-bold',
    desc: 'Support with saweria indonesia.',
    link: 'https://saweria.co/reincal',
    color: '#F7931A',
  },
]

onMounted(() => {
  visible.value = true
})
</script>

<style scoped>
.donate-page {
  min-height: 100dvh;
  padding-top: 120px;
  padding-bottom: 0;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.8s var(--ease-out);
}

.donate-page.visible {
  opacity: 1;
}

.bg-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(200px, 35vw, 600px);
  color: transparent;
  -webkit-text-stroke: 1px rgba(245, 240, 232, 0.03);
  pointer-events: none;
  user-select: none;
  z-index: -1;
  letter-spacing: -0.05em;
}

.light .bg-text {
  -webkit-text-stroke: 1px rgba(10, 10, 15, 0.04);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 6vw;
}

.hero-content {
  max-width: 800px;
  margin-bottom: 5rem;
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

.title {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(60px, 10vw, 120px);
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin-bottom: 2rem;
  color: var(--ink);
}

.accent {
  color: var(--accent);
}

.dot {
  color: var(--accent);
}

.desc {
  font-size: 18px;
  line-height: 1.6;
  color: var(--mid);
  max-width: 600px;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 6rem;
}

.method-card {
  background: var(--paper-2);
  padding: 3rem;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 320px;
  transition: transform 0.4s var(--ease-bounce), background 0.3s;
  opacity: 0;
  transform: translateY(30px);
  animation: reveal 0.8s forwards var(--ease-out);
  animation-delay: inherit;
}

@keyframes reveal {
  to { opacity: 1; transform: translateY(0); }
}

.method-card:hover {
  transform: translateY(-10px);
  background: color-mix(in srgb, var(--paper-2) 95%, var(--accent));
}

.card-inner {
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
  font-size: 42px;
  letter-spacing: 0.05em;
  color: var(--ink);
  margin-bottom: 1rem;
}

.method-desc {
  font-size: 15px;
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
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--ink);
}

.arrow {
  font-size: 20px;
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

.thanks-box {
  background: var(--paper-2);
  padding: 4rem;
  text-align: center;
  color: var(--ink);
  position: relative;
  overflow: hidden;
}

.thanks-icon {
  color: var(--accent);
  display: block;
  margin-bottom: 1.5rem;
}

.thanks-title {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: 48px;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.thanks-desc {
  font-size: 16px;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .hero-content {
    margin-bottom: 3rem;
  }

  .title {
    font-size: 60px;
  }

  .method-card {
    min-height: 280px;
    padding: 2rem;
  }

  .thanks-box {
    padding: 3rem 2rem;
  }

  .thanks-title {
    font-size: 36px;
  }
}
</style>
