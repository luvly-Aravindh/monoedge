import NetCanvas from './NetCanvas.jsx';

// Full-width call-to-action band. Used twice on the page with different copy,
// so title/body/micro are all props. `micro` is a node to allow the inline
// <span class="pop"> highlight in each variant.
export default function CtaBand({ title, body, micro, onOpen }) {
  return (
    <section className="ctaband">
      <NetCanvas color="160,130,255" />
      <div className="wrap ctaband__in reveal">
        <h2 className="dsp">{title}</h2>
        <p>{body}</p>
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
        <p className="bandmicro">{micro}</p>
      </div>
    </section>
  );
}
