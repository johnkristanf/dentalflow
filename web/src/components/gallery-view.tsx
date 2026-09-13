"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BOOKING_URL } from "@/constants/booking";

export interface GalleryCase {
  id: string;
  title: string;
  category: string;
  categoryKey: "all" | "cosmetic" | "orthodontics" | "restorative";
  image: string;
  summary: string;
  challenge: string;
  treatment: string;
  timeline: string;
  serviceSlug?: string;
  badge: string;
}

const GALLERY_CASES: GalleryCase[] = [
  {
    id: "whitening",
    title: "Professional In-Office Teeth Whitening",
    category: "Cosmetic Dentistry",
    categoryKey: "cosmetic",
    image: "/gallery/whitening.jpg",
    badge: "6 Shades Brighter",
    summary: "Dramatic brightness improvement achieved safely in a single session.",
    challenge: "Deep coffee, tea, and intrinsic enamel staining accumulated over years.",
    treatment: "Medical-grade hydrogen peroxide gel activated with specialized cold blue LED wavelength.",
    timeline: "Single 60-minute visit",
    serviceSlug: "advanced-teeth-whitening",
  },
  {
    id: "veneers",
    title: "Porcelain Smile Makeover (Veneers)",
    category: "Cosmetic Dentistry",
    categoryKey: "cosmetic",
    image: "/gallery/veneers.jpg",
    badge: "Full Aesthetic Realignment",
    summary: "Flawless symmetry, natural translucency, and permanent stain resistance.",
    challenge: "Chipped incisal edges, uneven tooth lengths, and micro-gaps across upper smile line.",
    treatment: "Custom handcrafted ultra-thin porcelain veneers bonded to upper anterior teeth.",
    timeline: "2 visits over 2 weeks",
    serviceSlug: "advanced-teeth-whitening",
  },
  {
    id: "invisalign",
    title: "Clear Aligner Orthodontic Correction",
    category: "Orthodontics",
    categoryKey: "orthodontics",
    image: "/gallery/invisalign.jpg",
    badge: "Discreet Straightening",
    summary: "Straightened smile and corrected deep bite without metal brackets.",
    challenge: "Moderate anterior crowding and crossbite making oral hygiene and chewing difficult.",
    treatment: "Series of custom 3D-modeled clear removable aligners swapped every 7–10 days.",
    timeline: "8–10 months",
  },
  {
    id: "implants",
    title: "Dental Implant & Ceramic Crown",
    category: "Restorative Dentistry",
    categoryKey: "restorative",
    image: "/gallery/implants.jpg",
    badge: "Permanent Tooth Replacement",
    summary: "Lifelike stability, restoring full biting force and preventing bone resorption.",
    challenge: "Missing premolar with adjacent tooth tipping and loss of chewing stability.",
    treatment: "Biocompatible titanium implant fixture, custom abutment, and screw-retained zirconia crown.",
    timeline: "3–4 months (including osseointegration)",
    serviceSlug: "tooth-colored-composite-fillings",
  },
];

const CATEGORIES = [
  { key: "all", label: "All Cases" },
  { key: "cosmetic", label: "Cosmetic Dentistry" },
  { key: "orthodontics", label: "Orthodontics" },
  { key: "restorative", label: "Restorative" },
] as const;

export function GalleryView() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedCase, setSelectedCase] = useState<GalleryCase | null>(null);

  const filteredCases =
    activeFilter === "all"
      ? GALLERY_CASES
      : GALLERY_CASES.filter((c) => c.categoryKey === activeFilter);

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {CATEGORIES.map((tab) => {
          const isActive = activeFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                isActive
                  ? "bg-blue-600 text-white shadow-blue-200"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredCases.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            {/* Image Preview Container */}
            <div
              className="relative bg-slate-950 aspect-[16/10] overflow-hidden group cursor-pointer"
              onClick={() => setSelectedCase(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedCase(item)}
              aria-label={`View full comparison for ${item.title}`}
            >
              <Image
                src={item.image}
                alt={`Before and after transformation for ${item.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Side-by-side indicators */}
              <div className="absolute top-4 left-4 flex gap-2 pointer-events-none z-10">
                <span className="bg-black/70 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 shadow">
                  Before
                </span>
              </div>
              <div className="absolute top-4 right-4 flex gap-2 pointer-events-none z-10">
                <span className="bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-400/40 shadow">
                  After
                </span>
              </div>

              {/* Overlay hover hint */}
              <div className="absolute inset-0 bg-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="bg-white/95 text-blue-900 font-semibold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                  Click to Expand
                </span>
              </div>
            </div>

            {/* Case Details */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {item.summary}
                </p>

                {/* Treatment details breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="block font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Initial Condition
                    </span>
                    <p className="text-slate-700">{item.challenge}</p>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Treatment Applied
                    </span>
                    <p className="text-slate-700">{item.treatment}</p>
                  </div>
                  <div className="sm:col-span-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider">
                      Timeline
                    </span>
                    <span className="font-bold text-slate-800">{item.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  Book This Treatment
                </a>
                {item.serviceSlug && (
                  <Link
                    href={`/services/${item.serviceSlug}`}
                    className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-slate-700 hover:text-blue-600 px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    Service Details
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCase(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  {selectedCase.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {selectedCase.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors text-lg font-bold"
                aria-label="Close image modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={selectedCase.image}
                alt={selectedCase.title}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-black/75 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
                  Before
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-blue-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
                  After
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-slate-600 max-w-lg">
                {selectedCase.summary}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors shadow"
                >
                  Book Free Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
