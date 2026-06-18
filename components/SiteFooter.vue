<template>
  <footer class="site-footer">
    <span class="footer-name">Natan Nobel</span>
    <span class="footer-mid">Built with Nuxt.js &middot; {{ currentYear }}</span>
    <span class="footer-back">
      <a href="#top" data-hover>BACK TO TOP &uarr;</a>
    </span>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  background: var(--paper);
  color: var(--ink);
  border-top: 1px solid rgba(245, 240, 232, 0.08);
  padding: 2rem 6vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.light .site-footer {
  background: var(--paper-2);
  border-top-color: rgba(10, 10, 15, 0.08);
}

.footer-name {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: 20px;
  letter-spacing: 0.1em;
}

.footer-mid {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: rgba(245, 240, 232, 0.3);
}

.light .footer-mid {
  color: rgba(10, 10, 15, 0.4);
}

.footer-back a {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: rgba(245, 240, 232, 0.35);
  text-decoration: none;
  transition: color 0.2s;
}

.light .footer-back a {
  color: rgba(10, 10, 15, 0.45);
}

.footer-back a:hover {
  color: var(--accent);
}
</style>
