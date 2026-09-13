import type { Metadata } from "next";

import { getServiceCategories } from "@/api/sanity/categories";
import { getClinic } from "@/api/sanity/clinic";
import { getDentist } from "@/api/sanity/dentist";
import { getFaqs } from "@/api/sanity/faqs";
import { getReviews } from "@/api/sanity/reviews";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { InfoSection } from "@/components/info-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { TrustSection } from "@/components/trust-section";
import { formatPhoneHref } from "@/utils/format-phone";

export async function generateMetadata(): Promise<Metadata> {
  const clinic = await getClinic();

  if (!clinic) {
    return {
      title: "Dental Clinic",
      description: "Modern dental care — general dentistry, cosmetic dentistry, implants, and emergency care.",
    };
  }

  const title = clinic.tagline
    ? `${clinic.name} | ${clinic.tagline}`
    : `${clinic.name} | Dental Clinic`;

  const description =
    clinic.tagline ||
    `Gentle, modern dental care at ${clinic.name}. General, cosmetic, and emergency dental services.`;

  return { title, description };
}

export default async function HomePage() {
  const [clinic, categories, dentist, reviews, faqs] = await Promise.all([
    getClinic(),
    getServiceCategories(),
    getDentist(),
    getReviews(),
    getFaqs(),
  ]);

  const safeCategories = categories ?? [];
  const safeServices = safeCategories.flatMap((c) => c.services);
  const safeReviews = reviews ?? [];
  const safeFaqs = faqs ?? [];

  const jsonLd = clinic
    ? {
      "@context": "https://schema.org",
      "@type": "DentalClinic",
      name: clinic.name,
      telephone: formatPhoneHref(clinic.phone) ?? undefined,
      email: clinic.email,
      priceRange: "$$",
      medicalSpecialty: "Dentistry",
      address: clinic.address
        ? {
          "@type": "PostalAddress",
          streetAddress: clinic.address.street,
          addressLocality: clinic.address.city,
          addressRegion: clinic.address.state,
          postalCode: clinic.address.zip,
          addressCountry: "US",
        }
        : undefined,
      aggregateRating: clinic.rating
        ? {
          "@type": "AggregateRating",
          ratingValue: String(clinic.rating),
          reviewCount: String(clinic.reviewCount ?? 0),
          bestRating: "5",
        }
        : undefined,
    }
    : null;

  const faqJsonLd =
    safeFaqs.length > 0
      ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: safeFaqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
      : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <SiteNav clinicName={clinic?.name} phone={clinic?.phone} />

      <main id="main-content">
        <HeroSection clinic={clinic} />
        <ServicesSection
          categories={safeCategories}
          emergencyPhone={clinic?.emergencyPhone ?? clinic?.phone}
          emergencyNotice={clinic?.emergencyNotice}
        />
        <TrustSection
          dentist={dentist}
          reviews={safeReviews}
          rating={clinic?.rating}
          reviewCount={clinic?.reviewCount}
        />
        <InfoSection clinic={clinic} />
        {/* <BookingSection
          phone={clinic?.phone}
          clinicName={clinic?.name}
          hours={clinic?.hours}
          services={safeServices}
        /> */}
        <FaqSection faqs={safeFaqs} />
      </main>

      <SiteFooter clinic={clinic} services={safeServices} dentist={dentist} />
    </>
  );
}
