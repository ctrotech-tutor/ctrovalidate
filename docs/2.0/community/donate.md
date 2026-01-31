---
title: Support Ctrovalidate
description: Support the development of Ctrovalidate - a modern, accessible form validation library.
layout: page
---

# Support Ctrovalidate 🚀

<p class="lead-text">
Ctrovalidate is an open-source project built with a mission to make every form on the web accessible by default. Your support ensures the library remains free, fast, and feature-rich for everyone.
</p>

<div class="donation-container">
  <div class="glass-card main-feature">
    <div class="card-content">
      <div class="badge">Recommended</div>
      <h2>Become a Sponsor</h2>
      <p>Join our mission by becoming a monthly sponsor. Your name or logo will be featured on our documentation and README.</p>
      <div class="action-row">
        <a href="https://github.com/sponsors/ctrotech-tutor" target="_blank" class="btn-premium github">
          <span class="icon">✨</span> Sponsor on GitHub
        </a>
      </div>
    </div>
  </div>

  <div class="donation-grid">
    <div class="glass-card small">
      <div class="card-icon">☕</div>
      <h3>Buy Me a Coffee</h3>
      <p>A quick way to show support.</p>
      <a href="https://www.buymeacoffee.com/ctrotech" target="_blank" class="btn-outline">Support</a>
    </div>

    <div class="glass-card small">
      <div class="card-icon">💳</div>
      <h3>Paystack</h3>
      <p>Fast, secure local payments.</p>
      <a href="https://paystack.shop/pay/ctrovalidate-support" target="_blank" class="btn-outline">Support</a>
    </div>

    <div class="glass-card small">
      <div class="card-icon">🌊</div>
      <h3>Flutterwave</h3>
      <p>International support hub.</p>
      <a href="https://flutterwave.com/donate/nkde0iddzjde" target="_blank" class="btn-outline">Support</a>
    </div>
  </div>
</div>

## Why your support matters

<div class="features-grid">
  <div class="feature-item">
    <h4>⚡ Infrastructure</h4>
    <p>Hosting, CI/CD, and professional testing environments.</p>
  </div>
  <div class="feature-item">
    <h4>🛠️ Maintenance</h4>
    <p>Faster bug fixes and long-term browser compatibility.</p>
  </div>
  <div class="feature-item">
    <h4>🚀 Innovation</h4>
    <p>New framework adapters and advanced validation rules.</p>
  </div>
  <div class="feature-item">
    <h4>♿ Accessibility</h4>
    <p>Leading the push for accessible forms by default.</p>
  </div>
</div>

<style>
:root {
  --premium-gradient: linear-gradient(135deg, #646cff 0%, #b34bff 100%);
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.1);
}

.dark {
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.1);
}

.lead-text {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  max-width: 800px;
  margin-bottom: 48px;
  line-height: 1.6;
}

.donation-container {
  margin: 40px 0;
}

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 40px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--premium-gradient);
  opacity: 0;
  transition: opacity 0.3s;
}

.glass-card:hover {
  transform: translateY(-8px);
  border-color: rgba(100, 108, 255, 0.4);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.glass-card:hover::before {
  opacity: 1;
}

.main-feature {
  margin-bottom: 32px;
  background: linear-gradient(rgba(100, 108, 255, 0.05), rgba(179, 75, 255, 0.05)), var(--glass-bg);
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--premium-gradient);
  color: white;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
}

.main-feature h2 {
  font-size: 2.5rem;
  margin: 0 0 16px 0;
  background: var(--premium-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.donation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.glass-card.small {
  padding: 32px;
  text-align: center;
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.btn-premium {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: var(--premium-gradient);
  color: white !important;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none !important;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-premium:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(100, 108, 255, 0.3);
}

.btn-outline {
  display: block;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  color: var(--vp-c-text-1) !important;
  text-decoration: none !important;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-outline:hover {
  background: var(--vp-c-brand);
  color: white !important;
  border-color: var(--vp-c-brand);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  margin-top: 48px;
}

.feature-item h4 {
  margin-bottom: 8px;
  color: var(--vp-c-brand);
}

.feature-item p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .main-feature h2 {
    font-size: 1.8rem;
  }
}
</style>
