const INSTA_URL = "https://www.instagram.com/dsy.mgt/";
const INSTA_HANDLE = "dsy.mgt";
const INSTA_ARIA = "Abrir Instagram da DSY";

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function InstaFixed() {
  return (
    <a
      href={INSTA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={INSTA_ARIA}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-black/80"
    >
      <InstagramIcon />
      <span>{INSTA_HANDLE}</span>
    </a>
  );
}
