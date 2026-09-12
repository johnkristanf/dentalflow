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

export interface SanityServiceCategory {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  services: SanityService[];
}

export interface SanityService {
  _id: string;
  name: string;
  tagline: string;
  highlight?: boolean;
  procedures?: { name: string; why: string }[];
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
