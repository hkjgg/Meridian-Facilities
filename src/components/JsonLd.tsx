/**
 * Renders a structured-data block. The payload is built entirely from data we
 * control in `src/lib`, never from user input, so serialising it into a script
 * tag is safe — the `<` escape is belt-and-braces against a future data change.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
