# Hernata Ramadhan (HRNT) — Portfolio

<div align="center">
  <h2>High-Performance Web Architecture & Personal Engineering Portfolio</h2>
  <p>
    <a href="https://hernata.web.id"><strong>Explore Live Website »</strong></a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge" alt="License" />
  </p>
</div>

---

## ⚡ Overview

Official personal portfolio repository of **Hernata Ramadhan (HRNT)**, Full-Stack Software Engineer. Engineered with a relentless focus on craftsmanship, sub-second telemetry sync, fluid 0-latency spring motion physics, and modern dark-mode aesthetic design tokens.

---

## ✨ Core Features & Architecture

- **Fluid 0-Latency Motion & Micro-Interactions**: Optimized spring physics (`Framer Motion` + `Lenis` smooth scroll) tuned for 120Hz/144Hz high-refresh displays.
- **Self-Contained Vector Iconography**: Zero external CDN dependencies; all 14 tech stack icons are localized vector SVGs in `/public/icons/`.
- **Live Performance & Telemetry Sync**: Real-time integration with **GitHub API** (commit history, contributions heatmap, repository metrics) and **WakaTime API** with in-flight deduplication and in-memory rate limiting.
- **Defense-in-Depth Backend Security**: Multi-layer XSS input sanitizer, strict CSP headers, and rate-limiting metrics on API routes.
- **Interactive DevTools Console Signature**: Custom CLI-inspired splash screen and copyright watermark in browser DevTools console.
- **WCAG AA/AAA High-Contrast Design**: Carefully curated color tokens eliminating low-contrast text across all responsive breakpoints.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Engine** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Core Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Tokens |
| **Animation Physics** | [Framer Motion](https://www.framer.com/motion/) & [Lenis](https://lenis.darkroom.engineering/) |
| **Icons & Assets** | [Lucide React](https://lucide.dev/) & [Devicon](https://devicon.dev/) SVGs |
| **Testing Suite** | [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/) |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v20.x or newer recommended)
- npm or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hernataramadhan79-bit/hrnt-portfolio.git
   cd hrnt-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   GITHUB_TOKEN=your_github_personal_access_token
   WAKATIME_API_KEY=your_wakatime_api_key
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Open Browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🧪 Testing & Validation

```bash
# Run unit tests
npm test

# Run TypeScript type check
npm run lint

# Build production bundle
npm run build
```

---

## 🛡️ Intellectual Property & Copyright Notice

**Copyright &copy; 2023–2026 Hernata Ramadhan (HRNT). All Rights Reserved.**

- **Proprietary UI/UX Design**: All visual layouts, design systems, animation choreography, color palettes, custom illustrations, and photographs are the intellectual property of Hernata Ramadhan. Direct cloning, scraping, or commercial reproduction is strictly prohibited.
- **Codebase Reference**: The source code is available for educational, learning, and reference purposes. Any reproduction requires proper attribution and does not grant rights to reuse the distinctive visual identity or brand assets.
- **Third-Party Trademarks**: All trademarks, product names, and company logos (*React, Next.js, TypeScript, Tailwind CSS, Node.js, Figma, PostgreSQL, Docker, Git, GraphQL, Vue.js, Jest, Vite*) remain the property of their respective owners.

For full legal details, refer to the [LICENSE](LICENSE) file.

---

## 📬 Contact & Connect

- **Website**: [hernata.web.id](https://hernata.web.id)
- **LinkedIn**: [Hernata Ramadhan](https://www.linkedin.com/in/hernata-ramadhan-176b68338)
- **GitHub**: [@hernataramadhan79-bit](https://github.com/hernataramadhan79-bit)
- **Email**: [hernataramadhan79@gmail.com](mailto:hernataramadhan79@gmail.com)