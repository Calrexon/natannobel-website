import Lenis from 'lenis'

export function useLenis() {
  const prefersReducedMotion = ref(false)

  function init() {
    if (import.meta.server) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      prefersReducedMotion.value = true
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return lenis
  }

  return { init, prefersReducedMotion }
}
