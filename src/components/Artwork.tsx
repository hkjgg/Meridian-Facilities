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
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
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
      unoptimized={src.endsWith(".svg")}
      className={className}
    />
  );
}
