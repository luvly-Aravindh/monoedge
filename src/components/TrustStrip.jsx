import { useRef } from 'react';
import { trustItems } from '../data/content.js';
import { useCountUp } from '../hooks/useCountUp.js';

// Four trust metrics that count up the first time they scroll into view.
export default function TrustStrip() {
  const ref = useRef(null);
  useCountUp(ref);

  return (
    <section className="trust" ref={ref}>
      <div className="wrap trust__in">
        {trustItems.map((t, i) => (
          <div className="trust__i" key={i}>
            <b>{t.n}</b>
            {' '}
            {t.label}
          </div>
        ))}
      </div>
    </section>
  );
}
