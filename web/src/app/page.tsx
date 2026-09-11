import type { Metadata } from "next";

import { BookingSection } from "@/components/booking-section";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { InfoSection } from "@/components/info-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { TrustSection } from "@/components/trust-section";
import { getLandingPageData } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const { clinic } = await getLandingPageData();

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

  return {
    title,
    description,
  };
}

export default async function HomePage() {
  const { clinic, services, dentist, reviews, faqs } = await getLandingPageData();

  const jsonLd = clinic
    ? {
      "@context": "https://schema.org",
      "@type": "DentalClinic",
      name: clinic.name,
      telephone: clinic.phone?.replace(/[^+\d]/g, ""),
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
    faqs.length > 0
      ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
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
          services={services}
          emergencyPhone={clinic?.emergencyPhone ?? clinic?.phone}
          emergencyNotice={clinic?.emergencyNotice}
        />
        <TrustSection
          dentist={dentist}
          reviews={reviews}
          rating={clinic?.rating}
          reviewCount={clinic?.reviewCount}
        />
        <InfoSection clinic={clinic} />
        <BookingSection
          phone={clinic?.phone}
          clinicName={clinic?.name}
          hours={clinic?.hours}
          services={services}
        />
        <FaqSection faqs={faqs} />
      </main>

      <SiteFooter clinic={clinic} services={services} dentist={dentist} />
    </>
  );
}
