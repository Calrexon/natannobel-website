<template>
  <section id="roles" ref="sectionEl" class="roles">
    <div class="section-label-vertical" aria-hidden="true">IDENTITY</div>
    <div class="roles-inner">
      <div class="section-head" :class="{ visible }">
        <div>
          <h2 class="section-title">WHAT<br />I DO</h2>
          <p class="section-sub">building across the stack</p>
        </div>
      </div>

      <div class="roles-grid">
        <div
          v-for="(role, i) in roles"
          :key="role.id"
          class="role-card"
          :class="{ visible, 'is-hovered': activeRole === role.id }"
          :style="{ transitionDelay: `${i * 150}ms`, '--role-color': role.color }"
          @mouseenter="activeRole = role.id"
          @mouseleave="activeRole = null"
          role="region"
          :aria-label="role.label"
        >
          <div class="role-header">
            <span class="role-icon" aria-hidden="true">
              <Icon v-if="role.id === 'frontend'" name="ph:palette-bold" size="36" />
              <Icon v-else name="ph:gear-bold" size="36" />
            </span>
            <div>
              <h3 class="role-label">{{ role.label }}</h3>
              <p class="role-subtitle">{{ role.subtitle }}</p>
            </div>
          </div>
          <p class="role-desc">{{ role.desc }}</p>
          <ul class="skill-list">
            <li
              v-for="(skill, j) in role.skills"
              :key="skill"
              class="skill-item"
              :style="{ transitionDelay: `${j * 80}ms` }"
            >
              <span class="skill-bullet">&rarr;</span>{{ skill }}
            </li>
          </ul>
          <div class="role-corner-tag">DEV</div>
        </div>
      </div>

      <div class="connector" :class="{ visible }">
        <div class="connector-line" />
        <div class="connector-label">FRONTEND & BACKEND</div>
        <div class="connector-line" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const sectionEl = ref<HTMLElement | null>(null)
const visible = ref(false)
const activeRole = ref<string | null>(null)

const roles = [
  {
    id: 'frontend',
    label: 'FRONTEND',
    subtitle: 'I make things feel alive',
    color: '#e63329',
    skills: ['Svelte & SvelteKit', 'Animation & Motion', 'CSS architecture', 'Accessible UI', 'Performance tuning'],
    desc: 'I think in components, breathe in transitions, and dream in layout grids. The frontend is where logic meets feeling, and I live for that tension.',
  },
  {
    id: 'backend',
    label: 'BACKEND',
    subtitle: 'I make things work at scale',
    color: '#b8ff00',
    skills: ['REST & WebSocket APIs', 'Database design', 'Auth & security', 'Job scheduling', 'DevOps basics'],
    desc: "Underneath every beautiful interface is infrastructure that has to be bulletproof. I design systems that are fast, typed, and don't fall over at 3am.",
  },
]

onMounted(() => {
  const obs = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) visible.value = true
    },
    { threshold: 0.2 }
  )
  if (sectionEl.value) obs.observe(sectionEl.value)
  onUnmounted(() => obs.disconnect())
})
</script>

<style scoped>
.roles {
  padding: 8rem 6vw;
  position: relative;
  overflow: hidden;
}

.section-label-vertical {
  position: absolute;
  left: -5rem;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: 80px;
  letter-spacing: 0.2em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(245, 240, 232, 0.03);
  pointer-events: none;
  white-space: nowrap;
}

.light .section-label-vertical {
  -webkit-text-stroke-color: rgba(10, 10, 15, 0.05);
}

.roles-inner {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.section-head {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
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

.section-sub {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--mid);
  margin-top: 0.8rem;
  text-transform: uppercase;
}

.roles-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}

.role-card {
  background: var(--paper-2);
  color: var(--ink);
  padding: 3.5rem;
  position: relative;
  overflow: hidden;
  cursor: default;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
}

.role-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.role-card::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--role-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s var(--ease-out);
}

.role-card.is-hovered::before {
  transform: scaleX(1);
}

.role-card.is-hovered .role-label {
  color: var(--role-color);
}

.role-header {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}

.role-icon {
  color: var(--role-color);
  margin-top: 4px;
}

.role-label {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: 52px;
  letter-spacing: 0.02em;
  color: var(--ink);
  line-height: 0.9;
  transition: color 0.3s;
}

.role-subtitle {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--mid);
  margin-top: 0.5rem;
  text-transform: uppercase;
}

.role-desc {
  font-size: 14px;
  line-height: 1.75;
  color: var(--mid);
  margin-bottom: 2rem;
  max-width: 380px;
}

.skill-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink);
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out);
}

.role-card.is-hovered .skill-item {
  opacity: 1;
  transform: translateX(0);
}

.skill-bullet {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 12px;
  color: var(--role-color);
}

.role-corner-tag {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: 11px;
  letter-spacing: 0.2em;
  color: rgba(245, 240, 232, 0.1);
  transform: rotate(90deg);
  transform-origin: right;
}

.light .role-corner-tag {
  color: rgba(10, 10, 15, 0.1);
}

.connector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 3rem;
  width: 100%;
  opacity: 0;
  transition: opacity 0.8s 0.4s var(--ease-out);
}

.connector.visible {
  opacity: 1;
}

.connector-label {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: 22px;
  letter-spacing: 0.2em;
  color: var(--ink);
  white-space: nowrap;
  text-align: center;
}

.connector-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(245, 240, 232, 0.3), transparent);
  max-width: 200px;
  min-width: 60px;
}

.light .connector-line {
  background: linear-gradient(to right, transparent, rgba(10, 10, 15, 0.15), transparent);
}

@media (max-width: 768px) {
  .roles-grid {
    grid-template-columns: 1fr;
  }

  .role-card {
    padding: 2.5rem 2rem;
  }

  .role-label {
    font-size: 40px;
  }

  .skill-item {
    opacity: 1;
    transform: none;
  }

  .connector {
    justify-content: center;
    gap: 1rem;
  }

  .connector-line {
    max-width: 100px;
    min-width: 40px;
  }
}
</style>
