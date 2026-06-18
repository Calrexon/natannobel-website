<template>
  <div class="layout-default">
    <SkipToContent />
    <ClientOnly>
      <AmbientBackground />
      <CustomCursor />
    </ClientOnly>
    <NoiseOverlay />
    <AppNav />
    <main id="main-content">
      <slot />
    </main>
    <SiteFooter />
    <ScrollToTop />
    <ClientOnly>
      <MobileRipple />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
})
</script>

<style>
.layout-default {
  position: relative;
  min-height: 100dvh;
  background: var(--paper);
}
</style>
