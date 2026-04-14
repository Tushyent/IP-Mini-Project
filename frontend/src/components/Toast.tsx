interface ToastProps {
  message: string;
  type: "success" | "error";
}

export default function Toast({ message, type }: ToastProps) {
  const isSuccess = type === "success";
  
  return (
    <div className="fixed left-1/2 top-8 z-50 flex -translate-x-1/2 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className={`flex items-center gap-3 rounded-2xl px-5 py-3 shadow-2xl ring-1 ${
        isSuccess 
          ? "bg-white text-emerald-600 ring-emerald-100" 
          : "bg-white text-red-600 ring-red-100"
      }`}>
        <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
          isSuccess ? "bg-emerald-100" : "bg-red-100"
        }`}>
          {isSuccess ? (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        <p className="text-sm font-bold tracking-tight">{message}</p>
      </div>
    </div>
  );
}
