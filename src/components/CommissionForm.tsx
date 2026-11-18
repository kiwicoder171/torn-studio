"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { SERVICE_TIERS } from "@/data/studio";

export function CommissionForm() {
  const [tierId, setTierId] = useState(SERVICE_TIERS[1].id);
  const [tornName, setTornName] = useState("");
  const [tornId, setTornId] = useState("");
  const [discord, setDiscord] = useState("");
  const [hosting, setHosting] = useState("self-host");
  const [brief, setBrief] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const selectedTier =
    SERVICE_TIERS.find((t) => t.id === tierId) ?? SERVICE_TIERS[0];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await fetch("/api/commission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tornName,
          tornId,
          discord,
          tierId,
          hosting,
          brief,
          website,
        }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data.error ?? "Unable to submit request.",
        });
        return;
      }

      setStatus({
        type: "success",
        message:
          data.message ??
          "Commission request submitted. Expect a reply on Discord or Torn mail.",
      });
      setBrief("");
    } catch {
      setStatus({
        type: "error",
        message: "Network error while sending request. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-[#E5DFD5] bg-[#FAF7F2] p-6 sm:p-8"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-[#E5DFD5] pb-4">
        <div>
          <h3 className="font-serif-display text-2xl font-semibold text-[#191716]">
            Request a Custom Build
          </h3>
          <p className="mt-1 text-sm text-[#7D756D]">
            Quotes are finalized in Xanax after reviewing your exact workflow.
          </p>
        </div>
        <span className="font-mono-code rounded-md border border-[#E5DFD5] bg-[#F3EFEA] px-3 py-1 text-xs text-[#2C2825]">
          {selectedTier.xanaxRange} · {selectedTier.turnaround}
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="tier"
            className="mb-1.5 block text-xs font-medium tracking-wide text-[#7D756D] uppercase"
          >
            Scope Tier
          </label>
          <select
            id="tier"
            value={tierId}
            onChange={(e) => setTierId(e.target.value)}
            className="w-full rounded-lg border border-[#E5DFD5] bg-white px-3.5 py-2.5 text-sm text-[#191716] outline-none transition focus:border-[#C5A059]"
          >
            {SERVICE_TIERS.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {tier.name} ({tier.xanaxRange})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="hosting"
            className="mb-1.5 block text-xs font-medium tracking-wide text-[#7D756D] uppercase"
          >
            Hosting / Delivery
          </label>
          <select
            id="hosting"
            value={hosting}
            onChange={(e) => setHosting(e.target.value)}
            className="w-full rounded-lg border border-[#E5DFD5] bg-white px-3.5 py-2.5 text-sm text-[#191716] outline-none transition focus:border-[#C5A059]"
          >
            <option value="self-host">Source Code + Setup Guide (Self-Host)</option>
            <option value="managed-vps">24/7 Managed Hosting Setup (+Xanax)</option>
            <option value="userscript">Browser Userscript / TornPDA Install</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="tornName"
            className="mb-1.5 block text-xs font-medium tracking-wide text-[#7D756D] uppercase"
          >
            Torn Name
          </label>
          <input
            id="tornName"
            type="text"
            required
            value={tornName}
            onChange={(e) => setTornName(e.target.value)}
            placeholder="e.g. KiwiCoder"
            className="w-full rounded-lg border border-[#E5DFD5] bg-white px-3.5 py-2.5 text-sm text-[#191716] placeholder:text-[#7D756D]/60 outline-none transition focus:border-[#C5A059]"
          />
        </div>

        <div>
          <label
            htmlFor="tornId"
            className="mb-1.5 block text-xs font-medium tracking-wide text-[#7D756D] uppercase"
          >
            Torn ID (Optional)
          </label>
          <input
            id="tornId"
            type="text"
            inputMode="numeric"
            value={tornId}
            onChange={(e) => setTornId(e.target.value)}
            placeholder="e.g. 1234567"
            className="w-full rounded-lg border border-[#E5DFD5] bg-white px-3.5 py-2.5 text-sm text-[#191716] placeholder:text-[#7D756D]/60 outline-none transition focus:border-[#C5A059]"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="discord"
            className="mb-1.5 block text-xs font-medium tracking-wide text-[#7D756D] uppercase"
          >
            Discord Handle
          </label>
          <input
            id="discord"
            type="text"
            required
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
            placeholder="e.g. @username"
            className="w-full rounded-lg border border-[#E5DFD5] bg-white px-3.5 py-2.5 text-sm text-[#191716] placeholder:text-[#7D756D]/60 outline-none transition focus:border-[#C5A059]"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="brief"
            className="mb-1.5 block text-xs font-medium tracking-wide text-[#7D756D] uppercase"
          >
            Project Brief
          </label>
          <textarea
            id="brief"
            rows={4}
            required
            minLength={15}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Describe what you want automated, tracked, or displayed — include Torn pages, API endpoints, or Discord commands needed."
            className="w-full rounded-lg border border-[#E5DFD5] bg-white px-3.5 py-2.5 text-sm text-[#191716] placeholder:text-[#7D756D]/60 outline-none transition focus:border-[#C5A059]"
          />
        </div>
      </div>

      {status.type !== "idle" && (
        <div
          role="status"
          className={`mt-5 flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm ${
            status.type === "success"
              ? "border-[#C5A059]/40 bg-[#F3EFEA] text-[#191716]"
              : "border-red-300 bg-red-50 text-red-900"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A059]" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-[#7D756D]">
          TOS-compliant tools only · No auto-buying, auto-clicking, or RMT.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-lg bg-[#191716] px-5 py-2.5 text-sm font-medium text-[#FAF7F2] transition hover:bg-[#2C2825] active:scale-[0.99] disabled:opacity-60"
        >
          <Send className="h-4 w-4 text-[#C5A059]" />
          {submitting ? "Sending..." : "Submit Commission"}
        </button>
      </div>
    </form>
  );
}
