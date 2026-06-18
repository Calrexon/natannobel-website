<template>
  <div class="skeleton" :class="[`skeleton-${variant}`]" :style="style" />
</template>

<script setup lang="ts">
interface Props {
  variant?: 'text' | 'rect' | 'circle' | 'card'
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'rect',
  width: '100%',
  height: '100%',
})

const style = computed(() => ({
  width: props.width,
  height: props.height,
}))
</script>

<style scoped>
.skeleton {
  background: linear-gradient(
    90deg,
    var(--paper-2) 25%,
    rgba(245, 240, 232, 0.08) 50%,
    var(--paper-2) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 2px;
}

.light .skeleton {
  background: linear-gradient(
    90deg,
    var(--paper-2) 25%,
    rgba(10, 10, 15, 0.06) 50%,
    var(--paper-2) 75%
  );
  background-size: 200% 100%;
}

.skeleton-text {
  height: 14px;
  border-radius: 2px;
}

.skeleton-circle {
  border-radius: 50%;
}

.skeleton-card {
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
