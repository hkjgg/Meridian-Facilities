import { ImageResponse } from "next/og";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const service = getService(params.slug);
  return [
    {
      id: params.slug,
      size,
      contentType,
      alt: service ? `${service.name} — ${service.tagline}` : site.name,
    },
  ];
}

/** Per-service social card, so a shared service link never falls back to the generic one. */
export default async function ServiceOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

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
          <svg width="46" height="46" viewBox="0 0 32 32" fill="none">
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
          <div style={{ display: "flex", fontSize: 30, color: "#f7f4ef" }}>
            Meridian Facilities
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, color: "#e4a06e", letterSpacing: 4 }}>
            SERVICE
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 74,
              lineHeight: 1.05,
              color: "#f7f4ef",
              letterSpacing: -2.2,
              maxWidth: 940,
            }}
          >
            {service?.name ?? "Facility services"}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 30,
              color: "#c3ccd9",
              maxWidth: 900,
            }}
          >
            {service?.tagline ?? site.tagline}
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
