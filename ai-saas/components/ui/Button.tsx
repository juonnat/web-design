import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "filled" | "outline" | "bare";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

/**
 * The one filled surface per screen lives here. Reach for `outline` or
 * `bare` everywhere else — see /CLAUDE.md non-negotiable #7.
 */
export function Button({
  children,
  href,
  variant = "outline",
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const base =
    "voice-label inline-flex items-center justify-center gap-10 px-24 py-12 text-label transition-colors duration-500";

  const styles = {
    filled:
      "bg-cream text-shadow rounded-[var(--radius-pill)] hover:bg-cream/85",
    outline:
      "border border-dashed border-border text-cream rounded-[var(--radius-outline)] hover:border-cream",
    bare: "text-cream/80 hover:text-cream",
  }[variant];

  const classes = cn(base, styles, className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
