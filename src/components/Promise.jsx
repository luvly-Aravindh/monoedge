import PromiseSeal from './PromiseSeal.jsx';

export default function Promise({ onOpen }) {
  return (
    <section className="sec lav">
      <div className="wrap">
        <div className="risk reveal">
          <div className="risk__wm">
            <PromiseSeal suffix="wm" variant="seal--wm" />
          </div>
          <PromiseSeal suffix="st" variant="seal--stamp" />
          <div className="risk__in">
            <span className="ey">The offer</span>
            <h2 className="dsp">
              Start free. Pay when it has <span className="hl-t">already proven itself.</span>
            </h2>
            <p>
              See a real insight from your own plant data first. You only decide once Business Brain
              has shown you something in your own numbers you could not see before.
            </p>
            <span className="cta-wrap">
              <button className="btn btn-xl" onClick={onOpen}>
                Book a demo
                <svg fill="none" viewBox="0 0 24 24">
                  <path
                    d="M7 7h10v10M7 17 17 7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.4"
                  />
                </svg>
              </button>
            </span>
            <p className="micro2">A 30 minute demo on your own data. No slides, no obligation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
