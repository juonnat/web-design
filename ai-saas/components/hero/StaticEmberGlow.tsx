export function StaticEmberGlow() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(220,80,0,0.35), rgba(56,36,22,0.4) 35%, transparent 65%)",
      }}
    />
  );
}
