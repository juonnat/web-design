"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";

const NODES = [
  { id: "trigger", label: "Trigger", x: 40, y: 90 },
  { id: "classify", label: "Classify", x: 220, y: 40 },
  { id: "draft", label: "Draft", x: 400, y: 90 },
  { id: "review", label: "Review", x: 580, y: 40 },
  { id: "ship", label: "Ship", x: 760, y: 90 },
];

const EDGES: [string, string][] = [
  ["trigger", "classify"],
  ["classify", "draft"],
  ["draft", "review"],
  ["review", "ship"],
];

export function WorkflowGraph() {
  const reducedMotion = useReducedMotion();
  const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <div className="overflow-x-auto p-24 sm:p-31">
      <svg
        viewBox="0 0 820 160"
        className="min-w-[720px] w-full"
        role="img"
        aria-label="Workflow: trigger, classify, draft, review, ship"
      >
        {EDGES.map(([from, to]) => {
          const a = nodeById[from];
          const b = nodeById[to];
          return (
            <line
              key={from + to}
              x1={a.x + 40}
              y1={a.y + 20}
              x2={b.x}
              y2={b.y + 20}
              stroke="#40372e"
              strokeWidth={1}
              strokeDasharray="4 5"
              className={reducedMotion ? "" : "animate-[dash_3s_linear_infinite]"}
            />
          );
        })}
        {NODES.map((node) => (
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
            <rect
              width={80}
              height={40}
              rx={12}
              fill="#382416"
              stroke="#40372e"
              strokeDasharray="4 4"
            />
            <text
              x={40}
              y={24}
              textAnchor="middle"
              fill="#ffedd7"
              fontSize="11"
              fontWeight={500}
              letterSpacing="0.06em"
              style={{ textTransform: "uppercase" }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
