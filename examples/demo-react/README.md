# Ctrovalidate Demo: React 18+

**Industrial-grade validation for the React ecosystem.**

This demo demonstrates the standard "Hook Pattern" for integrating Ctrovalidate within a React component lifecycle.

## 🚀 Features
- **Lifecycle Integration**: Safe initialization using `useRef` and `useEffect`.
- **Dynamic Feedback**: Real-time validation without state-related re-render overhead.
- **Conditional Logic**: Fields that activate based on complex component state.

## 🛠️ How to run
```bash
npm install
npm run dev
```

## 📝 Integration Pattern
```tsx
useEffect(() => {
  if (formRef.current) {
    new Ctrovalidate(formRef.current, {
      realTime: true,
      pendingClass: 'is-validating'
    });
  }
}, []);
```

---

[Back to Framework Suite](../)
