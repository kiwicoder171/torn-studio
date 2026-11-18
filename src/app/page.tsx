import {
  Bot,
  Check,
  Code2,
  Globe,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { CommissionForm } from "@/components/CommissionForm";
import {
  COMPLIANCE_RULES,
  PORTFOLIO_ITEMS,
  SERVICE_TIERS,
} from "@/data/studio";

const TIER_ICONS: Record<string, typeof Code2> = {
  userscript: Code2,
  "discord-bot": Bot,
  "standalone-tool": Terminal,
  "faction-webapp": Globe,
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2825]">
      {/* Header */}
      <header className="border-b border-[#E5DFD5] bg-[#FAF7F2]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="font-serif-display text-2xl font-semibold tracking-tight text-[#191716]">
              TornStudio
            </span>
            <span className="hidden rounded border border-[#E5DFD5] bg-[#F3EFEA] px-2 py-0.5 font-mono-code text-[11px] text-[#7D756D] sm:inline-block">
              Open for Commissions
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-[#7D756D]">
            <a href="#pricing" className="transition hover:text-[#191716]">
              Pricing
            </a>
            <a href="#portfolio" className="transition hover:text-[#191716]">
              Portfolio
            </a>
            <a
              href="#request"
              className="rounded-md bg-[#191716] px-3.5 py-1.5 text-xs font-medium text-[#FAF7F2] transition hover:bg-[#2C2825]"
            >
              Request Build
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="border-b border-[#E5DFD5] py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E5DFD5] bg-[#F3EFEA] px-3.5 py-1 text-xs font-medium text-[#2C2825]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C5A059]" />
              100% Torn TOS &amp; API Compliant · Priced in Xanax
            </div>
            <h1 className="font-serif-display text-4xl leading-[1.1] font-semibold tracking-tight text-[#191716] sm:text-6xl">
              Custom Torn Userscripts, Discord Bots &amp; Web Apps.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[#7D756D] sm:text-lg">
              Bespoke engineering for Torn City players, traders, service
              builders, and factions. Built with rate-limit-safe Torn API v2
              pipelines, clean browser DOM overlays, and automated test suites
              — paid strictly in in-game Xanax.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#request"
                className="rounded-lg bg-[#191716] px-5 py-3 text-sm font-medium text-[#FAF7F2] transition hover:bg-[#2C2825]"
              >
                Start a Commission
              </a>
              <a
                href="#pricing"
                className="rounded-lg border border-[#E5DFD5] bg-[#F3EFEA] px-5 py-3 text-sm font-medium text-[#191716] transition hover:border-[#C5A059]"
              >
                View Xanax Rates
              </a>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section id="pricing" className="border-b border-[#E5DFD5] py-16">
          <div className="mb-10 max-w-2xl">
            <p className="font-mono-code text-xs tracking-widest text-[#C5A059] uppercase">
              Commission Menu
            </p>
            <h2 className="font-serif-display mt-2 text-3xl font-semibold text-[#191716] sm:text-4xl">
              Transparent Xanax Pricing by Scope
            </h2>
            <p className="mt-2 text-sm text-[#7D756D]">
              Final quote depends on API complexity, database needs, and UI
              surface. 50% deposit on scope lock, 50% on verified delivery.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {SERVICE_TIERS.map((tier) => {
              const Icon = TIER_ICONS[tier.id] ?? Code2;
              return (
                <article
                  key={tier.id}
                  className="flex flex-col justify-between rounded-xl border border-[#E5DFD5] bg-[#F3EFEA]/60 p-6 transition hover:border-[#C5A059]/70"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5DFD5] bg-[#FAF7F2]">
                          <Icon className="h-5 w-5 text-[#C5A059]" />
                        </div>
                        <div>
                          <h3 className="font-serif-display text-2xl font-semibold text-[#191716]">
                            {tier.name}
                          </h3>
                          <p className="text-xs text-[#7D756D]">
                            {tier.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2 border-y border-[#E5DFD5] py-3">
                      <div>
                        <span className="font-mono-code text-lg font-semibold text-[#191716]">
                          {tier.xanaxRange}
                        </span>
                        <span className="ml-2 text-xs text-[#7D756D]">
                          ({tier.cashEstimate})
                        </span>
                      </div>
                      <span className="font-mono-code text-xs text-[#7D756D]">
                        ETA: {tier.turnaround}
                      </span>
                    </div>

                    <p className="mt-4 text-sm text-[#2C2825]">
                      {tier.bestFor}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {tier.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-[#7D756D]"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A059]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="border-b border-[#E5DFD5] py-16">
          <div className="mb-10 max-w-2xl">
            <p className="font-mono-code text-xs tracking-widest text-[#C5A059] uppercase">
              Shipped Proof of Work
            </p>
            <h2 className="font-serif-display mt-2 text-3xl font-semibold text-[#191716] sm:text-4xl">
              Production Torn Ecosystem Portfolio
            </h2>
            <p className="mt-2 text-sm text-[#7D756D]">
              Every tool below is built, tested, and actively maintained in this
              workspace.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_ITEMS.map((item) => (
              <article
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-[#E5DFD5] bg-white p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-code rounded bg-[#F3EFEA] px-2.5 py-0.5 text-[11px] font-medium text-[#2C2825]">
                      {item.category}
                    </span>
                    <span className="font-mono-code text-[11px] text-[#C5A059]">
                      {item.proofLabel}
                    </span>
                  </div>
                  <h3 className="font-serif-display mt-3 text-2xl font-semibold text-[#191716]">
                    {item.name}
                  </h3>
                  <p className="font-mono-code mt-1 text-xs text-[#7D756D]">
                    {item.stack}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#2C2825]">
                    {item.summary}
                  </p>
                </div>

                <ul className="mt-5 space-y-1.5 border-t border-[#E5DFD5] pt-4">
                  {item.highlights.map((hl) => (
                    <li
                      key={hl}
                      className="flex items-start gap-2 text-xs text-[#7D756D]"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C5A059]" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Compliance & Commission Form */}
        <section id="request" className="py-16">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-2">
              <div>
                <p className="font-mono-code text-xs tracking-widest text-[#C5A059] uppercase">
                  Guarantees &amp; Terms
                </p>
                <h2 className="font-serif-display mt-2 text-3xl font-semibold text-[#191716]">
                  Safe, Clean &amp; Rule-Compliant
                </h2>
              </div>

              <div className="space-y-4">
                {COMPLIANCE_RULES.map((rule) => (
                  <div
                    key={rule.title}
                    className="rounded-lg border border-[#E5DFD5] bg-[#F3EFEA]/70 p-4"
                  >
                    <h3 className="text-sm font-semibold text-[#191716]">
                      {rule.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#7D756D]">
                      {rule.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <CommissionForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E5DFD5] py-8 text-center text-xs text-[#7D756D]">
        TornStudio · Custom Torn City Engineering · In-Game Xanax Commissions
        Only
      </footer>
    </div>
  );
}
