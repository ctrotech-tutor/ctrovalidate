<script setup>
import { useData } from 'vitepress'
import { computed, ref, onMounted } from 'vue'

const { page } = useData()

const isV4 = computed(() => page.value.relativePath.startsWith('v4/'))
const isDismissed = ref(true) // Default to true to prevent flash before mount

onMounted(() => {
  const dismissed = localStorage.getItem('ctrovalidate_announcement_dismissed')
  // Only show if not dismissed or if the version context changed (optional complexity)
  isDismissed.value = !!dismissed
})

function dismiss() {
  isDismissed.value = true
  localStorage.setItem('ctrovalidate_announcement_dismissed', 'true')
}
</script>

<template>
  <div v-if="!isDismissed" class="announcement-wrapper">
    <div v-if="isV4" class="announcement-bar warning">
      <div class="container">
        <span class="icon">⚠️</span>
        <p class="text">
          You are viewing the <strong>v4 (Alpha)</strong> documentation. This version is under active development.
          <a href="/" class="link">Return to v3 Stable →</a>
        </p>
        <button class="close-btn" @click="dismiss" aria-label="Dismiss announcement">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </button>
      </div>
    </div>
    <div v-else class="announcement-bar info">
      <div class="container">
        <span class="icon">🚀</span>
        <p class="text">
          <strong>Ctrovalidate v4 (Alpha)</strong> is here! Experience the new universal monorepo engine.
          <a href="/v4/" class="link">Explore v4 Documentation →</a>
        </p>
        <button class="close-btn" @click="dismiss" aria-label="Dismiss announcement">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.announcement-bar {
  padding: 10px 24px;
  text-align: center;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
  z-index: 100;
  border-bottom: 1px solid transparent;
}

.announcement-bar.info {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-light);
}

.announcement-bar.warning {
  background-color: #fef3c7;
  color: #92400e;
  border-bottom-color: #fde68a;
}

.dark .announcement-bar.warning {
  background-color: #451a03;
  color: #fbbf24;
  border-bottom-color: #78350f;
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
}

.text {
  margin: 0;
  flex: 1;
}

.link {
  font-weight: 600;
  text-decoration: underline;
  margin-left: 8px;
  color: inherit;
}

.link:hover {
  text-decoration: none;
  opacity: 0.8;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  color: currentColor;
  opacity: 0.6;
  transition: opacity 0.2s, background-color 0.2s;
}

.close-btn:hover {
  opacity: 1;
  background-color: rgba(0,0,0,0.05);
}

.dark .close-btn:hover {
  background-color: rgba(255,255,255,0.1);
}

@media (max-width: 768px) {
  .announcement-bar {
    font-size: 13px;
    padding: 8px 16px;
  }
  .container {
    gap: 8px;
  }
}
</style>
