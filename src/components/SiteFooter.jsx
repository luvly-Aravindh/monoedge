// Page footer.
const logoSrc = `${import.meta.env.BASE_URL}img/logo-white.webp`;

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__brand">
          <img
            className="foot__logoimg"
            src={logoSrc}
            alt="MonoEdge"
            width={120}
            height={28}
            decoding="async"
            loading="lazy"
          />
        </div>
        <div className="foot__tag">
          See the Unseen. AI-powered proactive intelligence for manufacturing.
        </div>
        <div className="foot__legal">
          © 2026 MonoEdge. All rights reserved.
          <br />
          Built for manufacturing. Powered by AI.
        </div>
      </div>
    </footer>
  );
}
