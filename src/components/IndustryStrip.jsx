import { industries, industryLabels } from '../data/content.js';

// Unique line icon per industry. Kept here rather than in data because each
// is a distinct SVG.
function IndustryIcon({ id }) {
  switch (id) {
    case 'textile':
      return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" viewBox="0 0 24 24">
          <rect height="3" rx="1" width="14" x="5" y="3" />
          <rect height="3" rx="1" width="14" x="5" y="18" />
          <path d="M8 6v12M16 6v12M9 10h6M9 13.5h6" />
        </svg>
      );
    case 'tiles':
      return (
        <svg fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
          <rect height="8" rx="1.4" width="8" x="3" y="3" />
          <rect height="8" rx="1.4" width="8" x="13" y="3" />
          <rect height="8" rx="1.4" width="8" x="3" y="13" />
          <rect height="8" rx="1.4" width="8" x="13" y="13" />
        </svg>
      );
    case 'steel':
      return (
        <svg fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5.2" />
          <circle cx="12" cy="12" r="1.7" />
        </svg>
      );
    case 'auto':
      return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3.4" />
          <path d="M12 2.5v3.2M12 18.3v3.2M21.5 12h-3.2M5.7 12H2.5M18.7 5.3l-2.3 2.3M7.6 16.4l-2.3 2.3M18.7 18.7l-2.3-2.3M7.6 7.6 5.3 5.3" />
        </svg>
      );
    case 'pharma':
      return (
        <svg fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
          <path d="M9 3h6M10 3v6.2l-4.7 8.4A2 2 0 0 0 7 20.6h10a2 2 0 0 0 1.7-3L14 9.2V3" />
          <path d="M7.7 15.4h8.6" />
        </svg>
      );
    case 'food':
      return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M12 21V8.5" />
          <path d="M12 8.5c0-2.6 2.3-4.5 2.3-4.5s0 2.6-2.3 4.5zM12 8.5c0-2.6-2.3-4.5-2.3-4.5s0 2.6 2.3 4.5z" />
          <path d="M12 13.5c0-2.2 2.4-3.6 2.4-3.6M12 13.5c0-2.2-2.4-3.6-2.4-3.6M12 18c0-2.2 2.4-3.6 2.4-3.6M12 18c0-2.2-2.4-3.6-2.4-3.6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function IndustryStrip() {
  return (
    <section className="indstrip">
      <div className="wrap">
        <div className="indstrip__h reveal">
          <span className="ey">Built for the plants that run India</span>
          <h3 className="dsp">Textile in Madurai. Tiles in Morbi. Steel in Jalna.</h3>
          <p>
            If your plant runs on Tally, spreadsheets, registers and a handful of key people,
            Business Brain was built for you.
          </p>
        </div>
        <div className="indrow reveal" data-d="1">
          {industries.map((id) => (
            <div className="ind" key={id}>
              <span className="ind__ic">
                <IndustryIcon id={id} />
              </span>
              {industryLabels[id]}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
