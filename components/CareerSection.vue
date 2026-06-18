<template>
  <section id="career" ref="sectionEl" class="career">
    <div class="career-inner">
      <div class="section-head" :class="{ visible }">
        <div>
          <h2 class="section-title">CAREER<br />PATH<span class="dot-acc">.</span></h2>
          <p class="section-sub">where i've been & what i've done</p>
        </div>
      </div>

      <div class="timeline">
        <div class="timeline-line" />

        <div
          v-for="(item, i) in timeline"
          :key="item.year"
          class="tl-item"
          :class="{ visible }"
          :style="{ transitionDelay: `${i * 120}ms`, '--tl-color': item.color }"
        >
          <div class="tl-marker">
            <div class="tl-dot" />
            <span class="tl-year">{{ item.year }}</span>
          </div>

          <div class="tl-card">
            <div class="tl-card-top">
              <h3 class="tl-role">{{ item.role }}</h3>
              <span class="tl-type">{{ item.type }}</span>
            </div>
            <p class="tl-company">{{ item.company }}</p>
            <p class="tl-desc">{{ item.desc }}</p>
            <div class="tl-tags">
              <span v-for="tag in item.tags" :key="tag" class="tl-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-year" aria-hidden="true">EXP</div>
  </section>
</template>

<script setup lang="ts">
const sectionEl = ref<HTMLElement | null>(null)
const visible = ref(false)

const timeline = [
  {
    year: '2026',
    role: 'Freelance Developer',
    company: 'Self-Employed',
    type: 'FULLTIME',
    desc: 'Building tools, bots, and APIs for clients. Shipping side projects that solve real problems.',
    tags: ['TypeScript', 'Python', 'Rust', 'SvelteKit'],
    color: '#e63329',
  },
  {
    year: '2025',
    role: 'Frontend Developer',
    company: 'University Projects',
    type: 'CONTRACT',
    desc: 'Led frontend development for university website rebuild. Built accessible, performant interfaces.',
    tags: ['SvelteKit', 'Sveltia CMS', 'Tailwind'],
    color: '#b8ff00',
  },
  {
    year: '2024',
    role: 'Backend Engineer',
    company: 'TwaryAPI',
    type: 'PROJECT',
    desc: 'Designed and shipped a REST API with full TypeScript types. Built interactive docs frontend.',
    tags: ['Bun', 'ElysiaJS', 'Next.js', 'Turso'],
    color: '#00d4ff',
  },
  {
    year: '2023',
    role: 'Bot Developer',
    company: 'Thyline Bot',
    type: 'PROJECT',
    desc: 'Built a multi-feature Discord bot handling confessions, autoresponders, and suggestions at scale.',
    tags: ['Python', 'Postgres', 'Discord.js'],
    color: '#f5a623',
  },
  {
    year: '2021',
    role: 'Where It Started',
    company: 'Discord Bot Dev',
    type: 'BEGINNING',
    desc: 'Wrote my first lines of code making Discord bots. Fell in love with the craft and never looked back.',
    tags: ['JavaScript', 'Node.js', 'Discord API'],
    color: '#8a8480',
  },
]

onMounted(() => {
  const obs = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) visible.value = true
    },
    { threshold: 0.1 }
  )
  if (sectionEl.value) obs.observe(sectionEl.value)
  onUnmounted(() => obs.disconnect())
})
</script>

<style scoped>
.career {
  padding: 8rem 6vw;
  position: relative;
  overflow: hidden;
}

.career-inner {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.section-head {
  margin-bottom: 5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}

.section-head.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(60px, 8vw, 110px);
  line-height: 0.9;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.dot-acc {
  color: var(--accent);
}

.section-sub {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--mid);
  margin-top: 0.8rem;
  text-transform: uppercase;
}

/* ── Timeline ── */
.timeline {
  position: relative;
  padding-left: 140px;
}

.timeline-line {
  position: absolute;
  left: 130px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(245, 240, 232, 0.12) 10%,
    rgba(245, 240, 232, 0.12) 90%,
    transparent
  );
}

.light .timeline-line {
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(10, 10, 15, 0.12) 10%,
    rgba(10, 10, 15, 0.12) 90%,
    transparent
  );
}

.tl-item {
  display: flex;
  gap: 2.5rem;
  padding-bottom: 3rem;
  position: relative;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
}

.tl-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.tl-item:last-child {
  padding-bottom: 0;
}

/* ── Marker ── */
.tl-marker {
  position: absolute;
  left: -140px;
  top: 0;
  width: 140px;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
}

.tl-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--tl-color);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 0 3px var(--paper), 0 0 12px color-mix(in srgb, var(--tl-color) 40%, transparent);
}

.tl-year {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--mid);
  position: absolute;
  right: 24px;
  white-space: nowrap;
}

/* ── Card ── */
.tl-card {
  background: var(--paper-2);
  padding: 2rem;
  flex: 1;
  border: 1px solid transparent;
  transition: border-color 0.3s, transform 0.3s var(--ease-out);
}

.tl-card:hover {
  border-color: color-mix(in srgb, var(--tl-color) 25%, transparent);
  transform: translateX(6px);
}

.tl-card-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.tl-role {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(24px, 3vw, 32px);
  letter-spacing: 0.03em;
  color: var(--ink);
  line-height: 1;
}

.tl-type {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--tl-color);
  border: 1px solid color-mix(in srgb, var(--tl-color) 30%, transparent);
  padding: 3px 10px;
  white-space: nowrap;
}

.tl-company {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--mid);
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.tl-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--mid);
  margin-bottom: 1.2rem;
}

.tl-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tl-tag {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--ink);
  background: rgba(245, 240, 232, 0.06);
  padding: 3px 10px;
}

.light .tl-tag {
  background: rgba(10, 10, 15, 0.06);
}

.tl-item:hover .tl-dot {
  transform: scale(1.3);
  transition: transform 0.3s var(--ease-bounce);
}

.tl-item:hover .tl-year {
  color: var(--tl-color);
}

/* ── BG Decoration ── */
.bg-year {
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

.light .bg-year {
  -webkit-text-stroke: 1px rgba(10, 10, 15, 0.04);
}

@media (max-width: 768px) {
  .timeline {
    padding-left: 40px;
  }

  .timeline-line {
    left: 30px;
  }

  .tl-marker {
    left: -40px;
    width: 40px;
    justify-content: center;
  }

  .tl-year {
    display: none;
  }

  .tl-card {
    padding: 1.5rem;
  }

  .tl-card-top {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
