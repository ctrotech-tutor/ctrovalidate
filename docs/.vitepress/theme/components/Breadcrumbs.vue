<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

const breadcrumbs = computed(() => frontmatter.value.breadcrumb || [])
</script>

<template>
  <nav v-if="breadcrumbs.length > 0" class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li v-for="(item, index) in breadcrumbs" :key="index" class="breadcrumb-item">
        <a v-if="index < breadcrumbs.length - 1" :href="item.url" class="breadcrumb-link">
          {{ item.name }}
        </a>
        <span v-else class="breadcrumb-current" aria-current="page">
          {{ item.name }}
        </span>
        <span v-if="index < breadcrumbs.length - 1" class="separator" aria-hidden="true">
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  margin-bottom: 24px;
  font-size: 0.9rem;
}

.breadcrumb-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-text-2);
}

.breadcrumb-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.breadcrumb-current {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.separator {
  color: var(--vp-c-text-3);
  user-select: none;
}

@media (max-width: 768px) {
  .breadcrumbs {
    font-size: 0.8rem;
    margin-bottom: 16px;
  }
}
</style>
