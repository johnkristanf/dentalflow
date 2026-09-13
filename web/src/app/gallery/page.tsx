import type { Metadata } from "next";
import Link from "next/link";

import { getClinic } from "@/api/sanity/clinic";
import { getDentist } from "@/api/sanity/dentist";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { GalleryView } from "@/components/gallery-view";
import { BOOKING_URL } from "@/constants/booking";
import { formatPhoneHref } from "@/utils/format-phone";

export const metadata: Metadata = {
  title: "Smile Gallery | Before & After Dental Transformations",
  description:
    "Explore real patient before and after smile transformations including professional teeth whitening, porcelain veneers, clear aligners, and dental implants.",
};

export default async function GalleryPage() {
  const [clinic, dentist] = await Promise.all([getClinic(), getDentist()]);
  const phoneHref = formatPhoneHref(clinic?.phone);

  return (
    <>
      <SiteNav clinicName={clinic?.name} phone={clinic?.phone} />

      <main id="main-content" className="min-h-screen bg-slate-50 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-blue-200 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-white font-medium">Smile Gallery</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/40 border border-blue-400/50 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-100 mb-4 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Real Patient Cases
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white leading-tight">
                Before & After Transformations
              </h1>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl">
                Explore real clinical results and authentic smile makeovers achieved at {clinic?.name || "our clinic"}. See how custom treatment plans restore both confidence and oral health.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Content Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <GalleryView />
        </section>

        {/* Bottom Consultation Banner */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
                Ready for Your Own Smile Transformation?
              </h2>
              <p className="text-slate-300 text-base mb-8 leading-relaxed">
                Whether you are looking to brighten your smile, straighten alignment, or replace missing teeth, our dental team is here to craft your personalized treatment plan.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-full shadow-lg hover:scale-105 transition-all text-sm"
                >
                  Book Your Consultation
                </a>
                {phoneHref && (
                  <a
                    href={phoneHref}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-full border border-white/20 transition-colors text-sm"
                  >
                    Call {clinic?.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter clinic={clinic} services={[]} dentist={dentist} />
    </>
  );
}
