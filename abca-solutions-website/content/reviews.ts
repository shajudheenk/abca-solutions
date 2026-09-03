/**
 * Google Business Profile reviews.
 *
 * IMPORTANT — read before launch.
 * Publishing invented reviews as if they were real is an offence under the
 * Digital Markets, Competition and Consumers Act 2024. The entries below are
 * layout samples, flagged as such in the data and labelled on the page.
 *
 * To go live with real reviews:
 *   1. Replace the array with real, consented reviews (or wire the Google
 *      Places API — see README, "Google reviews").
 *   2. Set `sample: false` on each entry.
 * The section hides its placeholder notice automatically once no entry is
 * marked `sample`.
 *
 * Set NEXT_PUBLIC_SHOW_SAMPLE_REVIEWS=false to hide the section entirely
 * until real reviews exist.
 */
export type Review = {
  id: string;
  author: string;
  initial: string;
  business: string;
  sector: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  body: string;
  sample: boolean;
};

export const reviewsProfile = {
  /** Aggregate shown beside the heading. Derived from the array below. */
  platform: "Google",
  profileUrl: null as string | null, // set to your Google Business Profile review URL
};

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Sample review",
    initial: "S",
    business: "Independent convenience store",
    sector: "Convenience & retail",
    rating: 5,
    date: "Placeholder",
    body:
      "This card is a layout sample showing how a Google review renders on the site — author, business, star rating, date and body copy. Replace it with a real, consented review before launch.",
    sample: true,
  },
  {
    id: "r2",
    author: "Sample review",
    initial: "S",
    business: "Light industrial unit",
    sector: "Industrial units",
    rating: 5,
    date: "Placeholder",
    body:
      "A second sample card, sized to show how a longer review wraps across two and three lines at desktop and mobile widths without breaking the grid rhythm.",
    sample: true,
  },
  {
    id: "r3",
    author: "Sample review",
    initial: "S",
    business: "Restaurant",
    sector: "Restaurants & takeaways",
    rating: 5,
    date: "Placeholder",
    body: "A short sample card, included so the varied-length case is visible in the carousel.",
    sample: true,
  },
  {
    id: "r4",
    author: "Sample review",
    initial: "S",
    business: "MOT centre",
    sector: "Garages & MOT",
    rating: 4,
    date: "Placeholder",
    body:
      "A four-star sample, so the partial rating state is visible. Real reviews are pulled through exactly as written — we do not edit them.",
    sample: true,
  },
  {
    id: "r5",
    author: "Sample review",
    initial: "S",
    business: "Care home",
    sector: "Care homes",
    rating: 5,
    date: "Placeholder",
    body:
      "The fifth sample card. Five entries is the minimum for the marquee to loop without a visible gap on a wide desktop screen.",
    sample: true,
  },
];

export const hasSampleReviews = reviews.some((r) => r.sample);
export const showReviews =
  process.env.NEXT_PUBLIC_SHOW_SAMPLE_REVIEWS !== "false" && reviews.length > 0;
export const averageRating =
  reviews.length > 0
    ? Math.round((reviews.reduce((t, r) => t + r.rating, 0) / reviews.length) * 10) / 10
    : 0;
