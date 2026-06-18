<template>
  <section id="stack" ref="sectionEl" class="techstack">
    <div class="section-inner">
      <div class="section-header" :class="{ visible }">
        <div>
          <h2 class="section-title">TECH<br />STACK</h2>
          <p class="section-sub">Tools I reach for first</p>
        </div>
      </div>

      <div class="categories">
        <div
          v-for="(cat, ci) in categories"
          :key="cat.key"
          class="category"
          :class="{ visible }"
          :style="{ transitionDelay: `${ci * 100}ms` }"
        >
          <div class="cat-label">
            <span class="cat-dot" :style="{ background: cat.color }" />
            {{ cat.label }}
          </div>
          <div class="cat-grid">
            <div
              v-for="(tech, ti) in cat.items"
              :key="tech.name"
              class="tech-card"
              :class="{ visible }"
              :style="{ transitionDelay: `${ci * 100 + ti * 55}ms` }"
            >
              <div class="card-glow" :style="{ '--tech-color': tech.color }" />
              <div class="tech-logo">
                <img :src="tech.icon" :alt="tech.name" width="36" height="36" />
              </div>
              <div class="tech-name">{{ tech.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-word" aria-hidden="true">STACK</div>
  </section>
</template>

<script setup lang="ts">
const sectionEl = ref<HTMLElement | null>(null)
const visible = ref(false)
const { reveal } = useScrollReveal()

const categories = [
  {
    label: 'Languages',
    key: 'lang',
    color: '#e63329',
    items: [
      { name: 'JavaScript', color: '#f0db4f', icon: '/svg/javascript.svg' },
      { name: 'TypeScript', color: '#3178c6', icon: '/svg/typescript.svg' },
      { name: 'Python', color: '#306998', icon: '/svg/python.svg' },
      { name: 'Rust', color: '#e63329', icon: '/svg/rust.svg' },
      { name: 'HTML', color: '#e34c26', icon: '/svg/html.svg' },
      { name: 'CSS', color: '#264de4', icon: '/svg/css.svg' },
    ],
  },
  {
    label: 'Frameworks',
    key: 'fw',
    color: '#b8ff00',
    items: [
      { name: 'Svelte', color: '#ff3e00', icon: '/svg/svelte.svg' },
      { name: 'ElysiaJS', color: '#C8F5B0', icon: '/svg/elysiajs.svg' },
      { name: 'Next.js', color: '#ffffff', icon: '/svg/next-js.svg' },
      { name: 'Astro', color: '#FF653F', icon: '/svg/astrojs.svg' },
      { name: 'Vue', color: '#37bd90', icon: '/svg/vue.svg' },
    ],
  },
  {
    label: 'Runtime & DB',
    key: 'infra',
    color: '#00d4ff',
    items: [
      { name: 'Bun', color: '#f9f1e1', icon: '/svg/bun.svg' },
      { name: 'UV', color: '#84C5B1', icon: '/svg/uv.svg' },
      { name: 'Turso', color: '#4ff8d2', icon: '/svg/turso.svg' },
      { name: 'Neon', color: '#336791', icon: '/svg/neon.svg' },
      { name: 'Supabase', color: '#336791', icon: '/svg/supabase.svg' },
      { name: 'MongoDB', color: '#336791', icon: '/svg/MongoDB.svg' },
    ],
  },
]

onMounted(() => {
  if (import.meta.server) return
  reveal(sectionEl.value, { y: 0, opacity: 1, duration: 0.01, once: true, start: 'top 80%' })
  const obs = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        visible.value = true
        obs.disconnect()
      }
    },
    { threshold: 0.15 }
  )
  if (sectionEl.value) obs.observe(sectionEl.value)
  onUnmounted(() => obs.disconnect())
})
</script>

<style scoped>
.techstack {
  color: var(--ink);
  padding: 8rem 6vw;
  position: relative;
  overflow: hidden;
}

.section-inner {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.section-header {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}

.section-header.visible {
  opacity: 1;
  transform: translateX(0);
}

.section-title {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(60px, 8vw, 110px);
  line-height: 0.9;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.section-sub {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--mid);
  margin-top: 0.8rem;
  text-transform: uppercase;
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.category {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}

.category.visible {
  opacity: 1;
  transform: translateY(0);
}

.cat-label {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--cat-color, var(--mid));
  text-transform: uppercase;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  border-top: 1px solid rgba(245, 240, 232, 0.07);
  border-left: 1px solid rgba(245, 240, 232, 0.07);
}

.light .cat-grid {
  border-color: rgba(10, 10, 15, 0.08);
}

.tech-card {
  position: relative;
  padding: 22px 18px 18px;
  border-right: 1px solid rgba(245, 240, 232, 0.07);
  border-bottom: 1px solid rgba(245, 240, 232, 0.07);
  overflow: hidden;
  cursor: default;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out), background 0.3s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.light .tech-card {
  border-color: rgba(10, 10, 15, 0.08);
}

.tech-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.tech-card:hover {
  background: rgba(245, 240, 232, 0.05);
}

.light .tech-card:hover {
  background: rgba(10, 10, 15, 0.03);
}

.tech-card:hover .card-glow {
  opacity: 1;
  transform: scale(1);
}

.tech-card:hover .tech-logo img {
  transform: scale(1.08);
}

.card-glow {
  position: absolute;
  bottom: -20px;
  right: -10px;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, var(--tech-color) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0.4);
  transition: opacity 0.4s, transform 0.4s var(--ease-bounce);
  pointer-events: none;
}

.tech-logo {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-logo img {
  width: 36px;
  height: 36px;
  transition: transform 0.3s var(--ease-bounce);
}

.tech-name {
  font-size: 12px;
  font-weight: 500;
  color: rgba(245, 240, 232, 0.7);
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.light .tech-name {
  color: rgba(10, 10, 15, 0.7);
}

.bg-word {
  position: absolute;
  bottom: -2rem;
  right: -1rem;
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(100px, 18vw, 260px);
  color: transparent;
  -webkit-text-stroke: 1px rgba(245, 240, 232, 0.03);
  pointer-events: none;
  user-select: none;
  line-height: 1;
  letter-spacing: -0.04em;
}

.light .bg-word {
  -webkit-text-stroke: 1px rgba(10, 10, 15, 0.04);
}

@media (max-width: 600px) {
  .cat-grid {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  }
}
</style>
