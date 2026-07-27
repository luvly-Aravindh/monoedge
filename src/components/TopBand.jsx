// Brand band beneath the announcement bar.
const logoSrc = `${import.meta.env.BASE_URL}img/logo-Black.webp`;

export default function TopBand() {
  return (
    <header className="topband">
      <div className="wrap topband__in">
        <a className="tb-brand" href="#">
          <img
            className="tb-logoimg"
            src={logoSrc}
            alt="MonoEdge"
            width={160}
            height={40}
            decoding="async"
          />
        </a>
        <div className="tb-mid">
          <span className="tb-note">
            <span className="pulse" />
            Only <span className="pop">9</span> demo slots open this month.
          </span>
        </div>
      </div>
    </header>
  );
}
