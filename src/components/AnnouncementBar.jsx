// Slim confirmation bar at the very top of the page.
export default function AnnouncementBar() {
  return (
    <div className="annbar">
      <div className="wrap">
        <svg fill="none" viewBox="0 0 24 24">
          <path
            d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <span>Your copy of 7 Ways a Manufacturing Plant Dies is on its way to your inbox.</span>
      </div>
    </div>
  );
}
