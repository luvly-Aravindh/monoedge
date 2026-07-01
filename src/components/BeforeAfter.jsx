import { beforeItems, afterItems } from '../data/content.js';
import CtaButton from './CtaButton.jsx';

export default function BeforeAfter({ onOpen }) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="shead reveal">
          <span className="ey">Before and after Business Brain</span>
          <h2 className="dsp">
            From finding out <span className="hl-a">too late</span>, to{' '}
            <span className="hl-t">knowing first.</span>
          </h2>
        </div>
        <div className="ba">
          <div className="bacol before reveal">
            <h3>Running blind</h3>
            {beforeItems.map((t, i) => (
              <div className="bali" key={i}>
                <span className="m">×</span>
                {t}
              </div>
            ))}
          </div>
          <div className="bacol after reveal" data-d="1">
            <h3>Seeing the unseen</h3>
            {afterItems.map((t, i) => (
              <div className="bali" key={i}>
                <span className="m">✓</span>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className="ctarow reveal">
          <CtaButton onOpen={onOpen} xl arrow>
            Get on the right side
          </CtaButton>
          <p className="micro2">Move from finding out late to knowing first.</p>
        </div>
      </div>
    </section>
  );
}
