import { Resource, CATEGORY_COLORS, CATEGORY_LABELS } from "@/types";

interface EventCardProps {
  readonly resource: Resource;
  readonly style?: React.CSSProperties;
}

export default function EventCard({ resource, style }: EventCardProps) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      className="group block rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scholarship focus-visible:ring-offset-2 active:scale-[0.99]"
    >
      <div className="flex gap-3">
        {/* Category color bar */}
        <div
          className="w-1 shrink-0 rounded-full"
          style={{ backgroundColor: CATEGORY_COLORS[resource.category] }}
        />

        <div className="min-w-0 flex-1">
          {/* Category pill */}
          <span
            className="mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
            style={{
              backgroundColor: CATEGORY_COLORS[resource.category],
            }}
          >
            {CATEGORY_LABELS[resource.category]}
          </span>

          {/* Title */}
          <h3 className="mb-1 text-sm font-semibold leading-snug text-slate-900 line-clamp-2 group-hover:text-scholarship">
            {resource.title}
          </h3>

          {/* Description */}
          <p className="mb-2 text-xs leading-relaxed text-slate-500 line-clamp-3">
            {resource.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"
                />
              </svg>
              {resource.location}
            </span>
            {resource.date && (
              <span className="flex items-center gap-1">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {resource.date}
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
