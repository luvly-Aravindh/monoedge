import { problemCards } from '../data/content.js';
import CtaButton from './CtaButton.jsx';

export default function ProblemPattern({ onOpen }) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="shead reveal">
          <span className="ey">The pattern is always the same</span>
          <h2 className="dsp">
            The signal was there. Nobody could read it <span className="hl-a">in time.</span>
          </h2>
          <p>
            The problem is rarely that the data is missing. It is that nobody can read all of it,
            across every sheet and system, fast enough to act before the damage is done.
          </p>
        </div>
        <div className="pgrid">
          {problemCards.map((c, i) => (
            <div className="pcard reveal" data-d={String(i)} key={c.n}>
              <div className="pcard__n">{c.n}</div>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </div>
          ))}
        </div>
        <div className="ctarow reveal">
          <CtaButton onOpen={onOpen} xl arrow>
            Find your blind spot
          </CtaButton>
          <p className="micro2">Watch it surface one in your own data. 30 minutes, no slides.</p>
        </div>
      </div>
    </section>
  );
}
