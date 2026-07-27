import { reviews } from '../data/content.js';
import NetCanvas from './NetCanvas.jsx';
import CtaButton from './CtaButton.jsx';

import rev1 from '../../public/img/rev1.webp';
import rev2 from '../../public/img/rev2.webp';
import rev4 from '../../public/img/rev4.webp';

const avatarMap = { rev1, rev2, rev4 };

export default function ProofReviews({ onOpen }) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="proof reveal">
          <NetCanvas color="18,205,191" />
          <div className="q">
            A power anomaly Business Brain flagged early saved one steel plant from a{' '}
            <span className="c">transformer failure</span> that would have stopped the line for days.
          </div>
          <div className="who">
            <b>A steel manufacturing company</b> · first customer, 7 departments, 50+ sheets
          </div>
        </div>
        <div className="reviews">
          {reviews.map((r, i) => (
            <div className="rev reveal" data-d={r.d} key={i}>
              <div className="stars">★★★★★</div>
              <p>{r.text}</p>
              <div className="rev__by">
                <img
                  alt={r.alt}
                  className="rev__av rev__av--img"
                  src={avatarMap[r.avatar]}
                  width={44}
                  height={44}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <div className="rev__n">{r.name}</div>
                  <div className="rev__p">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="ctarow reveal">
          <CtaButton onOpen={onOpen} xl arrow>
            See it on your numbers
          </CtaButton>
          <p className="micro2">
            See what it finds in your own data. Only <span className="pop">6</span> slots this month.
          </p>
        </div>
      </div>
    </section>
  );
}
