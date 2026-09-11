export interface SanityClinic {
  name?: string;
  tagline?: string;
  phone?: string;
  emergencyPhone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  rating?: number;
  reviewCount?: number;
  yearEstablished?: number;
  hours?: Array<{ day: string; time: string }>;
  insurances?: string[];
  emergencyNotice?: string;
  photo?: {
    url?: string;
    alt?: string;
  };
}

export interface SanityService {
  _id: string;
  name: string;
  tagline: string;
  category?: string;
  highlight?: boolean;
}

export interface SanityDentist {
  name?: string;
  role?: string;
  credentials?: string;
  bio?: string;
  yearsExperience?: number;
  patientsServed?: number;
  satisfactionRate?: number;
  education?: string[];
}

export interface SanityReview {
  _id: string;
  name: string;
  rating: number;
  text: string;
  procedure?: string;
  date?: string;
}

export interface SanityFaq {
  _id: string;
  question: string;
  answer: string;
}

export interface DentalLandingData {
  clinic: SanityClinic | null;
  services: SanityService[];
  dentist: SanityDentist | null;
  reviews: SanityReview[];
  faqs: SanityFaq[];
}

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "lcbbbb1a";
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SANITY_API_VERSION = "2024-01-01";

export const LANDING_PAGE_QUERY = `{
  "clinic": *[_type == "clinic"][0] {
    ...,
    "photo": {
      "url": photo.asset->url,
      "alt": photo.alt
    }
  },
  "services": *[_type == "service"] | order(order asc, _createdAt asc),
  "dentist": *[_type == "dentist"][0],
  "reviews": *[_type == "review" && (featured == true || !defined(featured))] | order(_createdAt desc)[0...6],
  "faqs": *[_type == "faq"] | order(order asc, _createdAt asc)
}`;

// ponytail: native fetch replaces @sanity/client lib; add client if live draft preview is needed
export async function getLandingPageData(): Promise<DentalLandingData> {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(
    LANDING_PAGE_QUERY
  )}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return {
        clinic: null,
        services: [],
        dentist: null,
        reviews: [],
        faqs: [],
      };
    }

    const data = await res.json();
    const result = data.result || {};

    return {
      clinic: result.clinic ?? null,
      services: result.services ?? [],
      dentist: result.dentist ?? null,
      reviews: result.reviews ?? [],
      faqs: result.faqs ?? [],
    };
  } catch {
    return {
      clinic: null,
      services: [],
      dentist: null,
      reviews: [],
      faqs: [],
    };
  }
}
