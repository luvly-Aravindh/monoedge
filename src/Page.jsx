import { useEffect } from 'react';

// Renders the original page markup verbatim and runs the original page behaviour.
// Tailwind is configured with preflight disabled, so nothing here is restyled.
export default function Page({ html, run }) {
  useEffect(() => {
    if (typeof run === 'function') {
      // run after the injected markup is committed to the DOM
      const id = requestAnimationFrame(() => run());
      return () => cancelAnimationFrame(id);
    }
  }, [run]);
  // `contents` (Tailwind utility) keeps this wrapper layout-transparent
  return <div className="contents" dangerouslySetInnerHTML={{ __html: html }} />;
}
