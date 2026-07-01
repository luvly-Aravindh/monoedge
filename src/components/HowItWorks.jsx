import { steps } from '../data/content.js';

export default function HowItWorks() {
  return (
    <section className="sec lav">
      <div className="wrap">
        <div className="shead reveal">
          <span className="ey">How it works</span>
          <h2 className="dsp">Upload. Discover. Alert. Act.</h2>
          <p>
            No new system to run. Business Brain sits on top of the spreadsheets and exports your
            team already keeps.
          </p>
        </div>
        <div className="steps">
          {steps.map((s) => (
            <div className="step reveal" data-d={s.d} key={s.n}>
              <div className="step__n">{s.n}</div>
              <div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
