# Ctrovalidate Demo: Vue 3

**Modern validation for the Composition API.**

This demo showcases how Ctrovalidate perfectly complements Vue 3's template-driven philosophy while maintaining high performance.

## 🚀 Features
- **Composition API**: Uses `onMounted` and `ref` for clean, modern integration.
- **HTML-First Templates**: Logical rules kept in the `<template>`, keeping your `<script>` focused.
- **Showcase Aesthetic**: Implements the industrial monochrome design system.

## 🛠️ How to run
```bash
npm install
npm run dev
```

## 📝 Integration
```javascript
onMounted(() => {
  new Ctrovalidate(formRef.value, {
    realTime: true,
    logLevel: Ctrovalidate.LogLevel.DEBUG
  });
});
```

---
[**View Full Documentation**](https://ctrotech-tutor.github.io/ctrovalidate/integrations/vue) | [**Framework Suite**](../)
