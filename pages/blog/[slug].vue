<template>
  <article v-if="post" class="post-page" :class="{ visible }">
    <div class="post-hero">
      <img :src="post.image" :alt="post.title" class="hero-img" />
      <div class="hero-overlay" />
      <div class="hero-content">
        <NuxtLink to="/blog" class="back-link">&larr; BACK TO BLOG</NuxtLink>
        <span class="post-cat">{{ post.category }}</span>
        <h1 class="post-title">{{ post.title }}</h1>
        <p class="post-desc">{{ post.description }}</p>
      </div>
    </div>

    <div class="post-body">
      <div class="post-content">
        <ContentRenderer :value="post" />
      </div>

      <aside class="post-sidebar">
        <div class="sidebar-card">
          <div class="sidebar-item">
            <span class="sib-label">DATE</span>
            <span class="sib-value">{{ formatDate(post.date) }}</span>
          </div>
          <div class="sidebar-item">
            <span class="sib-label">AUTHOR</span>
            <span class="sib-value">{{ post.author }}</span>
          </div>
          <div class="sidebar-item">
            <span class="sib-label">CATEGORY</span>
            <span class="sib-value sib-cat" style="color: var(--accent)">{{ post.category }}</span>
          </div>
          <div class="sidebar-divider" />
          <button class="share-btn" @click="share">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            SHARE POST
          </button>
        </div>

        <NuxtLink to="/blog" class="more-posts">
          <span class="mp-label">EXPLORE MORE</span>
          <span class="mp-arrow">&rarr;</span>
        </NuxtLink>
      </aside>
    </div>
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const visible = ref(false)

const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () =>
  queryCollection('blog')
    .path(`/blog/${route.params.slug}`)
    .first()
)

if (post.value) {
  useHead({
    title: `${post.value.title} — Natan Nobel`,
    meta: [
      { name: 'description', content: post.value.description },
      { property: 'og:image', content: post.value.image },
    ],
  })
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function share() {
  if (navigator.share) {
    navigator.share({ title: post.value?.title, url: window.location.href })
  } else {
    navigator.clipboard.writeText(window.location.href)
  }
}

onMounted(() => {
  visible.value = true
})
</script>

<style scoped>
.post-page {
  min-height: 100dvh;
  opacity: 0;
  transition: opacity 0.6s var(--ease-out);
}

.post-page.visible {
  opacity: 1;
}

.post-hero {
  position: relative;
  min-height: 60vh;
  overflow: hidden;
  margin-top: 72px;
  background: #0a0a0f;
  display: flex;
  align-items: flex-end;
}

.hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(10, 10, 15, 0.9) 0%,
    rgba(10, 10, 15, 0.5) 40%,
    rgba(10, 10, 15, 0.15) 70%,
    transparent 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 4rem 6vw;
  max-width: calc(1200px + 12vw);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.back-link {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.14em;
  color: rgba(245, 240, 232, 0.6);
  text-decoration: none;
  transition: color 0.2s;
  width: fit-content;
}

.back-link:hover {
  color: var(--accent);
}

.post-cat {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.14em;
  background: var(--accent);
  color: #f5f0e8;
  padding: 4px 12px;
  width: fit-content;
  text-transform: uppercase;
}

.post-title {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(36px, 5vw, 72px);
  color: #f5f0e8;
  line-height: 1.1;
  max-width: 800px;
  letter-spacing: 0.01em;
}

.post-desc {
  font-family: var(--f-body, 'DM Sans', sans-serif);
  font-size: clamp(16px, 2vw, 20px);
  color: rgba(245, 240, 232, 0.8);
  line-height: 1.6;
  max-width: 650px;
  margin-top: 0.5rem;
  font-weight: 400;
  letter-spacing: 0.01em;
}

.post-body {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 6vw;
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 5rem;
  align-items: start;
}

.post-content {
  min-width: 0;
}

.post-content :deep(p) {
  font-size: 16px;
  line-height: 1.85;
  color: var(--mid);
  margin-bottom: 1.4rem;
}

.post-content :deep(h2) {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(32px, 4vw, 52px);
  color: var(--ink);
  margin: 3rem 0 1.2rem;
  letter-spacing: 0.02em;
  line-height: 1;
}

.post-content :deep(pre) {
  background: rgba(245, 240, 232, 0.06);
  border: 1px solid rgba(245, 240, 232, 0.1);
  color: var(--ink);
  padding: 1.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 13px;
  line-height: 1.7;
}

.light .post-content :deep(pre) {
  background: var(--ink);
  color: var(--paper);
  border: 1px solid var(--light);
}

.post-content :deep(code) {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 13px;
  background: rgba(199, 187, 247, 0.15);
  padding: 2px 6px;
}

.light .post-content :deep(code) {
  background: rgba(10, 10, 15, 0.08);
}

.post-content :deep(em) {
  font-style: italic;
  color: var(--ink);
}

.post-sidebar {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar-card {
  border: 1px solid rgba(245, 240, 232, 0.08);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.light .sidebar-card {
  border-color: rgba(10, 10, 15, 0.1);
}

.sidebar-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sib-label {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--mid);
  text-transform: uppercase;
}

.sib-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
}

.sidebar-divider {
  height: 1px;
  background: rgba(245, 240, 232, 0.08);
}

.light .sidebar-divider {
  background: rgba(10, 10, 15, 0.1);
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 1.5px solid rgba(245, 240, 232, 0.12);
  color: var(--mid);
  padding: 10px 16px;
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

.light .share-btn {
  border-color: rgba(10, 10, 15, 0.15);
}

.share-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.more-posts {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(245, 240, 232, 0.08);
  padding: 1rem 1.2rem;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;
}

.light .more-posts {
  border-color: rgba(10, 10, 15, 0.1);
}

.more-posts:hover {
  background: var(--paper-2);
  border-color: var(--accent);
}

.mp-label {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--mid);
}

.mp-arrow {
  color: var(--accent);
  font-size: 16px;
}

@media (max-width: 900px) {
  .post-hero {
    min-height: 50vh;
  }

  .hero-content {
    padding: 3rem 5vw;
  }

  .post-body {
    grid-template-columns: 1fr;
  }

  .post-sidebar {
    position: static;
  }
}

@media (max-width: 600px) {
  .post-hero {
    min-height: 70vh;
  }

  .hero-content {
    padding: 2.5rem 4vw;
    gap: 0.75rem;
  }

  .post-title {
    font-size: clamp(28px, 8vw, 42px);
  }
}
</style>
