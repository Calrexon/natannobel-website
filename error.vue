<template>
  <div class="error-page">
    <div class="error-inner">
      <h1 class="error-code">404</h1>
      <p class="error-text">PAGE NOT FOUND</p>
      <p class="error-desc">This page does not exist or has been moved.</p>
      <NuxtLink to="/" class="error-link">
        BACK TO HOME
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number
    statusMessage: string
  }
}>()

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/')
  }, 5000)
})
</script>

<style scoped>
.error-page {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--paper);
  padding: 2rem;
}

.error-inner {
  text-align: center;
}

.error-code {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(120px, 20vw, 240px);
  line-height: 0.85;
  color: var(--ink);
  letter-spacing: -0.02em;
}

.error-text {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--accent);
  margin-top: 1rem;
  text-transform: uppercase;
}

.error-desc {
  font-family: var(--f-body, 'DM Sans', sans-serif);
  font-size: 15px;
  color: var(--mid);
  margin-top: 0.75rem;
  margin-bottom: 2rem;
}

.error-link {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--ink);
  border-bottom: 1.5px solid var(--ink);
  padding-bottom: 2px;
  transition: color 0.2s, border-color 0.2s;
}

.error-link:hover {
  color: var(--accent);
  border-color: var(--accent);
}
</style>
