# Hernata Ramadhan (HRNT) — Portfolio

Official personal engineering portfolio of **Hernata Ramadhan (HRNT)**, Full-Stack Software Engineer. Engineered with Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS, Lenis smooth scrolling, Firebase Auth & Firestore REST integration, and defense-in-depth security.

---

## 🌟 Overview & Architecture

- **Design System**: Obsidian Bento Grid architecture with deep canvas (`#090A0F`), subtle glassmorphism (`backdrop-filter: blur(16px)`), responsive typography powered by `Inter`, and signature cyan diamond branding.
- **Dynamic 8-Module Navigation**:
  - `01 / Dashboard`: Executive bento overview with live availability pulse, featured project spotlight, core tech stack radar, production metrics, and express dispatch.
  - `02 / Work`: Filterable engineering catalog showcasing 9 production web & desktop applications with interactive deep-dive case study dialogs.
  - `03 / Stack`: Interactive SVG architecture flow diagram simulating edge-to-persistence routing alongside 14 zero-CDN local vector SVG badges.
  - `04 / About`: Educational background at Universitas PGRI Madiun, career milestones timeline, and core engineering principles.
  - `05 / Stats`: Live telemetry and observability synchronizing GitHub contributions/repos and WakaTime coding focus hours with rate-limit protection.
  - `06 / Awards`: National qualifications (*Dicoding*, *LESKOFI*) with credential inspection, alongside UPTPTKK Surabaya media cohort documentation.
  - `07 / Forum`: Public community guestbook powered by Firebase Auth (Google, GitHub, Email/Password) and Firestore with optimistic updates and 15s polling.
  - `08 / Contact`: Direct collaboration inquiry form integrated with Web3Forms and direct social channels dock.

---

## 🛡️ Defense-in-Depth Security

1. **Multi-Layer XSS Sanitizer**: Strips script tags, style injections, malicious URL protocols (`javascript:`, `vbscript:`, `data:text/html`), event handlers (`on\w+=`), control characters, and null bytes before Firestore persistence.
2. **IP Rate Limiting Engine**: In-memory token bucket tracking client IP via `x-forwarded-for` and `x-real-ip` with automatic sliding-window cleanup.
3. **Strict Content-Security-Policy (CSP)**: Strict origins restricting scripts, styles, connections, and images exclusively to verified domains (Firebase, Google, GitHub, Cloudflare, Web3Forms).
4. **Auth Reverse Proxy**: `/__/auth/:path*` rewrites configured with zero-cache headers (`Cache-Control: no-store`, `CDN-Cache-Control: no-store`, `Cloudflare-CDN-Cache-Control: no-store`) to protect sensitive credentials from edge caching.
5. **Ownership & Role-Based Firestore Rules**: Strict authorization ensuring only verified authors or admin can mutate or remove entries.
6. **DevTools Security Watermark**: Console security signature asserting copyright and disallowing unauthorized scraping.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm or yarn

### Installation
```bash
git clone https://github.com/hernataramadhan79-bit/hrnt-portfolio.git
cd hrnt-portfolio
npm install
```

### Environment Configuration
Create `.env.local` with the following variables:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Web3Forms Contact Form
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_key

# Telemetry
GITHUB_TOKEN=your_github_personal_access_token
WAKATIME_API_KEY=your_wakatime_api_key
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 📄 License
Released under the [MIT License](LICENSE). Copyright &copy; 2023–2026 Hernata Ramadhan. All Rights Reserved.
