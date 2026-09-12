import Image from "next/image";
import Link from "next/link";

import type { SanityClinic } from "@/types/dental-types";
import { formatPhoneHref } from "@/utils/format-phone";

interface HeroSectionProps {
  clinic?: SanityClinic | null;
}

export function HeroSection({ clinic }: HeroSectionProps) {
  if (!clinic) return null;

  const phoneHref = formatPhoneHref(clinic.phone);
  const trustBadges = [
    "✓ Accepting New Patients",
    clinic.insurances && clinic.insurances.length > 0 ? "✓ Insurance Accepted" : null,
    clinic.emergencyPhone || clinic.emergencyNotice ? "✓ Same-Day Emergency" : null,
  ].filter(Boolean) as string[];

  // Stat cards shown in the floating panel
  const stats: Array<{ value: string; label: string }> = [];
  if (clinic.rating != null) {
    stats.push({ value: `${clinic.rating}★`, label: `${clinic.reviewCount ?? ""}+ Reviews` });
  }
  if (clinic.yearEstablished != null) {
    const currentYear = new Date().getFullYear();
    const years =
      clinic.yearEstablished > 1900
        ? Math.max(1, currentYear - clinic.yearEstablished)
        : clinic.yearEstablished;
    stats.push({ value: `${years}+`, label: "Years in Practice" });
  }

  const photoUrl = clinic.photo?.url;
  const photoAlt = clinic.photo?.alt || `${clinic.name ?? "dental clinic"} — hero photo`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Decorative background circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-blue-300/20 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-32 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left: copy */}
        <div className="text-white">
          {/* Google rating trust badge */}
          {clinic.rating != null && (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 text-sm font-medium mb-6">
              <span className="flex text-yellow-300" aria-hidden="true">★★★★★</span>
              <span>
                {clinic.rating}
                {clinic.reviewCount != null && ` · ${clinic.reviewCount}+ Google Reviews`}
              </span>
            </div>
          )}

          {clinic.tagline && (
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6"
            >
              {clinic.tagline}
            </h1>
          )}

          {clinic.name && (
            <p className="text-blue-100 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              Your neighborhood dental family at <strong>{clinic.name}</strong>.
              {clinic.emergencyPhone || clinic.emergencyNotice
                ? " Same-day emergency appointments available — new patients always welcome."
                : " New patients always welcome."}
            </p>
          )}

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#booking"
              id="hero-book-btn"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-7 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.9 3 3 3.9 3 5v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13z" />
              </svg>
              Book an Appointment
            </Link>
            {phoneHref && clinic.phone && (
              <a
                href={phoneHref}
                id="hero-phone-btn"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-bold px-7 py-4 rounded-full hover:bg-white/10 transition-all duration-200"
                aria-label={`Call us at ${clinic.phone}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                </svg>
                {clinic.phone}
              </a>
            )}
          </div>

          {/* Quick trust chips */}
          {trustBadges.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-8">
              {trustBadges.map((t) => (
                <span
                  key={t}
                  className="bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: clinic photo or placeholder */}
        <div className="relative hidden md:block">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/30 aspect-[4/5]">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={photoAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 0px, 50vw"
                priority
              />
            ) : (
              /* Placeholder shown until a photo is uploaded in Sanity */
              <div className="w-full h-full bg-gradient-to-br from-white/30 to-blue-200/20 flex flex-col items-center justify-center gap-4">
                <div className="w-32 h-32 rounded-full bg-white/30 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="white" className="w-16 h-16 opacity-80" aria-hidden="true">
                    <path d="M12 2C8.5 2 6 4.5 6 6c0 1 .4 2 1 2.8C5.7 9.8 5 11.3 5 13c0 3.3 2.7 7 5 8.5.4.3.7.5 1 .5.3 0 .6-.2 1-.5C14.3 20 17 16.3 17 13c0-1.7-.7-3.2-2-4.2.6-.8 1-1.8 1-2.8 0-2.5-2.5-4-4-4z" />
                  </svg>
                </div>
                {clinic.name && <p className="text-white/70 text-sm font-medium">{clinic.name}</p>}
                {clinic.address?.city && clinic.address?.state && (
                  <p className="text-white/50 text-xs">{clinic.address.city}, {clinic.address.state}</p>
                )}
              </div>
            )}
          </div>

          {/* Floating stat cards — rating + years experience */}
          {stats.length > 0 && (
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-5 py-4 shadow-xl flex items-center gap-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-3">
                  {i > 0 && <div className="w-px h-10 bg-slate-200" />}
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    {i === 0 ? (
                      /* Star icon for rating */
                      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ) : (
                      /* Calendar/experience icon */
                      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-slate-900 leading-none">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 sm:h-16">
          <path d="M0,40 C480,80 960,0 1440,40 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
