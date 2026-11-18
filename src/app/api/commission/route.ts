import { NextResponse } from "next/server";
import { SERVICE_TIERS } from "@/data/studio";

interface CommissionPayload {
  tornName?: string;
  tornId?: string;
  discord?: string;
  tierId?: string;
  hosting?: string;
  brief?: string;
  website?: string; // honeypot
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CommissionPayload;

    // Silent honeypot check
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true, mode: "accepted" });
    }

    const tornName = (body.tornName ?? "").trim();
    const tornId = (body.tornId ?? "").trim();
    const discord = (body.discord ?? "").trim();
    const tierId = (body.tierId ?? "").trim();
    const hosting = (body.hosting ?? "self-host").trim();
    const brief = (body.brief ?? "").trim();

    if (!tornName || !discord || !tierId || brief.length < 15) {
      return NextResponse.json(
        {
          error:
            "Please provide your Torn name, Discord handle, scope tier, and at least 15 characters describing your request.",
        },
        { status: 400 }
      );
    }

    if (tornId && !/^\d{1,10}$/.test(tornId)) {
      return NextResponse.json(
        { error: "Torn ID must contain digits only." },
        { status: 400 }
      );
    }

    const tier = SERVICE_TIERS.find((t) => t.id === tierId);
    if (!tier) {
      return NextResponse.json(
        { error: "Invalid scope tier selected." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL?.trim();
    if (!webhookUrl) {
      return NextResponse.json({
        ok: true,
        mode: "preview",
        message:
          "Request validated! Configure DISCORD_WEBHOOK_URL in .env.local to forward commissions directly to Discord.",
      });
    }

    const embed = {
      title: `New Torn Commission Request — ${tier.name}`,
      color: 0xc5a059,
      fields: [
        {
          name: "Torn Player",
          value: tornId ? `${tornName} [${tornId}]` : tornName,
          inline: true,
        },
        {
          name: "Discord",
          value: discord,
          inline: true,
        },
        {
          name: "Estimated Scope",
          value: `${tier.xanaxRange} (${tier.turnaround})`,
          inline: true,
        },
        {
          name: "Hosting Preference",
          value: hosting,
          inline: true,
        },
        {
          name: "Project Brief",
          value: brief.slice(0, 1000),
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
    };

    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!discordRes.ok) {
      return NextResponse.json(
        { error: "Failed to deliver request to Discord webhook." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      mode: "delivered",
      message: "Commission request sent. Expect a reply on Discord or Torn mail.",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
