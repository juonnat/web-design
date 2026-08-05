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
    "voice-label inline-flex items-center justify-center gap-10 px-24 py-12 text-label transition-[color,background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] active:scale-[0.98]";

  const styles = {
    filled:
      "bg-accent text-on-accent rounded-[var(--radius-pill)] hover:bg-accent/90",
    outline:
      "border border-dashed border-line text-ink rounded-[var(--radius-outline)] hover:border-ink",
    bare: "text-mute hover:text-ink",
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
