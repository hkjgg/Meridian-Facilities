import Image from "next/image";

/**
 * Wrapper around next/image for the site's illustration set.
 *
 * Every asset is currently vector, so the optimizer has nothing to re-encode
 * and we serve the file directly. Everything else next/image gives us —
 * reserved layout box, lazy loading below the fold, priority hinting for the
 * LCP image — still applies. When real photography replaces an illustration,
 * drop the `unoptimized` prop and the optimizer takes over with no other
 * changes at the call site.
 */
export function Artwork({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  loading,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  /** Emits a preload link. Reserve it for an image that is genuinely the LCP. */
  priority?: boolean;
  /**
   * "eager" loads immediately without a preload link — the right setting for a
   * hero that is in view on desktop but sits below the fold on mobile, where
   * preloading it would compete with the text that actually is the LCP.
   */
  loading?: "eager" | "lazy";
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={loading}
      unoptimized={src.endsWith(".svg")}
      className={className}
    />
  );
}
