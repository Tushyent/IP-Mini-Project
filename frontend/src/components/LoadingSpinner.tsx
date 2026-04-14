export default function LoadingSpinner() {
  return (
    <div className="flex justify-center py-20">
      <div className="relative">
        {/* Outer ring */}
        <div className="h-12 w-12 rounded-full border-4 border-slate-100" />
        {/* Spinning accent */}
        <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-[#003087]" />
      </div>
    </div>
  );
}
