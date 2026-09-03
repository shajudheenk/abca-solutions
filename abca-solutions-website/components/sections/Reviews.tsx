import { Section, SectionHeader } from "@/components/ui/Section";
import { Icons } from "@/components/ui/Icon";
import { averageRating, hasSampleReviews, reviews, reviewsProfile } from "@/content/reviews";

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <path
            d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.6Z"
            fill={i <= rating ? "#f5a623" : "#e6e1d8"}
          />
        </svg>
      ))}
    </span>
  );
}

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.27c0-.86-.08-1.7-.22-2.5H12v4.73h6.45a5.5 5.5 0 0 1-2.39 3.6v3h3.86c2.26-2.08 3.58-5.15 3.58-8.83Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.94-2.9l-3.86-3a7.2 7.2 0 0 1-10.72-3.78h-4v3.09A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.36 14.32a7.2 7.2 0 0 1 0-4.62V6.61h-4a12 12 0 0 0 0 10.78l4-3.07Z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.36 6.61l4 3.09A7.15 7.15 0 0 1 12 4.75Z" />
    </svg>
  );
}

export function Reviews() {
  if (reviews.length === 0) return null;

  return (
    <Section id="reviews" tone="sand">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader eyebrow="Reviews" title="What clients say" />
        <div className="flex items-center gap-4 rounded-card border border-line bg-white px-5 py-4">
          <GoogleG className="h-7 w-7 shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-display)] text-[1.25rem] leading-none font-semibold text-ink tnum">
                {averageRating.toFixed(1)}
              </span>
              <Stars rating={Math.round(averageRating)} />
            </div>
            <p className="mt-1 text-[0.8125rem] text-muted">
              {reviews.length} {reviews.length === 1 ? "review" : "reviews"} on Google
            </p>
          </div>
        </div>
      </div>

      {hasSampleReviews && (
        <p className="mt-8 flex items-start gap-3 rounded-card border border-warning/30 bg-warning/8 p-4 text-[0.8125rem] leading-relaxed text-ink">
          <Icons.alert className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <span>
            <strong className="font-semibold">Layout placeholders.</strong> These cards show how Google reviews
            render on the page. Replace them with real, consented reviews in{" "}
            <code className="rounded bg-white px-1.5 py-0.5 text-[0.75rem]">content/reviews.ts</code> before
            launch — publishing invented reviews is an offence under the Digital Markets, Competition and
            Consumers Act 2024.
          </span>
        </p>
      )}

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <li
            key={r.id}
            className="flex flex-col rounded-card border border-line bg-white p-6 transition-shadow duration-300 hover:shadow-raise"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-100 font-[family-name:var(--font-display)] text-[1rem] font-semibold text-teal-600">
                {r.initial}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[0.9375rem] font-medium text-ink">{r.author}</p>
                <p className="truncate text-[0.8125rem] text-muted">{r.business}</p>
              </div>
              <GoogleG className="ml-auto h-4 w-4 shrink-0 opacity-70" />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Stars rating={r.rating} />
              <span className="text-[0.75rem] text-muted">{r.date}</span>
            </div>
            <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed">{r.body}</p>
          </li>
        ))}
      </ul>

      {reviewsProfile.profileUrl && (
        <p className="mt-8">
          <a
            href={reviewsProfile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-teal-600"
          >
            See all reviews on Google
            <Icons.arrowRight className="h-4 w-4" />
          </a>
        </p>
      )}
    </Section>
  );
}
