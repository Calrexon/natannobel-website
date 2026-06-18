import { ref, watch, onMounted } from 'vue'

export function useTheme() {
  const theme = ref<'dark' | 'light'>('dark')
  const initialized = ref(false)

  onMounted(() => {
    if (initialized.value) return
    initialized.value = true

    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (stored) {
      theme.value = stored
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      theme.value = 'light'
    }
    document.documentElement.classList.toggle('light', theme.value === 'light')
  })

  const isDark = computed(() => theme.value === 'dark')

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  watch(theme, (val) => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('light', val === 'light')
      localStorage.setItem('theme', val)
    }
  })

  return { theme, isDark, toggle }
}
