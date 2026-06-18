<template>
  <section id="top" class="hero">
    <div class="bg-stripes" aria-hidden="true" />
    <div
      ref="bgNumberEl"
      class="bg-number"
      aria-hidden="true"
    >
      01
    </div>

    <div class="hero-inner">
      <!-- Left: Identity -->
      <div class="identity" :class="{ reveal: mounted }">
        <div class="tag-line">
          <span class="tag-line-bar" />
          NOT FULL-STACK DEV
        </div>

        <h1 ref="nameEl" class="name">
          <span class="line-1">Natan</span>
          <span class="line-2">Nobel<span class="dot-accent">.</span></span>
        </h1>

        <div class="role-flip">
          <span class="role-label">I AM A</span>
          <span class="role-word" :class="{ flipping }">{{ currentWord }}</span>
        </div>

        <p class="bio">
          I'm a person that always sleeps all the time, but I love to make things.
          Currently obsessed with TypeScript, Python, Rust, Svelte, and making the web feel alive.
        </p>

        <!-- Discord Status -->
        <div v-if="discord" class="discord-status">
          <div class="discord-avatar-wrap">
            <img :src="avatarUrl" :alt="discordUsername || 'Discord avatar'" class="discord-avatar" />
            <img
              v-if="decorationUrl"
              :src="decorationUrl"
              alt=""
              aria-hidden="true"
              class="discord-decoration"
            />
            <span
              class="status-dot"
              :style="{ backgroundColor: statusColor }"
              :title="statusLabel"
            />
          </div>

          <div class="status-info">
            <span class="status-username">{{ discordUsername || 'Unknown User' }}</span>
            <span class="status-badge" :style="{ color: statusColor }">{{ statusLabel }}</span>
          </div>

          <template v-if="spotify">
            <span class="spotify-sep">&middot;</span>
            <div class="spotify-info">
              <span class="spotify-icon">&#9835;</span>
              <div class="spotify-details">
                <span class="spotify-song" :title="spotify.song">{{ spotify.song }}</span>
                <span class="spotify-artist" :title="spotify.artist">{{ spotify.artist }}</span>
              </div>
            </div>
          </template>
        </div>

        <div v-else-if="isLoading" class="discord-status discord-loading">
          <div class="loading-pulse" />
          <span class="loading-text">Connecting to Discord...</span>
        </div>

        <div v-else class="discord-status discord-offline">
          <span class="offline-icon">&#8856;</span>
          <span class="offline-text">Presence unavailable</span>
        </div>

        <!-- CTAs -->
        <div class="cta-group">
          <NuxtLink to="/projects" class="btn-primary">SEE WORK &rarr;</NuxtLink>
          <NuxtLink to="/contact" class="btn-ghost">LET'S TALK</NuxtLink>
        </div>
      </div>

      <!-- Right: Profile Picture -->
      <div class="pfp-zone" :class="{ reveal: mounted }">
        <div
          class="pfp-frame"
          :style="{ transform: `rotate(${mouseX * 0.1}deg) translateY(${mouseY * 0.2}px)` }"
        >
          <img src="/natan.png" alt="Natan Nobel" class="pfp" />
          <div class="pfp-border-anim" />
        </div>
        <div class="chip chip-1">&#1564; TypeScript lover</div>
        <div class="chip chip-2">&#9889; Bun runtime</div>
        <div class="chip chip-3">&infin; open source</div>
      </div>
    </div>

    <!-- Marquee -->
    <div class="marquee-wrap" aria-hidden="true">
      <div class="marquee-track">
        <span v-for="n in 3" :key="n">
          SVELTE &middot; RUST &middot; TYPESCRIPT &middot; ELYSIA &middot; TURSO &middot; POSTGRES &middot; BUN &middot; PYTHON &middot;&nbsp;
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const { discord, spotify, isLoading, statusColor, statusLabel, avatarUrl, decorationUrl, discordUsername } = useLanyard('715783278237450280')

const mounted = ref(false)
const parallaxY = ref(0)
const mouseX = ref(0)
const mouseY = ref(0)
const nameEl = ref<HTMLElement | null>(null)
const bgNumberEl = ref<HTMLElement | null>(null)

const words = ['BUILDER.', 'CRAFTER.', 'SLEEPER.', 'DREAMER.']
const wordIndex = ref(0)
const currentWord = ref(words[0])
const flipping = ref(false)

let interval: ReturnType<typeof setInterval>

function onMouse(e: MouseEvent) {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 30
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 15
}

onMounted(() => {
  mounted.value = true

  if (import.meta.client && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('mousemove', onMouse, { passive: true })

    if (nameEl.value) {
      const spans = nameEl.value.querySelectorAll('.line-1, .line-2')
      gsap.set(spans, { yPercent: 110, opacity: 0 })
      gsap.to(spans, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.3,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }

    if (bgNumberEl.value) {
      gsap.fromTo(
        bgNumberEl.value,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.1,
          ease: 'power3.out',
        }
      )
      gsap.to(bgNumberEl.value, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: bgNumberEl.value,
          start: 'top center',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
  }

  interval = setInterval(() => {
    flipping.value = true
    setTimeout(() => {
      wordIndex.value = (wordIndex.value + 1) % words.length
      currentWord.value = words[wordIndex.value]
      flipping.value = false
    }, 300)
  }, 2200)
})

onUnmounted(() => {
  clearInterval(interval)
  if (import.meta.client) {
    window.removeEventListener('mousemove', onMouse)
  }
})
</script>

<style scoped>
.hero {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0 6vw;
}

.bg-stripes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 60px,
    rgba(245, 240, 232, 0.02) 60px,
    rgba(245, 240, 232, 0.02) 61px
  );
}

.light .bg-stripes {
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 60px,
    rgba(10, 10, 15, 0.025) 60px,
    rgba(10, 10, 15, 0.025) 61px
  );
}

.bg-number {
  position: absolute;
  right: -2vw;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(200px, 28vw, 420px);
  color: transparent;
  -webkit-text-stroke: 1px rgba(245, 240, 232, 0.04);
  pointer-events: none;
  user-select: none;
  line-height: 1;
  letter-spacing: -0.05em;
}

.light .bg-number {
  -webkit-text-stroke-color: rgba(10, 10, 15, 0.06);
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 6rem 0 4rem;
}

/* Identity reveal */
.identity {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out);
}

.identity.reveal {
  opacity: 1;
  transform: translateY(0);
}

.pfp-zone {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s 0.2s var(--ease-out), transform 0.9s 0.2s var(--ease-out);
}

.pfp-zone.reveal {
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

.name {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(80px, 10vw, 160px);
  line-height: 0.85;
  letter-spacing: -0.02em;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  color: var(--ink);
}

.dot-accent {
  color: var(--accent);
}

.role-flip {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
  height: 2rem;
  overflow: hidden;
}

.role-label {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--mid);
}

.role-word {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: 28px;
  color: var(--accent);
  letter-spacing: 0.05em;
  transition: transform 0.3s var(--ease-out), opacity 0.3s;
  display: inline-block;
  transform-origin: bottom;
}

.role-word.flipping {
  transform: rotateX(90deg) translateY(-10px);
  opacity: 0;
}

.bio {
  font-size: 15px;
  line-height: 1.75;
  color: var(--mid);
  max-width: 420px;
  margin-bottom: 1.5rem;
}

/* Discord Status */
.discord-status {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--mid);
  margin-bottom: 2rem;
  background: rgba(245, 240, 232, 0.05);
  border: 1px solid rgba(245, 240, 232, 0.1);
  padding: 12px 16px;
  width: fit-content;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.discord-status:hover {
  border-color: rgba(245, 240, 232, 0.2);
  background: rgba(245, 240, 232, 0.08);
}

.light .discord-status {
  background: rgba(10, 10, 15, 0.03);
  border-color: rgba(10, 10, 15, 0.08);
}

.light .discord-status:hover {
  background: rgba(10, 10, 15, 0.06);
  border-color: rgba(10, 10, 15, 0.15);
}

.discord-avatar-wrap {
  position: relative;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.discord-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.discord-decoration {
  position: absolute;
  inset: -4px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: contain;
  pointer-events: none;
}

.status-dot {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 3px solid var(--paper);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
  0%, 100% { box-shadow: 0 0 0 0 currentColor; }
  50% { box-shadow: 0 0 0 4px transparent; }
}

.status-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.status-username {
  font-weight: 600;
  color: var(--ink);
  font-size: 13px;
}

.status-badge {
  font-size: 11px;
  letter-spacing: 0.06em;
  font-weight: 500;
}

.spotify-sep {
  opacity: 0.3;
  font-size: 14px;
}

.spotify-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spotify-icon {
  color: #1db954;
  font-size: 16px;
}

.spotify-details {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.spotify-song {
  font-weight: 500;
  color: var(--ink);
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}

.spotify-artist {
  font-size: 10px;
  color: var(--mid);
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.discord-loading {
  gap: 10px;
  opacity: 0.8;
}

.loading-pulse {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  animation: loadingPulse 1.5s ease-in-out infinite;
}

@keyframes loadingPulse {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

.loading-text {
  font-size: 11px;
  color: var(--mid);
}

.discord-offline {
  gap: 10px;
  opacity: 0.6;
}

.offline-icon {
  font-size: 16px;
}

.offline-text {
  font-size: 11px;
  color: var(--mid);
}

/* CTAs */
.cta-group {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.btn-primary {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: 18px;
  letter-spacing: 0.08em;
  background: var(--ink);
  color: var(--paper);
  padding: 14px 32px;
  text-decoration: none;
  border: 2px solid var(--ink);
  transition: background 0.2s, color 0.2s, transform 0.2s var(--ease-bounce);
}

.btn-primary:hover {
  background: var(--accent);
  border-color: var(--accent);
  transform: translate(-3px, -3px);
}

.btn-ghost {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--ink);
  text-decoration: none;
  padding: 14px 0;
  border-bottom: 1.5px solid var(--ink);
  transition: color 0.2s, border-color 0.2s;
}

.btn-ghost:hover {
  color: var(--accent);
  border-color: var(--accent);
}

/* Profile Picture */
.pfp-zone {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.pfp-frame {
  position: relative;
  width: 320px;
  height: 380px;
  transition: transform 0.6s var(--ease-out);
}

.pfp {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(15%) contrast(1.05);
  border: 2px solid var(--ink);
}

.pfp-border-anim {
  position: absolute;
  inset: -8px;
  border: 2px solid var(--accent);
  pointer-events: none;
  animation: framePulse 3s ease-in-out infinite;
}

@keyframes framePulse {
  0%, 100% { transform: translate(0, 0); opacity: 1; }
  50% { transform: translate(6px, 6px); opacity: 0.6; }
}

.chip {
  position: absolute;
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.08em;
  background: var(--ink);
  color: var(--paper);
  padding: 6px 14px;
  white-space: nowrap;
  animation: floatChip 4s ease-in-out infinite;
}

.chip-1 { top: 5%; right: -10%; animation-delay: 0s; }
.chip-2 { bottom: 15%; left: -12%; animation-delay: 1.3s; }
.chip-3 { top: 50%; right: -14%; animation-delay: 0.7s; }

@keyframes floatChip {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Marquee */
.marquee-wrap {
  overflow: hidden;
  border-top: 1.5px solid rgba(245, 240, 232, 0.12);
  border-bottom: 1.5px solid rgba(245, 240, 232, 0.12);
  padding: 12px 0;
  background: var(--ink);
  margin-top: auto;
}

.light .marquee-wrap {
  border-color: rgba(10, 10, 15, 0.12);
}

.marquee-track {
  display: flex;
  white-space: nowrap;
  animation: marquee 22s linear infinite;
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: 18px;
  letter-spacing: 0.1em;
  color: var(--paper);
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.33%); }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr;
    padding: 7rem 0 4rem;
    gap: 3rem;
  }

  .pfp-zone {
    order: -1;
  }

  .pfp-frame {
    width: 220px;
    height: 260px;
  }

  .chip {
    display: none;
  }

  .bg-number {
    font-size: 40vw;
  }

  .discord-status {
    font-size: 11px;
    padding: 10px 12px;
    gap: 8px;
  }

  .spotify-song,
  .spotify-artist {
    max-width: 120px;
  }
}
</style>
