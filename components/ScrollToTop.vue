<template>
  <button
    v-show="visible"
    class="scroll-to-top"
    aria-label="Scroll to top"
    @click="scrollToTop"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  </button>
</template>

<script setup lang="ts">
const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 40;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ink);
  color: var(--paper);
  border: none;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.3s var(--ease-out) forwards;
  transition: transform 0.3s var(--ease-bounce), background-color 0.2s;
}

.scroll-to-top:hover {
  transform: translateY(-3px) scale(1.05);
  background: var(--accent);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (pointer: coarse) {
  .scroll-to-top {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 44px;
    height: 44px;
  }
}
</style>
