import NetCanvas from './NetCanvas.jsx';

// Fixed page backdrop. The two glow refs are owned by App so the hero
// parallax hook can move them in sync with the cursor.
export default function Background({ g1Ref, g2Ref }) {
  return (
    <div className="bg">
      <NetCanvas color="94,14,215" />
      <div className="bg__glow" id="g1" ref={g1Ref} />
      <div className="bg__glow2" id="g2" ref={g2Ref} />
    </div>
  );
}
