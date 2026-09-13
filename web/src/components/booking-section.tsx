"use client";

import { useState } from "react";
import type { SanityService } from "@/types/dental-types";

interface FormState {
  name: string;
  phone: string;
  email: string;
  date: string;
  reason: string;
}

const initialForm: FormState = { name: "", phone: "", email: "", date: "", reason: "" };

interface BookingSectionProps {
  phone?: string;
  clinicName?: string;
  hours?: Array<{ day: string; time: string }>;
  services?: SanityService[];
}

export function BookingSection({
  phone,
  clinicName,
  hours,
  services,
}: BookingSectionProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const phoneHref = phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : null;
  const hoursSummary = hours && hours.length > 0
    ? hours.slice(0, 2).map((h) => `${h.day} ${h.time}`).join(" · ")
    : null;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <section id="booking" className="py-20 bg-white" aria-labelledby="booking-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-start">

        {/* Left: context */}
        <div>
          <span className="inline-block text-blue-500 font-semibold text-sm uppercase tracking-widest mb-3">
            Book an Appointment
          </span>
          <h2 id="booking-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-500 text-lg mb-8 leading-relaxed">
            Fill out the form and we&apos;ll confirm your appointment promptly.
            {phone && " Prefer to talk? We're always just a call away."}
          </p>

          {/* Phone CTA */}
          {phone && phoneHref && (
            <a
              href={phoneHref}
              id="booking-phone-cta"
              className="flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-2xl px-6 py-5 mb-6 hover:bg-blue-100 transition-colors group"
              aria-label={`Call ${clinicName || "us"} at ${phone}`}
            >
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6" aria-hidden="true">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Call us directly</p>
                <p className="text-xl font-extrabold text-blue-600">{phone}</p>
                {hoursSummary && (
                  <p className="text-xs text-slate-400 mt-0.5">{hoursSummary}</p>
                )}
              </div>
            </a>
          )}

          {/* What to expect */}
          <div className="space-y-3">
            {[
              { label: "Prompt confirmation", desc: "We confirm your slot during regular clinic hours." },
              { label: "Your info stays private", desc: "We strictly adhere to patient data privacy." },
              { label: "No pressure", desc: "Transparent treatment plans and consultations." },
            ].map(({ label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{label}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-500" aria-hidden="true">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Request Received!</h3>
              <p className="text-slate-500 text-sm max-w-xs">
                We&apos;ll reach out via phone or email to confirm your preferred time.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-blue-500 text-sm font-semibold hover:underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Request an Appointment</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-name" className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="booking-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className={inputClass}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="booking-phone" className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    className={inputClass}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="booking-email" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Email Address
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={inputClass}
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="booking-date" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Preferred Date
                </label>
                <input
                  id="booking-date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className={inputClass}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label htmlFor="booking-reason" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Reason for Visit
                </label>
                <select
                  id="booking-reason"
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select a service or reason...</option>
                  {services && services.length > 0 ? (
                    services.map((s) => (
                      <option key={s._id} value={s.name}>
                        {s.name}
                      </option>
                    ))
                  ) : (
                    <>
                      <option>New Patient Exam &amp; Cleaning</option>
                      <option>Emergency / Urgent Care</option>
                      <option>General Consultation</option>
                    </>
                  )}
                  <option value="Other">Other</option>
                </select>
              </div>

              {submitError && (
                <p role="alert" className="text-sm text-red-600 font-medium bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                id="booking-submit-btn"
                disabled={submitting}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors shadow-md shadow-blue-200 mt-2"
              >
                {submitting ? "Sending…" : "Request Appointment →"}
              </button>

              <p className="text-center text-xs text-slate-400">
                By submitting this form you agree to our{" "}
                <a href="#privacy" className="text-blue-400 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
