<template>
  <a href="#main-content" class="skip-link" @click.prevent="skipToContent">
    Skip to content
  </a>
</template>

<script setup lang="ts">
function skipToContent() {
  const main = document.getElementById('main-content')
  if (main) {
    main.focus()
    main.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.skip-link {
  position: fixed;
  top: -100%;
  left: 1rem;
  z-index: 9999;
  padding: 0.75rem 1.5rem;
  background: var(--accent);
  color: var(--paper);
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 1rem;
}
</style>
