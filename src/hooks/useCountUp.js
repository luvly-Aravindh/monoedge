import { useEffect } from 'react';

// Counts the trust-strip numbers up from zero the first time the strip is
// visible. Preserves any non-numeric suffix ("90+", "1 min") just like the
// original. Operates on the section ref passed in.
export function useCountUp(sectionRef) {
  useEffect(() => {
    const ts = sectionRef.current;
    if (!ts) return;
    let done = false;

    const animate = () => {
      if (done) return;
      done = true;
      ts.querySelectorAll('.trust__i b').forEach((b) => {
        const raw = b.textContent.trim();
        const end = parseInt(raw, 10);
        if (isNaN(end)) return;
        const suf = raw.slice(String(end).length);
        let t0 = null;
        const step = (t) => {
          if (!t0) t0 = t;
          const p = Math.min((t - t0) / 1100, 1);
          b.textContent = Math.round((1 - Math.pow(1 - p, 3)) * end) + suf;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) animate(); }),
      { threshold: 0.4 }
    );
    io.observe(ts);
    return () => io.disconnect();
  }, [sectionRef]);
}
