"use client";

import { useState } from "react";

import Link from "next/link";

import type { SanityServiceCategory } from "@/types/dental-types";
import { formatPhoneHref } from "@/utils/format-phone";

interface ServicesSectionProps {
  categories?: SanityServiceCategory[];
  emergencyPhone?: string;
  emergencyNotice?: string;
}

export function ServicesSection({ categories, emergencyPhone, emergencyNotice }: ServicesSectionProps) {
  const safeCategories = categories ?? [];
  const [activeId, setActiveId] = useState(safeCategories[0]?._id ?? "");

  if (safeCategories.length === 0) return null;

  const phoneHref = formatPhoneHref(emergencyPhone);
  const active = safeCategories.find((c) => c._id === activeId) ?? safeCategories[0];
  const isEmergency = active.slug?.toLowerCase().includes("emergency");

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-slate-50 to-white" aria-labelledby="services-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-blue-500 font-semibold text-sm uppercase tracking-widest mb-3">
            What We Offer
          </span>
          <h2 id="services-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Comprehensive Dental Services
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            From routine cleanings to full smile transformations — all under one roof with the latest technology and a gentle touch.
          </p>
        </div>

        {/* Category tab pills */}
        <div role="tablist" aria-label="Service categories" className="flex flex-wrap justify-center gap-3 mb-10">
          {safeCategories.map((cat) => {
            const isActive = cat._id === activeId;
            return (
              <button
                key={cat._id}
                role="tab"
                id={`tab-${cat._id}`}
                aria-selected={isActive}
                aria-controls={`panel-${cat._id}`}
                onClick={() => setActiveId(cat._id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-200 scale-105"
                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {cat.icon && <span aria-hidden="true">{cat.icon}</span>}
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Active category panel */}
        <div id={`panel-${activeId}`} role="tabpanel" aria-labelledby={`tab-${activeId}`}>

          {/* Category intro banner */}
          <div className="flex items-center gap-4 mb-8 p-5 bg-blue-50 border border-blue-100 rounded-2xl">
            {active.icon && <span className="text-4xl flex-shrink-0" aria-hidden="true">{active.icon}</span>}
            <div>
              <h3 className="font-bold text-blue-900 text-lg leading-tight">{active.name}</h3>
              {active.description && <p className="text-blue-700 text-sm mt-0.5">{active.description}</p>}
            </div>
          </div>

          {/* Service cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(active.services ?? []).length === 0 ? (
              <p className="col-span-full text-center text-slate-400 py-8 text-sm">
                No services currently listed under this category.
              </p>
            ) : (
              (active.services ?? []).map((s) => (
              <article
                key={s._id}
                id={`service-${s._id}`}
                className={`relative rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                  s.highlight
                    ? "border-blue-300 bg-gradient-to-br from-blue-50 to-white shadow-md shadow-blue-100"
                    : "border-slate-200 bg-white hover:border-blue-200"
                }`}
              >
                {s.highlight && (
                  <span className="absolute top-4 right-4 bg-blue-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Popular
                  </span>
                )}

                {/* Icon + name + tagline */}
                <div>
                  {active.icon && (
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-xl ${
                        s.highlight ? "bg-blue-500 text-white" : "bg-blue-50"
                      }`}
                      aria-hidden="true"
                    >
                      {active.icon}
                    </div>
                  )}
                  <h4 className="font-bold text-slate-900 text-base mb-1">{s.name}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.tagline}</p>
                </div>

                {/* Procedures list */}
                {s.procedures && s.procedures.length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Procedures
                    </p>
                    <ul className="space-y-3" aria-label={`${s.name} procedures`}>
                      {s.procedures.map((proc, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" aria-hidden="true" />
                          <div>
                            <span className="text-sm font-semibold text-slate-800 block">{proc.name}</span>
                            <span className="text-xs text-slate-500 leading-relaxed">{proc.why}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Per-card booking link */}
                <Link
                  href="#booking"
                  id={`book-${s._id}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:text-blue-800 transition-colors group"
                >
                  Book this service
                  <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </Link>
              </article>
            )))}
          </div>
        </div>

        {/* Emergency call banner */}
        {isEmergency && phoneHref && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-red-50 border border-red-200 rounded-2xl px-6 py-5">
            <div>
              <p className="font-bold text-red-800 text-lg">Dental Emergency?</p>
              <p className="text-red-600 text-sm">
                {emergencyNotice ?? "Call us immediately — same-day slots available."}
              </p>
            </div>
            <a
              href={phoneHref}
              id="emergency-call-btn"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-md shadow-red-200"
            >
              📞 {emergencyPhone}
            </a>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <Link
            href="#booking"
            id="services-book-cta"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-full transition-colors shadow-md shadow-blue-200"
          >
            Book Any Service Today
          </Link>
        </div>
      </div>
    </section>
  );
}

