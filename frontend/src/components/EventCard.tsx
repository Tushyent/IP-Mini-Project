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
      className={`rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl ${clickable ? "cursor-pointer hover:ring-blue-300" : ""}`}
    >
      <h3 className="text-lg font-bold text-slate-900">{event.eventName}</h3>
      <div className="mt-3 space-y-1 text-sm text-slate-700">
        <p><span className="font-semibold text-slate-900">Student Name:</span> {event.studentName}</p>
        <p><span className="font-semibold text-slate-900">Roll Number:</span> {event.rollNo}</p>
        <p><span className="font-semibold text-slate-900">Location:</span> {event.location}</p>
        <p><span className="font-semibold text-slate-900">Date:</span> {event.date}</p>
        <p><span className="font-semibold text-slate-900">Description:</span> {event.description}</p>
      </div>
    </article>
  );
}
