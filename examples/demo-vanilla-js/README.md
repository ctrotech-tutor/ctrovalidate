# Ctrovalidate Demo: Vanilla JS (Vite)

**Professional-grade validation for modern JavaScript applications.**

This demo uses [Vite](https://vitejs.dev/) to demonstrate a modern development workflow with Ctrovalidate in a pure JavaScript environment.

## 🚀 Features
- **Modern ESM**: Clean module imports and industrial bundling.
- **Custom Rules**: Demonstrates `Ctrovalidate.addRule` for custom security schemas.
- **Async Checks**: Real-time username availability validation with simulated network latency.

## 🛠️ How to run
```bash
npm install
npm run dev
```

## 📝 Integration
```javascript
import { Ctrovalidate } from 'ctrovalidate';

const validator = new Ctrovalidate(form, {
  realTime: true,
  logLevel: Ctrovalidate.LogLevel.DEBUG
});
```

---
[**View Full Documentation**](https://ctrotech-tutor.github.io/ctrovalidate/guide/getting-started) | [**Framework Suite**](../)
