import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${site.name} — free business cost audits, commission disclosed`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #12333d 0%, #0b1f26 62%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              <path d="M11 29 L20 11 L29 29" fill="none" stroke="#0b1f26" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.4 23.4 H24.6" fill="none" stroke="#12a594" strokeWidth="3.2" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#ffffff", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>ABCA</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, letterSpacing: 2 }}>
              BUSINESS COST AUDITS
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#12a594", fontSize: 20, letterSpacing: 3, fontWeight: 600 }}>
            THE BUSINESS COST AUDIT
          </span>
          <span
            style={{
              color: "#ffffff",
              fontSize: 66,
              fontWeight: 700,
              letterSpacing: -2.5,
              lineHeight: 1.05,
              marginTop: 20,
              maxWidth: 940,
            }}
          >
            Most businesses overpay on five bills at once.
          </span>
        </div>

        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Free written report in 7 days", "Commission disclosed in £", site.phone.display].map((t) => (
            <span key={t} style={{ color: "rgba(255,255,255,0.62)", fontSize: 22 }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
