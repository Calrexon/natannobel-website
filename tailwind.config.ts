/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: {
          DEFAULT: 'var(--paper)',
          2: 'var(--paper-2)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          2: 'var(--accent-2)',
        },
        cyan: 'var(--cyan)',
        neon: 'var(--neon)',
        mid: 'var(--mid)',
        light: 'var(--light)',
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Arial Black"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        bounce: 'var(--ease-bounce)',
        out: 'var(--ease-out)',
      },
      animation: {
        'marquee': 'marquee 22s linear infinite',
        'noise-drift': 'noiseDrift 8s steps(2) infinite',
        'float-chip': 'floatChip 4s ease-in-out infinite',
        'frame-pulse': 'framePulse 3s ease-in-out infinite',
        'status-pulse': 'statusPulse 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.33%)' },
        },
        noiseDrift: {
          '0%': { transform: 'translate(0,0)' },
          '25%': { transform: 'translate(-2px, 1px)' },
          '50%': { transform: 'translate(1px, -2px)' },
          '75%': { transform: 'translate(-1px, 2px)' },
          '100%': { transform: 'translate(0,0)' },
        },
        floatChip: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        framePulse: {
          '0%, 100%': { transform: 'translate(0,0)', opacity: '1' },
          '50%': { transform: 'translate(6px,6px)', opacity: '0.6' },
        },
        statusPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 currentColor' },
          '50%': { boxShadow: '0 0 0 4px transparent' },
        },
      },
    },
  },
  plugins: [],
}
