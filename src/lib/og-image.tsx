import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

export const ogSize = { width: 1200, height: 630 };

/** Branded social-share card, rendered at build time for each page. */
export function renderOgImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  const host = new URL(brand.url).host;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          backgroundColor: "#08090C",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(197,240,74,0.20), transparent 45%), radial-gradient(circle at 100% 100%, rgba(95,227,236,0.14), transparent 42%), linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 100% 100%, 64px 64px, 64px 64px",
          color: "#EEF0F4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="52" height="52" viewBox="0 0 32 32" fill="none">
            <path d="M8 24V8l16 16V8" stroke="#EEF0F4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="8" cy="24" r="3" fill="#EEF0F4" />
            <circle cx="8" cy="8" r="3" fill="#EEF0F4" />
            <circle cx="24" cy="24" r="3" fill="#EEF0F4" />
            <circle cx="24" cy="8" r="3.6" fill="#C5F04A" />
          </svg>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 700, letterSpacing: -1 }}>
            {brand.name.split(/(\.)/).map((part, index) => (
              <span key={index} style={{ color: part === "." ? "#C5F04A" : "#EEF0F4" }}>
                {part}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 5, color: "#C5F04A", textTransform: "uppercase" }}>
            {eyebrow}
          </div>
          <div style={{ display: "flex", marginTop: 22, maxWidth: 1000, fontSize: 74, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 26, maxWidth: 940, fontSize: 30, lineHeight: 1.4, color: "#A4AAB8" }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#7A8194", letterSpacing: 3 }}>
          <div style={{ display: "flex" }}>{brand.lifecycle.join("  →  ").toUpperCase()}</div>
          <div style={{ display: "flex" }}>{host}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
