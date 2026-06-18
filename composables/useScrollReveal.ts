import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

interface RevealOptions {
  y?: number
  x?: number
  opacity?: number
  duration?: number
  delay?: number
  stagger?: number
  ease?: string
  start?: string
  once?: boolean
}

export function useScrollReveal() {
  function reveal(
    el: HTMLElement | HTMLElement[] | null,
    options: RevealOptions = {}
  ) {
    if (!el || import.meta.server) return

    const {
      y = 40,
      x = 0,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0.1,
      ease = 'power3.out',
      start = 'top 85%',
      once = true,
    } = options

    const targets = Array.isArray(el) ? el : [el]
    if (!targets.length) return

    gsap.set(targets, { y, x, opacity })

    return gsap.to(targets, {
      y: 0,
      x: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: targets[0],
        start,
        once,
      },
    })
  }

  function parallax(
    el: HTMLElement | null,
    options: { y?: number; start?: string } = {}
  ) {
    if (!el || import.meta.server) return

    const { y = 100, start = 'top bottom' } = options

    return gsap.fromTo(
      el,
      { y },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start,
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  }

  function textReveal(
    el: HTMLElement | null,
    options: { stagger?: number; duration?: number; delay?: number } = {}
  ) {
    if (!el || import.meta.server) return

    const { stagger = 0.04, duration = 0.6, delay = 0 } = options

    const text = el.textContent || ''
    el.innerHTML = ''
    const words = text.split(/\s+/).filter(Boolean)

    words.forEach((word) => {
      const wrapper = document.createElement('span')
      wrapper.style.display = 'inline-block'
      wrapper.style.overflow = 'hidden'

      const inner = document.createElement('span')
      inner.textContent = word
      inner.style.display = 'inline-block'
      inner.classList.add('word-reveal')

      wrapper.appendChild(inner)
      el.appendChild(wrapper)
      el.appendChild(document.createTextNode(' '))
    })

    const wordEls = el.querySelectorAll('.word-reveal')
    gsap.set(wordEls, { yPercent: 110, opacity: 0 })

    return gsap.to(wordEls, {
      yPercent: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })
  }

  function pinSection(
    el: HTMLElement | null,
    options: { duration?: number; start?: string } = {}
  ) {
    if (!el || import.meta.server) return

    const { duration = 1, start = 'top top' } = options

    return ScrollTrigger.create({
      trigger: el,
      start,
      pin: true,
      end: `+=${duration * 100}%`,
      scrub: false,
    })
  }

  return { reveal, parallax, textReveal, pinSection }
}
