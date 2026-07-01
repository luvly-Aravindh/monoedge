import { faqs } from '../data/content.js';

// Uses native <details>/<summary>; the +/- toggle is pure CSS, so no JS.
export default function Faq() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="shead reveal">
          <span className="ey">But will it work for us?</span>
          <h2 className="dsp">The questions plant heads ask first.</h2>
        </div>
        <div className="faqs">
          {faqs.map((f, i) => (
            <details className="faq reveal" key={i}>
              <summary>
                {f.q}
                <span className="faq__x">+</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
