<template>
  <canvas ref="canvas" aria-hidden="true" class="ambient-canvas" />
</template>

<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null)
let animFrame: number

onMounted(() => {
  if (!canvas.value) return
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  let W = (canvas.value.width = window.innerWidth)
  let H = (canvas.value.height = window.innerHeight)

  const orbs = [
    { x: W * 0.15, y: H * 0.2, r: 380, dx: 0.18, dy: 0.12, color: [230, 51, 41], opacity: 0.13 },
    { x: W * 0.8, y: H * 0.15, r: 320, dx: -0.14, dy: 0.16, color: [0, 212, 255], opacity: 0.10 },
    { x: W * 0.5, y: H * 0.75, r: 420, dx: 0.10, dy: -0.13, color: [184, 255, 0], opacity: 0.07 },
    { x: W * 0.85, y: H * 0.7, r: 280, dx: -0.16, dy: -0.10, color: [245, 166, 35], opacity: 0.09 },
  ]

  function draw() {
    if (!ctx) return
    ctx.clearRect(0, 0, W, H)

    for (const orb of orbs) {
      const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r)
      const [r, g, b] = orb.color
      grad.addColorStop(0, `rgba(${r},${g},${b},${orb.opacity})`)
      grad.addColorStop(0.5, `rgba(${r},${g},${b},${orb.opacity * 0.4})`)
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`)

      ctx.beginPath()
      ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      orb.x += orb.dx
      orb.y += orb.dy

      if (orb.x < -orb.r * 0.5 || orb.x > W + orb.r * 0.5) orb.dx *= -1
      if (orb.y < -orb.r * 0.5 || orb.y > H + orb.r * 0.5) orb.dy *= -1
    }

    animFrame = requestAnimationFrame(draw)
  }

  draw()

  const onResize = () => {
    W = canvas.value!.width = window.innerWidth
    H = canvas.value!.height = window.innerHeight
  }
  window.addEventListener('resize', onResize)

  onUnmounted(() => {
    cancelAnimationFrame(animFrame)
    window.removeEventListener('resize', onResize)
  })
})
</script>

<style scoped>
.ambient-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  filter: blur(60px);
}
</style>
