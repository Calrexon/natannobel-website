<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-[6vw]"
    :class="{ 'nav-scrolled': scrolled, 'nav-open': menuOpen }"
  >
    <div class="max-w-[1200px] mx-auto flex items-center justify-between h-[72px]">
      <NuxtLink to="/" class="nav-logo font-display text-[22px] tracking-[0.12em] text-ink transition-colors hover:text-accent">
        <span class="text-accent">[</span>REIN<span class="text-accent">]</span>
      </NuxtLink>

      <div class="nav-links" :class="{ open: menuOpen }">
        <NuxtLink
          v-for="link in links"
          :key="link.href"
          :to="link.href"
          class="nav-link"
          :class="{ active: route.path === link.href }"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <div class="nav-actions">
        <button
          class="theme-toggle"
          aria-label="Toggle theme"
          @click="toggleTheme()"
        >
          <svg v-if="isDark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <button
          class="hamburger"
          aria-label="Menu"
          @click="menuOpen = !menuOpen"
        >
          <span :class="{ open: menuOpen }" />
          <span :class="{ open: menuOpen }" />
          <span :class="{ open: menuOpen }" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const { isDark, toggle: toggleTheme } = useTheme()

const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { href: '/', label: 'HOME' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/blog', label: 'BLOG' },
  { href: '/contact', label: 'CONTACT' },
]

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

watch(() => route.path, () => {
  menuOpen.value = false
})
</script>

<style scoped>
.nav-scrolled {
  background: color-mix(in srgb, var(--paper) 90%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 rgba(245, 240, 232, 0.05);
}

.light .nav-scrolled {
  box-shadow: 0 1px 0 rgba(10, 10, 15, 0.08);
}

.nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav-link {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--mid);
  position: relative;
  transition: color 0.2s;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--accent);
  transition: width 0.3s var(--ease-out);
}

.nav-link:hover,
.nav-link.active {
  color: var(--ink);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: none;
  border: 1.5px solid rgba(245, 240, 232, 0.15);
  color: var(--mid);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, transform 0.3s var(--ease-bounce);
}

.light .theme-toggle {
  border-color: rgba(10, 10, 15, 0.15);
}

.theme-toggle:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: rotate(20deg) scale(1.1);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--ink);
  transition: transform 0.3s, opacity 0.3s;
  transform-origin: center;
}

.hamburger span.open:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    background: var(--paper);
    flex-direction: column;
    padding: 2rem 6vw;
    gap: 1.5rem;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.4s var(--ease-out), opacity 0.4s;
    border-bottom: 1px solid rgba(245, 240, 232, 0.1);
  }

  .light .nav-links {
    border-bottom-color: rgba(10, 10, 15, 0.1);
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .nav-link {
    font-size: 13px;
  }
}
</style>
