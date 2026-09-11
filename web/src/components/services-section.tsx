import Link from "next/link";
import type { SanityService } from "@/lib/sanity";

interface ServicesSectionProps {
  services?: SanityService[];
  emergencyPhone?: string;
  emergencyNotice?: string;
}

export function ServicesSection({
  services,
  emergencyPhone,
  emergencyNotice,
}: ServicesSectionProps) {
  if (!services || services.length === 0) return null;

  const phoneHref = emergencyPhone ? `tel:${emergencyPhone.replace(/[^+\d]/g, "")}` : null;

  return (
    <section id="services" className="py-20 bg-white" aria-labelledby="services-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-blue-500 font-semibold text-sm uppercase tracking-widest mb-3">
            What We Offer
          </span>
          <h2 id="services-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Comprehensive Dental Services
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            From routine cleanings to full smile transformations — all under one roof with
            the latest technology and a gentle touch.
          </p>
        </div>

        {/* Service grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link
              key={s._id}
              href={`#services-${s._id}`}
              id={`service-card-${s._id}`}
              className={`group relative rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                s.highlight
                  ? "border-blue-200 bg-blue-50 hover:bg-blue-500 hover:border-blue-500"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              {s.highlight && (
                <span className="absolute top-4 right-4 bg-blue-500 group-hover:bg-white text-white group-hover:text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors">
                  Popular
                </span>
              )}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  s.highlight
                    ? "bg-blue-500 group-hover:bg-white"
                    : "bg-blue-50 group-hover:bg-blue-100"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-5 h-5 transition-colors ${
                    s.highlight ? "text-white group-hover:text-blue-600" : "text-blue-500"
                  }`}
                  aria-hidden="true"
                >
                  <path d="M12 2C8.5 2 6 4.5 6 6c0 1 .4 2 1 2.8C5.7 9.8 5 11.3 5 13c0 3.3 2.7 7 5 8.5.4.3.7.5 1 .5.3 0 .6-.2 1-.5C14.3 20 17 16.3 17 13c0-1.7-.7-3.2-2-4.2.6-.8 1-1.8 1-2.8 0-2.5-2.5-4-4-4z" />
                </svg>
              </div>
              <h3
                className={`font-bold text-base mb-1.5 transition-colors ${
                  s.highlight ? "text-slate-900 group-hover:text-white" : "text-slate-900"
                }`}
              >
                {s.name}
              </h3>
              <p
                className={`text-sm leading-relaxed transition-colors ${
                  s.highlight ? "text-slate-600 group-hover:text-blue-100" : "text-slate-500"
                }`}
              >
                {s.tagline}
              </p>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="#booking"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-full transition-colors shadow-md shadow-blue-200"
          >
            Book Any Service Today
          </Link>
        </div>
      </div>
    </section>
  );
}
