<template>
  <section id="about" ref="sectionEl" class="about">
    <div class="about-inner">
      <div class="about-bio" :class="{ visible }">
        <div class="tag-line">
          <span class="tag-line-bar" />
          ABOUT ME
        </div>
        <h2 class="title">A BIT<br />ABOUT<span class="dot-acc">.</span></h2>
        <p class="bio-text">
          I'm Natan Nobel, a developer from Indonesia, coding from home.
          It started with a Discord bot. Now it's been 5 years and the rabbit hole
          only got deeper. I think it's the best thing I've ever stumbled into.
        </p>
        <p class="bio-text">
          Not a "full-stack developer" because I can't design, but I'm someone who
          cares deeply about the things you see and the things you don't. Performance, craft,
          and the kind of quality that makes something feel <em>right</em>.
        </p>
        <div class="stat-row">
          <div class="stat">
            <span class="stat-num">5+</span>
            <span class="stat-label">Years coding</span>
          </div>
          <div class="stat">
            <span class="stat-num">10+</span>
            <span class="stat-label">Projects shipped</span>
          </div>
          <div class="stat">
            <span class="stat-num">&infin;</span>
            <span class="stat-label">Bugs introduced</span>
          </div>
        </div>
      </div>

      <div class="interests-block" :class="{ visible }">
        <div class="interests-label">INTERESTS</div>
        <div class="interests-grid">
          <div
            v-for="(item, i) in interests"
            :key="item.title"
            class="interest-card"
            :class="[`card-${item.size}`, { visible }]"
            :style="{ '--int-color': item.color, transitionDelay: `${i * 80}ms` }"
          >
            <div class="int-glow" />
            <div class="int-top">
              <span class="int-icon" aria-hidden="true">
                <Icon :name="item.icon" size="28" />
              </span>
              <span class="int-tag">{{ item.tag }}</span>
            </div>
            <h4 class="int-title">{{ item.title }}</h4>
            <p class="int-desc">{{ item.desc }}</p>
            <div class="int-footer">
              <span class="int-count">{{ item.detail }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const sectionEl = ref<HTMLElement | null>(null)
const visible = ref(false)

const interests = [
  {
    icon: 'ph:rocket-bold',
    title: 'Side Projects',
    tag: 'BUILDER',
    desc: 'I ship weekend projects that nobody asked for. APIs, bots, CLI tools — if it can be coded, I have probably started it at 2am.',
    detail: '12+ repos on GitHub',
    color: '#e63329',
    size: 'lg',
  },
  {
    icon: 'ph:coffee-bold',
    title: 'Coffee Culture',
    tag: 'FUEL',
    desc: 'Kopi tubruk before noon, espresso after. A good cup makes bad code feel temporary.',
    detail: '3 cups daily avg',
    color: '#f5a623',
    size: 'sm',
  },
  {
    icon: 'ph:music-notes-bold',
    title: 'Music',
    tag: 'VIBE',
    desc: 'Lo-fi to focus, city pop to daydream, hyperpop to forget about deadlines. Always has something playing in the background.',
    detail: '500+ hours on Spotify',
    color: '#b8ff00',
    size: 'sm',
  },
  {
    icon: 'ph:camera-bold',
    title: 'Photography',
    tag: 'VISUAL',
    desc: 'Street and night photography. I like catching moments that feel quiet and unposed — the ones most people walk past.',
    detail: 'Hobby since 2022',
    color: '#00d4ff',
    size: 'lg',
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
.about {
  padding: 8rem 6vw;
}

.about-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: start;
}

.about-bio {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}

.about-bio.visible {
  opacity: 1;
  transform: translateY(0);
}

.tag-line {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tag-line-bar {
  display: inline-block;
  width: 20px;
  height: 1.5px;
  background: var(--accent);
}

.title {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(60px, 7vw, 100px);
  line-height: 0.9;
  color: var(--ink);
  margin-bottom: 2rem;
}

.dot-acc {
  color: var(--accent);
}

.bio-text {
  font-size: 15px;
  line-height: 1.8;
  color: var(--mid);
  margin-bottom: 1.2rem;
}

.bio-text em {
  font-style: italic;
  color: var(--ink);
}

.stat-row {
  display: flex;
  gap: 2.5rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(245, 240, 232, 0.08);
}

.light .stat-row {
  border-color: rgba(10, 10, 15, 0.1);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-num {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: 42px;
  color: var(--ink);
  line-height: 1;
  letter-spacing: -0.02em;
}

.stat-label {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--mid);
  text-transform: uppercase;
}

.interests-block {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s 0.15s var(--ease-out), transform 0.8s 0.15s var(--ease-out);
}

.interests-block.visible {
  opacity: 1;
  transform: translateY(0);
}

.interests-label {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--mid);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.interests-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}

.interest-card {
  position: relative;
  background: var(--paper-2);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  overflow: hidden;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out), background 0.3s;
  cursor: default;
  border: 1px solid transparent;
}

.interest-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.interest-card:hover {
  background: color-mix(in srgb, var(--paper-2) 92%, var(--int-color));
  border-color: color-mix(in srgb, var(--int-color) 20%, transparent);
}

.interest-card:hover .int-glow {
  opacity: 1;
}

.interest-card:hover .int-icon {
  transform: scale(1.15) rotate(-5deg);
}

.interest-card:hover .int-tag {
  color: var(--int-color);
  border-color: color-mix(in srgb, var(--int-color) 40%, transparent);
}

.int-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, var(--int-color) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
  filter: blur(30px);
}

.int-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.int-icon {
  color: var(--int-color);
  transition: transform 0.4s var(--ease-bounce);
}

.int-tag {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--mid);
  border: 1px solid rgba(245, 240, 232, 0.1);
  padding: 3px 10px;
  transition: color 0.3s, border-color 0.3s;
}

.light .int-tag {
  border-color: rgba(10, 10, 15, 0.12);
}

.int-title {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: 26px;
  letter-spacing: 0.03em;
  color: var(--ink);
  line-height: 1;
}

.int-desc {
  font-size: 13px;
  line-height: 1.65;
  color: var(--mid);
  flex: 1;
}

.int-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(245, 240, 232, 0.06);
}

.light .int-footer {
  border-color: rgba(10, 10, 15, 0.08);
}

.int-count {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--int-color);
  text-transform: uppercase;
  opacity: 0.8;
}

.card-lg {
  grid-column: span 1;
  min-height: 220px;
}

.card-sm {
  grid-column: span 1;
  min-height: 180px;
}

@media (max-width: 900px) {
  .about-inner {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .stat-row {
    gap: 1.5rem;
  }

  .interests-grid {
    grid-template-columns: 1fr;
  }

  .card-lg, .card-sm {
    min-height: auto;
  }
}
</style>
