# Ctrovalidate Demo: Next.js 15+ (App Router)

**Professional-grade validation for the leading React framework.**

This demo focuses on "Hydration-Safe" integration of Ctrovalidate within Next.js Client Components.

## 🚀 Features
- **App Router Support**: Optimized for the modern Next.js architecture.
- **Hydration Safe**: Safe initialization within `useEffect` to prevent SSR mismatches.
- **Tailwind Native**: Styled using a consolidated monochrome Tailwind system.

## 🛠️ How to run
```bash
npm install
npm run dev
```

## 📝 Critical Pattern: `"use client"`
Since Ctrovalidate interacts directly with the DOM, it must be initialized within a Client Component:
```tsx
'use client';
import { useEffect } from 'react';

// ... useEffect hook for initialization
```

---
[**View Full Documentation**](https://ctrotech-tutor.github.io/ctrovalidate/integrations/nextjs) | [**Framework Suite**](../)
