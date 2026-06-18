<template>
  <main class="projects-page">
    <div class="page-header" :class="{ visible }">
      <p class="page-pre">SELECTED WORK</p>
      <h1 class="page-title">PROJ<br />ECTS<span class="dot">/</span></h1>
      <p class="page-desc">Things I've built, broken, and shipped.</p>
    </div>

    <div class="filter-bar" :class="{ visible }">
      <button
        v-for="tag in allStacks"
        :key="tag"
        class="filter-btn"
        :class="{ active: filter === tag }"
        @click="filter = tag"
      >
        {{ tag }}
      </button>
    </div>

    <div class="project-list">
      <div
        v-for="(p, i) in filtered"
        :key="p.num"
        class="project-row"
        :class="{ visible, 'is-active': activeProject === i }"
        :style="{ transitionDelay: `${i * 80}ms` }"
        @mouseenter="activeProject = i"
        @mouseleave="activeProject = null"
        role="article"
      >
        <div class="p-meta">
          <span class="p-num">{{ p.num }}</span>
          <span class="p-year">{{ p.year }}</span>
          <span class="p-status" :style="{ color: p.accent }">{{ p.status }}</span>
        </div>

        <div class="p-body">
          <div class="p-name-row">
            <h2 class="p-name">{{ p.name }}</h2>
            <span class="p-tagline">{{ p.tagline }}</span>
          </div>
          <p class="p-desc">{{ p.desc }}</p>
          <div class="p-stack">
            <span v-for="s in p.stack" :key="s" class="stack-tag">{{ s }}</span>
          </div>
        </div>

        <div class="p-cta">
          <a :href="p.link" class="p-link" aria-label="View project" target="_blank" rel="noopener noreferrer">
            <span class="arrow-circle">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </a>
        </div>
        <div class="hover-bar" />
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Projects — Natan Nobel',
  meta: [{ name: 'description', content: "A showcase of projects built by Natan Nobel." }],
})

const visible = ref(false)
const activeProject = ref<number | null>(null)
const filter = ref('ALL')

const projects = [
  {
    num: '001', name: 'TwaryAPI', tagline: 'Fun REST API',
    desc: 'A rest API built on Bun + ElysiaJS. Lightning fast endpoints with full TypeScript types. Uses Next.js for the interactive documentation frontend.',
    stack: ['Bun', 'ElysiaJS', 'TypeScript', 'Next.js'],
    link: 'https://twaryapix.vercel.app/', accent: '#e63329', year: '2024', status: 'Live',
  },
  {
    num: '002', name: 'University Website', tagline: 'University website using SvelteKit',
    desc: 'A university website built with SvelteKit and Sveltia CMS for Blog',
    stack: ['SvelteKit', 'Sveltia CMS'],
    link: '#', accent: '#b8ff00', year: '2025', status: 'On Development',
  },
  {
    num: '003', name: 'Natan Nobel Website', tagline: 'Natan Nobel website using SvelteKit',
    desc: 'A natan nobel website built with SvelteKit and Sveltia CMS for Blog',
    stack: ['SvelteKit', 'Sveltia CMS'],
    link: 'https://reincal.is-a.dev/', accent: '#00d4ff', year: '2023', status: 'Live',
  },
  {
    num: '004', name: 'Reinatan Website', tagline: 'Reinatan website using SvelteKit',
    desc: 'A reinatan website built with SvelteKit, there have 3 older version using HTML, CSS, JS',
    stack: ['SvelteKit', 'HTML', 'CSS', 'JS'],
    link: 'https://reinatan.is-a.dev/', accent: '#f5a623', year: '2023', status: 'Live',
  },
  {
    num: '005', name: 'Thyline Bot', tagline: 'Discord Bot',
    desc: 'Thyline Discord Bot with Confession, Autoresponder, Suggestion Feature, build using Python',
    stack: ['Python', 'Turso', 'Postgres', 'UV'],
    link: 'https://thyline.vercel.app/', accent: '#56B6C6', year: '2026', status: 'Live',
  },
]

const allStacks = ['ALL', ...new Set(projects.flatMap(p => p.stack))]

const filtered = computed(() =>
  filter.value === 'ALL' ? projects : projects.filter(p => p.stack.includes(filter.value))
)

onMounted(() => {
  visible.value = true
})
</script>

<style scoped>
.projects-page {
  padding: 10rem 6vw 0;
  min-height: 100dvh;
}

.page-header {
  max-width: 1200px;
  margin: 0 auto 4rem;
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

.filter-bar {
  max-width: 1200px;
  margin: 0 auto 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.6s 0.2s var(--ease-out);
}

.filter-bar.visible {
  opacity: 1;
}

.filter-btn {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.12em;
  padding: 6px 14px;
  background: none;
  border: 1.5px solid rgba(245, 240, 232, 0.12);
  color: var(--mid);
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.light .filter-btn {
  border-color: rgba(10, 10, 15, 0.15);
}

.filter-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.filter-btn.active {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}

.project-list {
  max-width: 1200px;
  margin: 0 auto;
}

.project-row {
  display: grid;
  grid-template-columns: 80px 1fr 100px;
  gap: 3rem;
  padding: 2.5rem 0;
  border-top: 1px solid rgba(245, 240, 232, 0.08);
  position: relative;
  transition: background 0.3s, transform 0.3s, opacity 0.6s, border-color 0.3s;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
}

.light .project-row {
  border-color: rgba(10, 10, 15, 0.08);
}

.project-row.visible {
  opacity: 1;
  transform: translateY(0);
}

.project-row:last-child {
  border-bottom: 1px solid rgba(245, 240, 232, 0.08);
}

.light .project-row:last-child {
  border-bottom-color: rgba(10, 10, 15, 0.1);
}

.project-row:hover {
  background: rgba(245, 240, 232, 0.02);
}

.light .project-row:hover {
  background: rgba(10, 10, 15, 0.02);
}

.project-row:hover .p-name {
  color: var(--accent);
}

.project-row:hover .hover-bar {
  transform: scaleX(1);
}

.project-row:hover .arrow-circle {
  background: var(--accent);
  color: var(--paper);
  transform: rotate(-45deg) scale(1.1);
  border-color: var(--accent);
}

.hover-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease-out);
}

.p-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 4px;
}

.p-num {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: rgba(245, 240, 232, 0.25);
}

.light .p-num {
  color: rgba(10, 10, 15, 0.3);
}

.p-year {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  color: rgba(245, 240, 232, 0.2);
}

.light .p-year {
  color: rgba(10, 10, 15, 0.2);
}

.p-status {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.p-body {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.p-name-row {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 1rem;
}

.p-name {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(28px, 4vw, 48px);
  letter-spacing: 0.02em;
  color: var(--ink);
  line-height: 1;
  transition: color 0.3s;
}

.p-tagline {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--mid);
  text-transform: uppercase;
  border: 1px solid rgba(245, 240, 232, 0.12);
  padding: 4px 10px;
  white-space: nowrap;
}

.light .p-tagline {
  border-color: rgba(10, 10, 15, 0.15);
}

.p-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--mid);
  max-width: 540px;
  display: none;
}

.project-row.is-active .p-desc {
  display: block;
  animation: descReveal 0.3s var(--ease-out);
}

@keyframes descReveal {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.p-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.stack-tag {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--ink);
  background: rgba(245, 240, 232, 0.06);
  padding: 3px 8px;
}

.light .stack-tag {
  background: rgba(10, 10, 15, 0.06);
}

.p-cta {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding-top: 8px;
}

.p-link {
  text-decoration: none;
  color: var(--ink);
}

.arrow-circle {
  width: 48px;
  height: 48px;
  border: 1.5px solid rgba(245, 240, 232, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, color 0.3s, border-color 0.3s, transform 0.4s var(--ease-bounce);
  color: var(--paper);
}

.light .arrow-circle {
  border-color: rgba(10, 10, 15, 0.2);
  color: var(--ink);
}

@media (max-width: 768px) {
  .project-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .p-meta {
    flex-direction: row;
    gap: 1rem;
  }

  .p-cta {
    position: absolute;
    top: 2rem;
    right: 0;
  }
}
</style>
