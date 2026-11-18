export interface ServiceTier {
  id: string;
  name: string;
  subtitle: string;
  xanaxRange: string;
  cashEstimate: string;
  turnaround: string;
  bestFor: string;
  deliverables: string[];
}

export interface PortfolioItem {
  id: string;
  name: string;
  category: "Userscript" | "Discord Bot" | "CLI & Data" | "Web App";
  stack: string;
  summary: string;
  highlights: string[];
  proofLabel: string;
}

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: "userscript",
    name: "Userscript & QoL Overlay",
    subtitle: "Tampermonkey / Violentmonkey / TornPDA",
    xanaxRange: "10 – 30 Xanax",
    cashEstimate: "~$8M – $25M",
    turnaround: "1 – 3 days",
    bestFor: "Traders, crime grinders, and players wanting clean in-page helpers.",
    deliverables: [
      "Zero-API or rate-limited Torn API v2 integration",
      "SPA-safe MutationObserver lifecycle (zero memory leaks)",
      "TornPDA & desktop browser compatibility",
      "Clean settings modal + source code & install link",
    ],
  },
  {
    id: "discord-bot",
    name: "Custom Discord Bot",
    subtitle: "Python / TypeScript · Slash Commands & Alerts",
    xanaxRange: "15 – 120 Xanax",
    cashEstimate: "~$12M – $100M",
    turnaround: "2 – 7 days",
    bestFor:
      "Players, traders & factions needing slash commands, alerts, or API trackers.",
    deliverables: [
      "Entry tier (15–35 Xanax): slash commands & webhook alerts (no DB)",
      "Advanced tier (50–120 Xanax): persistent DB, RW/Chain/OC 2.0/Market watchers",
      "Per-key sliding-window rate limiter (safe with TornPDA)",
      "Systemd / Docker setup guide + guided walkthrough on your own VPS or device",
    ],
  },
  {
    id: "standalone-tool",
    name: "Standalone Tool & Analyzer",
    subtitle: "CLI / Async Poller / Multi-Source Pipeline",
    xanaxRange: "60 – 150 Xanax",
    cashEstimate: "~$50M – $125M",
    turnaround: "4 – 10 days",
    bestFor: "Power traders, travel optimizers, and automated reporting pipelines.",
    deliverables: [
      "Multi-source data racing (Torn API v2, YATA, Weav3r, Flight Club)",
      "Fee-aware profit math, forecasting, or schedule optimization",
      "Discord / Telegram webhook notifications + CSV/JSON exports",
      "Automated unit test suite covering core calculations",
    ],
  },
  {
    id: "faction-webapp",
    name: "Full-Stack Torn Web App",
    subtitle: "Next.js · Auth · Database · Real-Time Sync",
    xanaxRange: "180 – 450+ Xanax",
    cashEstimate: "~$150M – $380M+",
    turnaround: "1 – 3 weeks",
    bestFor:
      "Trading portals (Flight Club-style), contract/service boards, community tools, or faction dashboards.",
    deliverables: [
      "Torn API auth / encrypted key vault & role-based user access",
      "Custom workflows: priceboards, contract/order trackers, or faction ops",
      "Firestore / PostgreSQL persistence with real-time multi-device sync",
      "Guided deployment to your own Vercel account + full source ownership",
    ],
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "torncore",
    name: "TornCore",
    category: "Userscript",
    stack: "TypeScript · Tampermonkey · Zero-API",
    summary:
      "In-browser safety and QoL suite featuring Crimes 2.0 Scamming/Burglary helpers, Bazaar Guard pricing validation, Vault quick-fill chips, and SPA observer cleanup.",
    highlights: [
      "100% Zero-API foreground DOM only",
      "132 / 132 unit tests passing",
      "Published on Torn Forums (Tools & Userscripts)",
    ],
    proofLabel: "132 tests passing",
  },
  {
    id: "tornflipper",
    name: "TornFlipper",
    category: "Discord Bot",
    stack: "Python · discord.py · Torn API v2",
    summary:
      "Faction Bazaar & Item Market flipper bot with full item catalog autocomplete, exact 5% market tax vs 0% bazaar math, mugger-trap warnings, and starter presets.",
    highlights: [
      "Per-key sliding-window rate limiter (<= 50 req/min)",
      "Dual-venue profit & Flight Club buyout matching",
      "8 / 8 unit tests passing",
    ],
    proofLabel: "Rate-limit safe",
  },
  {
    id: "tornquestbot",
    name: "TornQuestBot",
    category: "Discord Bot",
    stack: "Python · systemd · 24/7 Azure VM",
    summary:
      "Multi-user team quest and TFC Daily NFS market watcher with encrypted/isolated user key management and slash-command controls.",
    highlights: [
      "Multi-user /setkey, /startkey, /stopkey controls",
      "Hosted 24/7 on Linux VPS via systemd",
      "Shared key-pool pacing for multi-tool safety",
    ],
    proofLabel: "24/7 production",
  },
  {
    id: "torntravel",
    name: "TornTravel",
    category: "CLI & Data",
    stack: "Python asyncio · YATA · Weav3r · Flight Club",
    summary:
      "Restock predictor and 24-hour flight optimizer modeling burn-down depletion velocity, exact Torn API v2 restock anchors, and sleep-window scheduling.",
    highlights: [
      "Raced multi-source stock & pricing feeds",
      "Models all 11 destinations & aircraft perks",
      "22 / 22 pytest unit tests passing",
    ],
    proofLabel: "22 tests passing",
  },
  {
    id: "tornops",
    name: "TornOps",
    category: "Web App",
    stack: "Next.js 15 · Discord.js · Firestore / Prisma",
    summary:
      "Full-stack faction command center with KAL loadout intelligence, BSP Fair Fight stat estimator, OC 2.0 bipartite optimizer, armory loans, and banking ledger.",
    highlights: [
      "Salted HKDF-SHA256 encrypted API key vault",
      "23 Next.js routes + integrated Discord watchdog bot",
      "20 / 20 monorepo unit tests passing",
    ],
    proofLabel: "Fullstack suite",
  },
];

export const COMPLIANCE_RULES = [
  {
    title: "Strict Torn TOS & API Compliance",
    detail:
      "Official Torn API endpoints or active foreground user-viewed DOM only. Zero auto-buying, auto-clicking, background scraping, or captcha bypasses.",
  },
  {
    title: "Rate-Limit Coexistence",
    detail:
      "Every bot and poller ships with sliding-window rate limiting so your API key stays safe alongside TornPDA and browser userscripts.",
  },
  {
    title: "Self-Hosted & Full Ownership",
    detail:
      "50% Xanax deposit on scope lock, 50% on verified demo and source delivery. You host bots on your own VPS/device and web apps on your own Vercel account — guided setup included.",
  },
];
