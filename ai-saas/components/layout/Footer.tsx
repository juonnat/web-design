import Link from "next/link";

const COLUMNS = [
  {
    heading: "Platform",
    links: ["Runtime", "Workflow builder", "Integrations", "Changelog"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "API reference", "Status", "Security"],
  },
];

export function Footer() {
  return (
    <footer className="flex flex-col justify-between gap-68 border-t border-dashed border-border px-[var(--pad)] pb-45 pt-68">
      <div className="grid grid-cols-1 gap-45 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-18">
          <span className="voice-label text-label">Kiln</span>
          <p className="voice-body max-w-[32ch] text-[18px] leading-[1.35] text-cream/70">
            The runtime for autonomous AI agents. Design the process once —
            the agents finish it every time after.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading} className="flex flex-col gap-14">
            <span className="voice-label text-label text-driftwood">
              {col.heading}
            </span>
            <ul className="flex flex-col gap-10">
              {col.links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="voice-label text-label text-cream/80 transition-colors duration-500 hover:text-cream"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse items-start justify-between gap-18 border-t border-dashed border-border pt-24 md:flex-row md:items-center">
        <span className="text-legal text-driftwood">
          © {new Date().getFullYear()} Kiln Systems, Inc. All rights reserved.
        </span>
        <span className="text-legal text-driftwood">
          Built by a design system, not a template.
        </span>
      </div>
    </footer>
  );
}
