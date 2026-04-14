import type { EventItem } from "../utils/types";

interface EventCardProps {
  event: EventItem;
  onClick?: () => void;
  clickable?: boolean;
}

export default function EventCard({ event, onClick, clickable = false }: EventCardProps) {
  return (
    <article
      onClick={onClick}
      className={`group relative flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200
                  transition-all duration-200 hover:-translate-y-1 hover:shadow-lg
                  ${clickable ? "cursor-pointer hover:ring-[#003087]/40" : ""}`}
    >
      {/* Coloured top accent bar */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#003087] to-blue-400" />

      {/* Event name */}
      <h3 className="pt-1 text-base font-bold text-slate-900 leading-snug">{event.eventName}</h3>

      {/* Metadata grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <div>
          <p className="font-semibold uppercase tracking-wide text-slate-400">Student</p>
          <p className="mt-0.5 font-medium text-slate-700">{event.studentName}</p>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-wide text-slate-400">Roll No</p>
          <p className="mt-0.5 font-medium text-slate-700">{event.rollNo}</p>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-wide text-slate-400">Location</p>
          <p className="mt-0.5 font-medium text-slate-700">{event.location}</p>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-wide text-slate-400">Date</p>
          <p className="mt-0.5 font-medium text-slate-700">{event.date}</p>
        </div>
      </div>

      {/* Description */}
      <p className="border-t border-slate-100 pt-3 text-xs text-slate-500 leading-relaxed line-clamp-2">
        {event.description}
      </p>

      {/* Edit badge for admins */}
      {clickable && (
        <span className="absolute right-4 top-4 rounded-full bg-[#003087]/10 px-2 py-0.5 text-[10px] font-semibold text-[#003087] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Click to edit
        </span>
      )}
    </article>
  );
}
