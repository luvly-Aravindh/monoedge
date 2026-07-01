import { useEffect, useState } from 'react';
import { tickerItems } from '../data/content.js';

// Cycles the proof-ticker: first item after a 4.2s delay, each shown for 6s,
// a new one every 11s. Returns the current item and whether it is on screen.
export function useProofTicker() {
  const [index, setIndex] = useState(0);
  const [on, setOn] = useState(false);

  useEffect(() => {
    let hideTimer;
    let interval;

    const show = () => {
      setIndex((i) => (i + 1) % tickerItems.length);
      setOn(true);
      hideTimer = setTimeout(() => setOn(false), 6000);
    };

    const start = setTimeout(() => {
      show();
      interval = setInterval(show, 11000);
    }, 4200);

    return () => {
      clearTimeout(start);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, []);

  return { item: tickerItems[index], on };
}
