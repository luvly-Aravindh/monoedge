import { useEffect, useRef } from 'react';

// Animated particle network drawn onto a <canvas>. Each instance sizes itself
// to its parent and runs its own RAF loop. `color` is an "r,g,b" string.
export default function NetCanvas({ color = '94,14,215', className = 'netbg' }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const pa = cv.parentElement;
    let W = 0, H = 0, pts = [], raf, ro;

    const size = () => {
      W = cv.width = pa.offsetWidth || 1;
      H = cv.height = pa.offsetHeight || 1;
      const n = Math.max(10, Math.min(46, Math.round((W * H) / 19000)));
      pts = [];
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.34,
          vy: (Math.random() - 0.5) * 0.34,
        });
      }
    };

    size();
    if (window.ResizeObserver) {
      try { ro = new ResizeObserver(size); ro.observe(pa); } catch (e) { /* noop */ }
    }

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
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
          if (d2 < 13500) {
            const o = 0.16 * (1 - d2 / 13500);
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
    frame();

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
    };
  }, [color]);

  return <canvas ref={ref} className={className} data-color={color} />;
}
