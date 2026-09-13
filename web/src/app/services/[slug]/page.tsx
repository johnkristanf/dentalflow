import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getClinic } from "@/api/sanity/clinic";
import { getAllServiceSlugs, getServiceBySlug } from "@/api/sanity/service";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { getDentist } from "@/api/sanity/dentist";
import { BOOKING_URL } from "@/constants/booking";
import { formatPhoneHref } from "@/utils/format-phone";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.name,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  const [service, clinic, dentist] = await Promise.all([
    getServiceBySlug(slug),
    getClinic(),
    getDentist(),
  ]);

  if (!service) notFound();

  const phoneHref = formatPhoneHref(clinic?.phone);

  return (
    <>
      <SiteNav clinicName={clinic?.name} phone={clinic?.phone} />

      <main id="main-content" className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">

        {/* Hero strip */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-blue-200 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white font-medium truncate">{service.name}</span>
            </nav>

            {/* Category badge */}
            {service.categoryName && (
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium mb-4">
                {service.categoryIcon && <span aria-hidden="true">{service.categoryIcon}</span>}
                {service.categoryName}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">{service.name}</h1>
            <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">{service.tagline}</p>

            {service.highlight && (
              <span className="inline-block mt-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                ⭐ Most Popular
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-3 gap-10">

          {/* Main column */}
          <div className="lg:col-span-2 space-y-10">

            {/* Signs & Symptoms */}
            {service.symptoms && service.symptoms.length > 0 && (
              <section aria-labelledby="symptoms-heading">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <h2
                    id="symptoms-heading"
                    className="flex items-center gap-2 text-lg font-bold text-amber-900 mb-4"
                  >
                    <span aria-hidden="true">⚠️</span>
                    Signs You May Need This Service
                  </h2>
                  <ul className="space-y-3" aria-label={`Signs you need ${service.name}`}>
                    {service.symptoms.map((symptom, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-1.5 w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-amber-950/90 leading-relaxed">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Procedures */}
            {service.procedures && service.procedures.length > 0 && (
              <section aria-labelledby="procedures-heading">
                <h2 id="procedures-heading" className="text-xl font-bold text-slate-900 mb-5">
                  Procedures Included
                </h2>
                <ol className="space-y-5">
                  {service.procedures.map((proc, i) => (
                    <li key={i} className="flex gap-4">
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </div>
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex-1 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-slate-900 mb-2">{proc.name}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {proc.description ?? proc.why}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Back link */}
            <Link
              href="/#services"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
            >
              <span aria-hidden="true">←</span>
              Back to all services
            </Link>
          </div>

          {/* Sidebar: Book this service */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">Ready to get started?</h2>
                <p className="text-slate-500 text-sm">
                  Book an appointment for <span className="font-semibold text-slate-700">{service.name}</span> today — no long waits, gentle care.
                </p>
              </div>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="service-detail-book-btn"
                className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3.5 rounded-full transition-colors shadow-md shadow-blue-200"
              >
                Book This Service
              </a>

              {clinic?.phone && phoneHref && (
                <a
                  href={phoneHref}
                  className="flex items-center justify-center gap-2 w-full border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 font-semibold px-6 py-3 rounded-full transition-colors text-sm"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                  </svg>
                  Call {clinic.phone}
                </a>
              )}

              {/* Clinic info */}
              {(dentist?.name || clinic?.name) && (
                <div className="border-t border-slate-100 pt-4 text-center">
                  {dentist?.name && (
                    <p className="text-sm text-slate-700 font-semibold">{dentist.name}</p>
                  )}
                  {dentist?.role && (
                    <p className="text-xs text-slate-400 mt-0.5">{dentist.role}</p>
                  )}
                  {dentist?.yearsExperience && (
                    <p className="text-xs text-blue-600 mt-1 font-medium">
                      {dentist.yearsExperience}+ years of experience
                    </p>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter clinic={clinic} services={[]} dentist={dentist} />
    </>
  );
}
