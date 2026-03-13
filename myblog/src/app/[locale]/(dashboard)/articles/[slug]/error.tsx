"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-lg font-semibold">Failed to load article.</p>
      <button
        onClick={reset}
        className="px-4 py-2 border-2 border-black text-sm font-medium hover:bg-black hover:text-white transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
