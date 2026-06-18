<template>
  <div class="ripple-container" @touchstart="onTouch" />
</template>

<script setup lang="ts">
interface Ripple {
  id: number
  x: number
  y: number
}

const ripples = ref<Ripple[]>([])
let nextId = 0

function onTouch(e: TouchEvent) {
  const touch = e.touches[0]
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()

  const ripple: Ripple = {
    id: nextId++,
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top,
  }
  ripples.value.push(ripple)

  setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id !== ripple.id)
  }, 600)
}
</script>

<style scoped>
.ripple-container {
  position: fixed;
  inset: 0;
  z-index: 9997;
  pointer-events: none;
}

@media (pointer: fine) {
  .ripple-container {
    display: none;
  }
}
</style>
