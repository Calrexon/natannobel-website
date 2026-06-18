<template>
  <div
    v-if="visible"
    class="cursor-dot"
    :class="{ hovering }"
    :style="{ transform: `translate(${tx - 4}px, ${ty - 4}px)` }"
  />
  <div
    v-if="visible"
    class="cursor-ring"
    :class="{ hovering }"
    :style="{ transform: `translate(${x - 20}px, ${y - 20}px)` }"
  />
</template>

<script setup lang="ts">
const x = ref(0)
const y = ref(0)
const tx = ref(0)
const ty = ref(0)
const hovering = ref(false)
const visible = ref(false)

let raf: number

function onMouse(e: MouseEvent) {
  tx.value = e.clientX
  ty.value = e.clientY
  visible.value = true
}

function onOver(e: MouseEvent) {
  hovering.value = !!e.target?.closest?.('[data-hover], a, button')
}

function tick() {
  x.value += (tx.value - x.value) * 0.12
  y.value += (ty.value - y.value) * 0.12
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  window.addEventListener('mousemove', onMouse)
  window.addEventListener('mouseover', onOver)
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouse)
  window.removeEventListener('mouseover', onOver)
  cancelAnimationFrame(raf)
})
</script>

<style scoped>
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  pointer-events: none;
  transition: width 0.2s, height 0.2s;
}

.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  width: 40px;
  height: 40px;
  border: 1.5px solid rgba(230, 51, 41, 0.4);
  border-radius: 50%;
  pointer-events: none;
  transition: width 0.3s var(--ease-bounce), height 0.3s var(--ease-bounce), border-color 0.3s;
}

.cursor-dot.hovering {
  width: 12px;
  height: 12px;
}

.cursor-ring.hovering {
  width: 56px;
  height: 56px;
  border-color: var(--accent);
}

@media (pointer: coarse) {
  .cursor-dot,
  .cursor-ring {
    display: none;
  }
}
</style>
