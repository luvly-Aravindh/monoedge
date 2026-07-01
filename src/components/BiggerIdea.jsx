import { kgNodes, kgTracers, kgPoints } from '../data/content.js';

const dimLines = [
  { x1: 80, x2: 155, y1: 190, y2: 320 },
  { x1: 305, x2: 380, y1: 60, y2: 190 },
  { x1: 155, x2: 305, y1: 60, y2: 60 },
  { x1: 155, x2: 305, y1: 320, y2: 320 },
];

const brightLines = [
  { x1: 230, x2: 380, y1: 190, y2: 190 },
  { x1: 230, x2: 305, y1: 190, y2: 60 },
  { x1: 230, x2: 155, y1: 190, y2: 60 },
  { x1: 230, x2: 80, y1: 190, y2: 190 },
  { x1: 230, x2: 155, y1: 190, y2: 320 },
  { x1: 230, x2: 305, y1: 190, y2: 320 },
];

function PointIcon({ id }) {
  switch (id) {
    case 'db':
      return (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        </svg>
      );
    case 'graph':
      return (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="6" cy="12" r="2.4" />
          <circle cx="18" cy="6" r="2.4" />
          <circle cx="18" cy="18" r="2.4" />
          <path d="M8.2 11l7.4-3.6M8.2 13l7.4 3.6" />
        </svg>
      );
    case 'brain':
      return (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 4a4 4 0 0 0-4 4 3 3 0 0 0-1 5.8V16a3 3 0 0 0 5 2 3 3 0 0 0 5-2v-2.2A3 3 0 0 0 16 8a4 4 0 0 0-4-4Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function BiggerIdea() {
  return (
    <section className="sec kg">
      <div className="wrap">
        <div className="shead reveal">
          <span className="ey kgey">The bigger idea</span>
          <h2 className="dsp">
            It is not a dashboard. It is a <span className="pop">second brain</span> for your plant.
          </h2>
          <p>
            Business Brain reads everything you keep and connects it into one living picture: every
            supplier, machine, batch, cost and person, and how they all affect each other.
          </p>
        </div>
        <div className="kggrid">
          <div className="kgviz reveal">
            <div className="kgnet">
              <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 460 380">
                <defs>
                  <radialGradient cx="50%" cy="50%" id="kgGlow" r="50%">
                    <stop offset="0%" stopColor="rgba(94,14,215,.55)" />
                    <stop offset="100%" stopColor="rgba(94,14,215,0)" />
                  </radialGradient>
                </defs>
                <circle cx="230" cy="190" fill="url(#kgGlow)" r="96" />
                {dimLines.map((l, i) => (
                  <line
                    key={`d${i}`}
                    stroke="rgba(150,120,255,.15)"
                    strokeWidth="1.4"
                    vectorEffect="non-scaling-stroke"
                    x1={l.x1}
                    x2={l.x2}
                    y1={l.y1}
                    y2={l.y2}
                  />
                ))}
                {brightLines.map((l, i) => (
                  <line
                    key={`b${i}`}
                    stroke="rgba(150,120,255,.32)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    x1={l.x1}
                    x2={l.x2}
                    y1={l.y1}
                    y2={l.y2}
                  />
                ))}
                {kgTracers.map((t, i) => (
                  <g key={`t${i}`}>
                    <circle fill="#12cdbf" opacity=".22" r="6">
                      <animateMotion begin={t.begin} dur="2.6s" path={t.path} repeatCount="indefinite" />
                    </circle>
                    <circle fill="#12cdbf" r="3.2">
                      <animateMotion begin={t.begin} dur="2.6s" path={t.path} repeatCount="indefinite" />
                    </circle>
                  </g>
                ))}
              </svg>
              <div className="kgnode kgbrain" style={{ left: '50%', top: '50%' }}>
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2Z" />
                </svg>
                <span>Business Brain</span>
              </div>
              {kgNodes.map((n) => (
                <div className="kgnode" style={{ left: n.left, top: n.top }} key={n.label}>
                  <span className="dot" style={{ background: n.color }} />
                  {n.label}
                </div>
              ))}
            </div>
          </div>
          <div className="kgpoints reveal" data-d="1">
            {kgPoints.map((p) => (
              <div className="kgp" key={p.h}>
                <div className="kgp__ic">
                  <PointIcon id={p.icon} />
                </div>
                <div>
                  <h3>{p.h}</h3>
                  <p>{p.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
