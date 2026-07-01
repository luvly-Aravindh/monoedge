// Hero. heroRef/sceneRef are owned by App and shared with the parallax hook.
// The H1 greets the visitor by name when the URL carried one.
export default function Hero({ heroRef, sceneRef, prefill, onOpen }) {
  return (
    <main className="hero" id="hero" ref={heroRef}>
      <div className="wrap herogrid">
        <div className="hero-copy reveal">
          <div className="ey">See the Unseen</div>
          <h1 className="dsp" id="h1">
            {prefill.first ? (
              <>
                <span className="hgreet">{prefill.first}, </span>money is{' '}
                <span className="hl-a">leaving</span> your plant. Nobody is{' '}
                <span className="c">watching the door.</span>
              </>
            ) : (
              <>
                Money is <span className="hl-a">leaving</span> your plant. Nobody is{' '}
                <span className="c">watching the door.</span>
              </>
            )}
          </h1>
          <p className="sub">
            Business Brain reads the plant data you already keep, and finds the leak, the bad batch
            and the failing machine before it turns into a loss you cannot explain.
          </p>
          <p className="punch">
            <b>Not another dashboard to check.</b> An analyst that reads every number you have, and
            tells you first.
          </p>
          <div className="cta-row">
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
          </div>
          <p className="micro">
            <span className="livedot" />
            Only <span className="pop" /> We take a limited number of slots at a time.
          </p>
        </div>

        <div className="heroviz reveal" data-d="1">
          <div className="scene" id="scene" ref={sceneRef}>
            <span className="chip c1" data-depth="1.5">
              <span className="d" />
              Power +23%
            </span>
            <span className="chip c2 t" data-depth="2.1">
              <span className="d" />
              Insight in 48s
            </span>
            <span className="chip c3" data-depth="1.2">
              <span className="d" />
              5 coils unaccounted
            </span>

            <div className="monitor">
              <div className="mon__top">
                <b>Business Brain · Monitor</b>
                <span className="live">
                  <span className="livedot" />
                  Live
                </span>
              </div>
              <div className="mon__chart">
                <svg preserveAspectRatio="none" viewBox="0 0 420 74">
                  <path
                    className="wave"
                    d="M0,40 L60,40 70,38 82,42 96,16 110,60 124,40 180,40 196,40 208,30 222,52 236,40 300,40 332,40 348,22 362,58 376,40 420,40"
                  />
                  <circle className="wdot" r="4">
                    <animateMotion
                      dur="3.4s"
                      keyPoints="0;1"
                      keyTimes="0;1"
                      path="M0,40 L60,40 70,38 82,42 96,16 110,60 124,40 180,40 196,40 208,30 222,52 236,40 300,40 332,40 348,22 362,58 376,40 420,40"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </div>
              <div className="mon__alerts">
                <div className="mrow r">
                  <div className="mi">📦</div>
                  <div>
                    <h4>Inventory gap, coil store</h4>
                    <p>23 coils received, 18 issued. 5 unaccounted for.</p>
                  </div>
                </div>
                <div className="mrow t">
                  <div className="mi">⚡</div>
                  <div>
                    <h4>Repeat furnace breakdown</h4>
                    <p>Same root cause has been flagged 3 times this quarter.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
