// The guarantee seal. Rendered twice (faint watermark + foreground stamp);
// each copy needs unique gradient-path ids, supplied via `suffix`.
export default function PromiseSeal({ suffix, variant }) {
  const topId = `st${suffix}`;
  const botId = `sb${suffix}`;
  return (
    <svg aria-hidden="true" className={`seal ${variant}`} viewBox="0 0 220 220">
      <defs>
        <path d="M26,110 A84,84 0 0 1 194,110" id={topId} />
        <path d="M194,110 A84,84 0 0 1 26,110" id={botId} />
      </defs>
      <circle className="r1" cx="110" cy="110" r="105" />
      <circle className="r2" cx="110" cy="110" r="98" />
      <circle className="r2" cx="110" cy="110" r="64" />
      <text className="st">
        <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
          THE BUSINESS BRAIN PROMISE
        </textPath>
      </text>
      <text className="sb">
        <textPath href={`#${botId}`} startOffset="50%" textAnchor="middle">
          SEE IT ON YOUR OWN DATA
        </textPath>
      </text>
      <g className="sep">
        <circle cx="26" cy="110" r="2.4" />
        <circle cx="194" cy="110" r="2.4" />
      </g>
      <circle className="disc" cx="110" cy="88" r="19" />
      <path className="chk" d="M101.5 88.5 l5.5 5.5 11 -12" />
      <text className="sc" textAnchor="middle" x="110" y="124">
        NO SLIDES.
      </text>
      <text className="sc" textAnchor="middle" x="110" y="139">
        NO OBLIGATION.
      </text>
    </svg>
  );
}
