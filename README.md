# Rein — Portfolio & Blog

Personal portfolio and blog of **Natan Nobel** — builder, crafter, dreamer.

🔗 [reincal.is-a.dev](https://reincal.is-a.dev)

## Tech Stack

- **Framework:** [Nuxt 3](https://nuxt.com) + Vue 3 + TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com) + custom CSS
- **Animation:** [GSAP](https://gsap.com) + [Lenis](https://lenis.darkroom.engineering) smooth scroll
- **Content:** [Nuxt Content v2](https://content.nuxtjs.org) (Markdown blog)
- **CMS:** [Sveltia CMS](https://sveltiacms.dev) (headless admin panel)
- **Modules:** Google Fonts, Schema.org, Sitemap, VueUse

## Features

- Static site generation (SSG) with prerendered routes
- Dark mode with system preference detection
- Custom cursor
- RSS feed
- Responsive design
- Page transitions

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 18
- [pnpm](https://pnpm.io) (recommended)

### Installation

```bash
git clone https://github.com/calrexon/reinwebsite.git
cd reinwebsite
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
├── assets/           # CSS files
├── components/       # Vue components
├── composables/      # Vue composables
├── content/blog/     # Markdown blog posts
├── layouts/          # Nuxt layouts
├── pages/            # File-based routing
├── public/           # Static assets & Sveltia CMS admin
├── server/           # Server routes (RSS feed)
├── nuxt.config.ts    # Nuxt configuration
└── tailwind.config.ts
```

## Deployment

This project is configured for static site generation and can be deployed on any static hosting provider:

- **Vercel:** Push to GitHub and import the repo on [vercel.com](https://vercel.com)
- **Netlify:** Connect the repo on [netlify.com](https://netlify.com)
- **Cloudflare Pages:** Connect the repo on [pages.cloudflare.com](https://pages.cloudflare.com)

## License

[MIT](LICENSE)
