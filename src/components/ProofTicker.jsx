import { useProofTicker } from '../hooks/useProofTicker.js';

// Fixed proof-activity pill, bottom-left. Slides in/out on a timer.
export default function ProofTicker() {
  const { item, on } = useProofTicker();
  return (
    <div className={on ? 'proofpop on' : 'proofpop'} id="ticker">
      <div className="pp__map">
        <span className="pp__pin">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 7.5 12 7.5 12s7.5-6.75 7.5-12C19.5 5.36 16.14 2 12 2Z" />
            <circle cx="12" cy="9.4" fill="#fff" r="2.9" />
          </svg>
        </span>
      </div>
      <div className="pp__body">
        <div className="pp__l1">
          <b id="tkName">{item.nm}</b>
          <span className="pp__from">from</span>
          <b id="tkCity">{item.c}</b>
        </div>
        <div className="pp__l2" id="tkAct">{item.a}</div>
        <div className="pp__l3">
          <span id="tkTime">{item.t}</span>
          <span className="pp__badge">
            <svg viewBox="0 0 24 24">
              <path
                d="M12,1 L14.59,3.17 L17.95,2.75 L18.95,5.98 L22.01,7.43 L21.11,10.69 L22.89,13.57 L20.37,15.82 L20.31,19.2 L16.97,19.74 L15.1,22.55 L12,21.2 L8.9,22.55 L7.03,19.74 L3.69,19.2 L3.63,15.82 L1.11,13.57 L2.89,10.69 L1.99,7.43 L5.05,5.98 L6.05,2.75 L9.41,3.17 Z"
                fill="#3b5afe"
              />
              <path
                d="M8.4 12.4l2.3 2.3 4.4-4.9"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.1"
              />
            </svg>
          </span>
          <span className="pp__vp">Verified by Proof</span>
        </div>
      </div>
    </div>
  );
}
