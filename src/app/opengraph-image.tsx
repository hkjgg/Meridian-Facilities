import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide social card.
 *
 * Rendered with system fonts rather than the brand faces: satori would need
 * the font binaries fetched at build time, and a network dependency in the
 * image pipeline is a poor trade for a typeface nobody compares side by side.
 * The palette and the meridian mark carry the brand.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#101e33",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="52" height="52" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="13" stroke="#f7f4ef" strokeWidth="1.9" />
            <ellipse
              cx="16"
              cy="16"
              rx="5.6"
              ry="13"
              stroke="#f7f4ef"
              strokeWidth="1.9"
              opacity="0.55"
            />
            <path d="M3 16h26" stroke="#e4a06e" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 34, color: "#f7f4ef", letterSpacing: -0.5 }}>
            Meridian Facilities
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              lineHeight: 1.05,
              color: "#f7f4ef",
              letterSpacing: -2.5,
              maxWidth: 900,
            }}
          >
            The building is ready before you are.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              color: "#c3ccd9",
              maxWidth: 860,
            }}
          >
            Commercial cleaning and facility maintenance for offices and retail
            across greater Portland.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", width: 64, height: 3, backgroundColor: "#e4a06e" }} />
          <div style={{ display: "flex", fontSize: 24, color: "#e4a06e" }}>
            {site.phoneDisplay} · meridianfacilities.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
