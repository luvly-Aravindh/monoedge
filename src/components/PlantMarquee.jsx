import { marqueeFrames } from '../data/content.js';

// The track is the 7 frames printed twice so the CSS marquee loops with no visible seam.
function Frame({ src, cap }) {
  return (
    <div className="pframe">
      <img alt="" decoding="async" loading="lazy" src={src} />
      <div className="pframe__cap">
        <span className="dot" />
        {cap}
      </div>
    </div>
  );
}

export default function PlantMarquee() {
  const loop = [...marqueeFrames, ...marqueeFrames];
  return (
    <section className="plantstrip">
      <div className="wrap">
        <div className="shead reveal">
          <span className="ey">Real plants, real signals</span>
          <h2 className="dsp">
            The floor you run, <span className="hl-t">read like never before.</span>
          </h2>
          <p>
            Textile lines, tile kilns, rolling mills. The messy, real plants Business Brain was
            built to read.
          </p>
        </div>
      </div>
      <div className="marquee">
        <div className="marquee__track">
          {loop.map((f, i) => (
            <Frame key={i} src={f.src} cap={f.cap} />
          ))}
        </div>
      </div>
    </section>
  );
}
