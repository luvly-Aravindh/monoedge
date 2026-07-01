import { useEffect } from 'react';

// Drives the hero's 3D tilt, the floating data chips and the two background
// glows from cursor position. Refs are passed in so the effect never queries
// the document. The chips are read from inside the scene element.
export function useHeroParallax({ heroRef, sceneRef, g1Ref, g2Ref }) {
  useEffect(() => {
    const hero = heroRef.current;
    const scene = sceneRef.current;
    if (!hero || !scene) return;

    const chips = [].slice.call(scene.querySelectorAll('.chip'));
    const g1 = g1Ref.current;
    const g2 = g2Ref.current;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const t0 = Date.now();
    let raf;

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    const loop = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      const t = (Date.now() - t0) / 1000;
      scene.style.transform = `rotateY(${cx * 11}deg) rotateX(${-cy * 9}deg)`;
      chips.forEach((ch, i) => {
        const d = parseFloat(ch.getAttribute('data-depth')) || 1;
        const fx = Math.sin(t * 0.8 + i * 1.7) * 5;
        const fy = Math.cos(t * 0.7 + i * 1.3) * 6;
        ch.style.transform = `translate3d(${cx * d * 46 + fx}px,${cy * d * 46 + fy}px,${d * 30}px)`;
      });
      if (g1) g1.style.transform = `translate(${cx * 36}px,${cy * 30}px)`;
      if (g2) g2.style.transform = `translate(${-cx * 46}px,${-cy * 38}px)`;
      raf = requestAnimationFrame(loop);
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, [heroRef, sceneRef, g1Ref, g2Ref]);
}
