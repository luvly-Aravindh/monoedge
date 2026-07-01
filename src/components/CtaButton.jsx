// The booking CTA used across the page. Every instance opens the modal, so
// the old `data-open` attribute is replaced by an onOpen callback. `xl` and
// `arrow` reproduce the two button sizes from the source markup.
export default function CtaButton({ onOpen, children, xl = false, arrow = false }) {
  return (
    <span className="cta-wrap">
      <button className={xl ? 'btn btn-xl' : 'btn'} onClick={onOpen}>
        {children}
        {arrow && (
          <svg fill="none" viewBox="0 0 24 24">
            <path
              d="M7 7h10v10M7 17 17 7"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.4"
            />
          </svg>
        )}
      </button>
    </span>
  );
}
