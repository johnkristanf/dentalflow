import Image from "next/image";
import Link from "next/link";

import type { SanityDentist, SanityReview } from "@/types/dental-types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill={i < rating ? "#FBBF24" : "#E2E8F0"}
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

interface TrustSectionProps {
  dentist?: SanityDentist | null;
  reviews?: SanityReview[];
  rating?: number;
  reviewCount?: number;
}

export function TrustSection({ dentist, reviews, rating, reviewCount }: TrustSectionProps) {
  const hasDentist = !!dentist;
  const hasReviews = reviews && reviews.length > 0;

  if (!hasDentist && !hasReviews) return null;

  return (
    <section id="about" className="py-20 bg-slate-50" aria-labelledby="trust-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block text-blue-500 font-semibold text-sm uppercase tracking-widest mb-3">
            Why Patients Choose Us
          </span>
          <h2 id="trust-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Meet Your Dentist &amp; Our Team
          </h2>
        </div>

        {/* Dentist bio */}
        {hasDentist && (
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            {/* Photo */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-xl shadow-blue-100/60 bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center">
                {dentist.photo?.url ? (
                  <Image
                    src={dentist.photo.url}
                    alt={dentist.photo.alt || dentist.name || "Dentist photo"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-blue-300/60 flex items-center justify-center mb-4">
                      <svg viewBox="0 0 24 24" fill="white" className="w-14 h-14" aria-hidden="true">
                        <path d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
                      </svg>
                    </div>
                    {dentist.name && <p className="text-blue-700 font-bold">{dentist.name}</p>}
                    {dentist.role && <p className="text-blue-500 text-sm">{dentist.role}</p>}
                  </div>
                )}
              </div>

              {/* Credentials floating card */}
              {dentist.education && dentist.education.length > 0 && (
                <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl px-5 py-4 shadow-xl max-w-xs">
                  <p className="font-bold text-slate-900 text-sm mb-2">Credentials &amp; Education</p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {dentist.education.map((c) => (
                      <li key={c} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bio copy */}
            <div>
              {dentist.name && (
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{dentist.name}</h3>
              )}
              {dentist.bio && (
                <p className="text-slate-600 leading-relaxed mb-6 whitespace-pre-line">{dentist.bio}</p>
              )}
              {dentist.yearsExperience != null && (
                <div className="flex flex-wrap gap-3">
                  <div className="bg-blue-50 rounded-2xl px-5 py-3 text-center border border-blue-100">
                    <p className="text-2xl font-extrabold text-blue-600">{dentist.yearsExperience}+</p>
                    <p className="text-xs text-slate-500 mt-0.5">Years Experience</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Before/after teaser */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-8 sm:p-10 mb-16 text-white text-center">
          <h3 className="text-2xl font-extrabold mb-2">See the Difference We Make</h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Real transformations from real patients — veneers, whitening, Invisalign, and
            implant cases. Browse our smile gallery to envision your own results.
          </p>
          <Link
            id="view-gallery-btn"
            href="/gallery"
            className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform shadow"
          >
            View Smile Gallery
          </Link>
        </div>

        {/* Reviews */}
        {hasReviews && (
          <div id="reviews">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-extrabold text-slate-900">What Our Patients Say</h3>
              {rating != null && (
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-slate-100">
                  <svg viewBox="0 0 24 24" fill="#FBBF24" className="w-5 h-5" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="font-bold text-slate-900 text-sm">{rating}</span>
                  {reviewCount != null && (
                    <>
                      <span className="text-slate-400 text-sm">·</span>
                      <span className="text-slate-500 text-sm">{reviewCount}+ Google reviews</span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews!.map((r) => (
                <article
                  key={r._id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                      {r.date && <p className="text-slate-400 text-xs">{r.date}</p>}
                    </div>
                    {r.procedure && (
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex-shrink-0">
                        {r.procedure}
                      </span>
                    )}
                  </div>
                  <StarRating rating={r.rating} />
                  <p className="text-slate-600 text-sm leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1 border-t border-slate-100">
                    <svg viewBox="0 0 24 24" fill="#4285F4" className="w-3.5 h-3.5" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                    </svg>
                    Posted on Google
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
