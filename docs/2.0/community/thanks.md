---
title: Thank You for Supporting Ctrovalidate
description: We are incredibly grateful for your support!
layout: page
---

<div class="thanks-container">
  <div class="celebration-hero">
    <div class="confetti-pattern"></div>
    <div class="hero-content">
      <div class="heart-icon">💖</div>
      <h1 class="gradient-text">You're Awesome!</h1>
      <p class="sub-text">Thank you for being a part of the Ctrovalidate journey. Your support helps us build a more accessible web for everyone.</p>
    </div>
  </div>

  <div class="impact-grid">
    <div class="glass-card">
      <h3>🚀 Impact</h3>
      <p>Your contribution directly funds infrastructure, maintenance, and the development of new features.</p>
    </div>
    <div class="glass-card">
      <h3>🤝 Community</h3>
      <p>You've joined a growing community of developers who value accessibility and modern tooling.</p>
    </div>
  </div>

  <div class="share-section">
    <h2>Spread the Love</h2>
    <p>Let others know you've supported Ctrovalidate and encourage them to join the movement!</p>
    
    <div class="social-actions">
      <a href="https://twitter.com/intent/tweet?text=I%20just%20supported%20Ctrovalidate!%20Check%20out%20this%20awesome%20form%20validation%20library:%20https://ctrotech-tutor.github.io/ctrovalidate/" target="_blank" class="share-btn twitter">
        <span class="icon">🐦</span> Share on X / Twitter
      </a>
      <a href="https://github.com/ctrotech-tutor/ctrovalidate" target="_blank" class="share-btn github">
        <span class="icon">⭐</span> Star on GitHub
      </a>
    </div>
  </div>

  <div class="footer-links">
    <a href="/" class="link-back">Documentation Home</a>
    <span class="separator">·</span>
    <a href="/guide/getting-started" class="link-back">Getting Started</a>
  </div>
</div>

<style>
:root {
  --premium-gradient: linear-gradient(135deg, #646cff 0%, #b34bff 100%);
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.1);
}

.thanks-container {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 0;
}

.celebration-hero {
  position: relative;
  padding: 80px 40px;
  background: radial-gradient(circle at 50% 50%, rgba(100, 108, 255, 0.1) 0%, transparent 70%);
  border-radius: 32px;
  margin-bottom: 48px;
  overflow: hidden;
}

.heart-icon {
  font-size: 5rem;
  margin-bottom: 24px;
  animation: heartPulse 2s infinite ease-in-out;
}

.gradient-text {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  background: var(--premium-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sub-text {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 64px;
}

.glass-card {
  padding: 32px;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  text-align: left;
}

.glass-card h3 {
  color: var(--vp-c-brand);
  margin-bottom: 12px;
}

.share-section {
  padding: 64px 40px;
  border-top: 1px solid var(--vp-c-divider);
}

.social-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.share-btn.twitter {
  background: #000;
  color: #fff !important;
}

.share-btn.github {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1) !important;
  border: 1px solid var(--vp-c-divider);
}

.share-btn:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.footer-links {
  margin-top: 64px;
  color: var(--vp-c-text-3);
}

.link-back {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 600;
}

.separator {
  margin: 0 12px;
}

@keyframes heartPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@media (max-width: 640px) {
  .gradient-text {
    font-size: 2.2rem;
  }
  .social-actions {
    flex-direction: column;
  }
}
</style>
