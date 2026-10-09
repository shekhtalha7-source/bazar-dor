export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <div className="skeleton h-56 w-full" />
      <div className="skeleton h-6 w-40" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-28 w-full" />
        ))}
      </div>
    </main>
  );
}