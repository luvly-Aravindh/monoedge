import { capabilities } from '../data/content.js';
import CtaButton from './CtaButton.jsx';

export default function Capabilities({ onOpen }) {
  return (
    <section className="sec lav">
      <div className="wrap">
        <div className="shead reveal">
          <span className="ey">What it does</span>
          <h2 className="dsp">An analyst that never sleeps, reading every number you have.</h2>
        </div>
        <div className="capgrid">
          {capabilities.map((c, i) => (
            <div className="cap reveal" data-d={c.d} key={i}>
              <div className="cap__dot" />
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </div>
          ))}
        </div>
        <div className="ctarow reveal">
          <CtaButton onOpen={onOpen} xl arrow>
            Put it to work
          </CtaButton>
          <p className="micro2">Start free. Pay only when it has already proven itself.</p>
        </div>
      </div>
    </section>
  );
}
