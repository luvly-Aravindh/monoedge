import { useStickyBar } from '../hooks/useStickyBar.js';

// Bottom sticky scarcity bar. Appears after scrolling, dismissible, with the
// end-of-day countdown writing into refs from the hook.
export default function StickyBar({ onOpen }) {
  const { visible, dismiss, hRef, mRef, sRef } = useStickyBar();
  return (
    <div className={visible ? 'sbar on' : 'sbar'} id="sbar">
      <button aria-label="Dismiss" className="sbar__x" id="sbarX" onClick={dismiss}>
        ×
      </button>
      <div className="sbar__in">
        <div className="sbar__l">
          <div className="sbar__t">
            Only <span className="pop">6</span> demo slots open this month
          </div>
          <div className="sbar__s">
            We onboard a limited number of plants at a time. When they are gone, they are gone.
          </div>
        </div>
        <div className="sbar__r">
          <div className="timer">
            <span className="lab">Today closes in</span>
            <span className="seg" id="tmH" ref={hRef}>00</span>
            <span className="cl">:</span>
            <span className="seg" id="tmM" ref={mRef}>00</span>
            <span className="cl">:</span>
            <span className="seg" id="tmS" ref={sRef}>00</span>
          </div>
          <span className="cta-wrap">
            <button className="btn" onClick={onOpen}>Book a demo</button>
          </span>
        </div>
      </div>
    </div>
  );
}
