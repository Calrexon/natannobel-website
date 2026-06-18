<template>
  <main class="blog-page">
    <div class="page-header" :class="{ visible }">
      <p class="page-pre">WRITING</p>
      <h1 class="page-title">BLOG<span class="dot">_</span></h1>
      <p class="page-desc">Thoughts on code, craft, and the occasional rant.</p>
    </div>

    <div v-if="!posts || posts.length === 0" class="empty-state" :class="{ visible }">
      <p class="empty-text">No posts yet. Check back soon.</p>
    </div>

    <div v-else class="post-list">
      <NuxtLink
        v-for="(post, i) in posts"
        :key="post._path"
        :to="post._path"
        class="post-card"
        :class="{ visible }"
        :style="{ transitionDelay: `${i * 100}ms` }"
      >
        <div class="post-img-wrap">
          <img :src="post.image" :alt="post.title" class="post-img" loading="lazy" />
          <div class="post-overlay" />
          <span class="post-cat">{{ post.category }}</span>
        </div>
        <div class="post-body">
          <div class="post-meta">
            <span class="post-date">{{ formatDate(post.date) }}</span>
          </div>
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-desc">{{ post.description }}</p>
          <span class="post-read">READ MORE &rarr;</span>
        </div>
      </NuxtLink>
    </div>

  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Blog — Natan Nobel',
  meta: [{ name: 'description', content: 'Writing about code, systems, and the craft of building software.' }],
})

const visible = ref(false)

const { data: posts } = await useAsyncData('blog-list', () =>
  queryContent('blog')
    .sort({ date: -1 })
    .find()
)

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(() => {
  visible.value = true
})
</script>

<style scoped>
.blog-page {
  padding: 10rem 6vw 0;
  min-height: 100dvh;
}

.page-header {
  max-width: 1200px;
  margin: 0 auto 5rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}

.page-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.page-pre {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 0.8rem;
}

.page-title {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(80px, 12vw, 180px);
  line-height: 0.85;
  color: var(--ink);
  margin-bottom: 1rem;
}

.dot {
  color: var(--accent);
}

.page-desc {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--mid);
}

.empty-state {
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s 0.2s var(--ease-out), transform 0.8s 0.2s var(--ease-out);
}

.empty-state.visible {
  opacity: 1;
  transform: translateY(0);
}

.empty-text {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 13px;
  color: var(--mid);
  letter-spacing: 0.08em;
}

.post-list {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2px;
}

.post-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--ink);
  background: var(--paper-2);
  overflow: hidden;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}

.post-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.post-card:hover .post-img {
  transform: scale(1.04);
}

.post-card:hover .post-read {
  color: var(--accent);
  letter-spacing: 0.18em;
}

.post-img-wrap {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.post-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}

.post-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 10, 15, 0.4), transparent);
}

.light .post-overlay {
  background: linear-gradient(to top, rgba(10, 10, 15, 0.55), transparent);
}

.post-cat {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.12em;
  background: var(--accent);
  color: var(--paper);
  padding: 4px 10px;
  text-transform: uppercase;
}

.post-body {
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  flex: 1;
}

.post-meta {
  display: flex;
  gap: 1rem;
}

.post-date {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--mid);
  text-transform: uppercase;
}

.post-title {
  font-family: var(--f-display, 'Bebas Neue', sans-serif);
  font-size: clamp(22px, 3vw, 30px);
  line-height: 1.1;
  color: var(--ink);
  letter-spacing: 0.01em;
}

.post-desc {
  font-size: 13px;
  line-height: 1.65;
  color: var(--mid);
  flex: 1;
}

.post-read {
  font-family: var(--f-mono, 'JetBrains Mono', monospace);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--ink);
  transition: color 0.2s, letter-spacing 0.3s var(--ease-out);
  margin-top: auto;
}

@media (max-width: 768px) {
  .post-list {
    grid-template-columns: 1fr;
  }
}
</style>
