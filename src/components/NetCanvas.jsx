import { useEffect, useRef } from 'react';

// Animated particle network. Pauses off-screen and respects reduced motion.
export default function NetCanvas({ color = '94,14,215', className = 'netbg' }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d', { alpha: true });
    const pa = cv.parentElement;
    let W = 0, H = 0, pts = [], raf, ro, io, running = false;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = pa.offsetWidth || 1;
      H = pa.offsetHeight || 1;
      cv.width = Math.floor(W * dpr);
      cv.height = Math.floor(H * dpr);
      cv.style.width = W + 'px';
      cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = W < 720;
      const density = isMobile ? 42000 : 22000;
      const cap = isMobile ? 18 : 36;
      const n = reduced ? 0 : Math.max(8, Math.min(cap, Math.round((W * H) / density)));
      pts = [];
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
        });
      }
      if (reduced || n === 0) {
        ctx.clearRect(0, 0, W, H);
      }
    };

    const frame = () => {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      const linkDist = W < 720 ? 9000 : 13500;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.5, 0, 6.283);
        ctx.fillStyle = `rgba(${color},.5)`;
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < linkDist) {
            const o = 0.16 * (1 - d2 / linkDist);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${color},${o})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced || pts.length === 0) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    };

    size();
    if (window.ResizeObserver) {
      try { ro = new ResizeObserver(size); ro.observe(pa); } catch (e) { /* noop */ }
    }

    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          const vis = entries.some((e) => e.isIntersecting);
          if (vis) start();
          else stop();
        },
        { rootMargin: '40px', threshold: 0.01 },
      );
      io.observe(pa);
    } else {
      start();
    }

    const onVis = () => {
      if (document.hidden) stop();
      else if (pa.getBoundingClientRect().bottom > 0 && pa.getBoundingClientRect().top < window.innerHeight) start();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      if (ro) ro.disconnect();
      if (io) io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [color]);

  return <canvas ref={ref} className={className} data-color={color} />;
}
