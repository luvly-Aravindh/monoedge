import { useEffect, useRef, useState } from 'react';

const p2 = (n) => (n < 10 ? '0' : '') + n;

// Shows the sticky scarcity bar after 720px of scroll, lets the visitor
// dismiss it, and runs the "today closes in HH:MM:SS" countdown. The clock
// writes straight to refs so the bar does not re-render every second.
export function useStickyBar() {
  const [visible, setVisible] = useState(false);
  const dismissedRef = useRef(false);
  const hRef = useRef(null);
  const mRef = useRef(null);
  const sRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!dismissedRef.current && (window.pageYOffset || document.documentElement.scrollTop) > 720) {
        setVisible(true);
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();

    const tick = () => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const sec = Math.max(0, Math.floor((end - now) / 1000));
      if (hRef.current) hRef.current.textContent = p2(Math.floor(sec / 3600));
      if (mRef.current) mRef.current.textContent = p2(Math.floor((sec % 3600) / 60));
      if (sRef.current) sRef.current.textContent = p2(sec % 60);
    };
    tick();
    const id = setInterval(tick, 1000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearInterval(id);
    };
  }, []);

  const dismiss = () => {
    dismissedRef.current = true;
    setVisible(false);
  };

  return { visible, dismiss, hRef, mRef, sRef };
}
