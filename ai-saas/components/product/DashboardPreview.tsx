"use client";

const STATS = [
  { label: "Runs today", value: "4,812" },
  { label: "Success rate", value: "99.2%" },
  { label: "Avg latency", value: "1.4s" },
  { label: "Active agents", value: "26" },
];

const BARS = [40, 65, 52, 78, 61, 90, 74, 55, 82, 68, 95, 71];

const FEED = [
  { time: "09:41", label: "Invoice #4021 reconciled", status: "done" },
  { time: "09:38", label: "Escalated: contract clause ambiguous", status: "flag" },
  { time: "09:35", label: "Onboarding email sequence sent", status: "done" },
  { time: "09:29", label: "Refund request approved", status: "done" },
  { time: "09:22", label: "Lead scored and routed to sales", status: "done" },
];

export function DashboardPreview() {
  return (
    <div className="flex flex-col gap-24 p-24 sm:p-31">
      <div className="grid grid-cols-2 gap-14 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-8 border border-dashed border-border p-14"
          >
            <span className="text-legal text-driftwood">{stat.label}</span>
            <span className="voice-label text-[22px]">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-end gap-1 border border-dashed border-border p-18 h-[120px]">
        {BARS.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-cream/40"
            style={{ height: `${h}%` }}
            aria-hidden
          />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-legal text-driftwood pb-8">
          Live activity
        </span>
        {FEED.map((item) => (
          <div
            key={item.time + item.label}
            className="flex items-center gap-14 border-t border-dashed border-border py-10 first:border-t-0"
          >
            <span className="text-legal text-driftwood w-[42px] shrink-0">
              {item.time}
            </span>
            <span
              className={
                "h-6 w-6 shrink-0 rounded-full " +
                (item.status === "flag" ? "bg-ember" : "bg-cream/50")
              }
              aria-hidden
            />
            <span className="voice-label text-[12px] text-cream/85">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
