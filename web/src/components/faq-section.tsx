"use client";

import { useState } from "react";
import type { SanityFaq } from "@/lib/sanity";

interface FaqItemProps {
  id: string;
  question: string;
  answer: string;
}

function FaqItem({ id, question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        id={`faq-btn-${id}`}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
      >
        <span className="font-semibold text-slate-900 text-sm sm:text-base">{question}</span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full border-2 border-blue-200 flex items-center justify-center transition-all duration-200 ${
            open ? "bg-blue-500 border-blue-500 rotate-45" : "bg-white"
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className={`w-3.5 h-3.5 ${open ? "text-white" : "text-blue-500"}`}>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </span>
      </button>
      {open && (
        <div
          id={`faq-answer-${id}`}
          className="px-6 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100"
        >
          <p className="pt-4">{answer}</p>
        </div>
      )}
    </div>
  );
}

interface FaqSectionProps {
  faqs?: SanityFaq[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" className="py-20 bg-slate-50" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-blue-500 font-semibold text-sm uppercase tracking-widest mb-3">
            FAQ
          </span>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Common Questions Answered
          </h2>
          <p className="text-slate-500 text-lg">
            Get answers before you call — and when you&apos;re ready, we&apos;re just a click away.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item) => (
            <FaqItem
              key={item._id}
              id={item._id}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
