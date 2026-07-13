export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="10" className="fill-text" />
      <path
        d="M12 28V12h3.2l9.6 11.4V12H28v16h-3.2L15.2 16.6V28H12Z"
        className="fill-bg"
      />
      <circle cx="29" cy="12" r="2.4" fill="var(--color-lime)" />
    </svg>
  );
}
