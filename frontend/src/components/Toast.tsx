interface ToastProps {
  message: string;
  type: "success" | "error";
}

export default function Toast({ message, type }: ToastProps) {
  const tone = type === "success" ? "bg-emerald-500" : "bg-red-500";
  return (
    <div className={`fixed right-4 top-4 z-50 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg ${tone}`}>
      {message}
    </div>
  );
}
