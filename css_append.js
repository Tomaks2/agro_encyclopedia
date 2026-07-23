const fs = require('fs');
const css = `
/* ═══════════════════════════════════════════════
   WOW EFFECT & REDESIGN COMPONENT STYLES
═══════════════════════════════════════════════ */

/* Glassmorphism */
.glass-panel {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
}

.glass-search-input {
  background: rgba(255, 255, 255, 0.15) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}
.glass-search-input::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }

/* Ticker Marquee */
.ticker-wrap {
  width: 100%;
  overflow: hidden;
  background: var(--color-bg-alt);
  padding: 1.5rem 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
}

.ticker-content {
  display: inline-block;
  white-space: nowrap;
  animation: ticker 40s linear infinite;
}

.ticker-content:hover { animation-play-state: paused; }

.ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 2rem;
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  position: relative;
}

.ticker-item:not(:last-child)::after {
  content: '•';
  color: var(--color-border);
  position: absolute;
  right: -0.25rem;
}

@keyframes ticker {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

/* Feature Glow Cards */
.feature-glow-card {
  position: relative;
  background: var(--color-primary-dark);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1;
}

.feature-glow-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: var(--radius-xl);
  padding: 2px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.feature-glow-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}
.feature-glow-card:hover::before {
  opacity: 1;
  background: linear-gradient(135deg, var(--color-accent), rgba(255,255,255,0));
}

/* Premium Syllabus Card (Culture Page) */
.syllabus-card {
  display: flex;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  gap: 1.5rem;
  transition: all 0.3s ease;
  text-decoration: none !important;
  margin-bottom: 1rem;
}
.syllabus-card:hover {
  background: linear-gradient(to right, var(--color-surface), var(--color-bg-alt));
  border-color: var(--color-border);
  transform: translateX(8px);
  box-shadow: var(--shadow-sm);
}
.syllabus-number {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.syllabus-content {
  flex-grow: 1;
}
.syllabus-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: 0.25rem;
}
.syllabus-desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
}
.syllabus-arrow {
  color: var(--color-muted);
  transition: transform 0.3s ease, color 0.3s ease;
}
.syllabus-card:hover .syllabus-arrow {
  transform: translateX(4px);
  color: var(--color-primary);
}
`;
fs.appendFileSync('m:/agro_encyclopedia/src/app/globals.css', '\n' + css, 'utf8');
