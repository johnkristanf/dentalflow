import type { SanityClinic } from "@/lib/sanity";

interface InfoSectionProps {
  clinic?: SanityClinic | null;
}

export function InfoSection({ clinic }: InfoSectionProps) {
  if (!clinic) return null;

  const hasAddress =
    clinic.address?.street ||
    clinic.address?.city ||
    clinic.address?.state ||
    clinic.address?.zip;
  const hasHours = clinic.hours && clinic.hours.length > 0;
  const hasInsurances = clinic.insurances && clinic.insurances.length > 0;
  const phoneHref = clinic.phone ? `tel:${clinic.phone.replace(/[^+\d]/g, "")}` : null;

  // If there's no practical info available from CMS, skip the section
  if (!hasAddress && !hasHours && !hasInsurances && !clinic.phone) return null;

  const mapQuery = hasAddress
    ? encodeURIComponent(
        [clinic.name, clinic.address?.street, clinic.address?.city, clinic.address?.state, clinic.address?.zip]
          .filter(Boolean)
          .join(", ")
      )
    : null;

  return (
    <section id="contact" className="py-20 bg-white" aria-labelledby="info-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-500 font-semibold text-sm uppercase tracking-widest mb-3">
            Practical Information
          </span>
          <h2 id="info-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Everything You Need to Know Before You Visit
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            No surprises — here are the details that matter most when choosing your dental home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">

          {/* Location */}
          {hasAddress && (
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-blue-500 px-5 py-4 flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <h3 className="font-bold text-white">Location</h3>
              </div>
              <div className="p-5">
                <address className="not-italic text-slate-700 text-sm leading-relaxed mb-4">
                  {clinic.name && <strong>{clinic.name}<br /></strong>}
                  {clinic.address?.street && <>{clinic.address.street}<br /></>}
                  {[clinic.address?.city, clinic.address?.state].filter(Boolean).join(", ")}{" "}
                  {clinic.address?.zip}
                </address>
                {/* Directions link */}
                {mapQuery && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-blue-500 text-sm font-semibold flex items-center gap-1 hover:underline"
                    aria-label={`Get directions to ${clinic.name || "clinic"}`}
                  >
                    Get Directions →
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Hours */}
          {hasHours && (
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-blue-500 px-5 py-4 flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                </svg>
                <h3 className="font-bold text-white">Office Hours</h3>
              </div>
              <div className="p-5">
                <ul className="space-y-3">
                  {clinic.hours!.map(({ day, time }) => (
                    <li key={day} className="flex items-start justify-between gap-4 text-sm pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                      <span className="text-slate-600 font-medium">{day}</span>
                      <span className={`font-semibold flex-shrink-0 ${time.toLowerCase().includes("emergency") ? "text-red-500" : "text-slate-900"}`}>
                        {time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* New patient info & financing */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-blue-500 px-5 py-4 flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              <h3 className="font-bold text-white">New Patients</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-sm font-bold text-slate-900 mb-1.5">First Visit Includes</p>
                <ul className="space-y-1">
                  {[
                    "Comprehensive oral exam",
                    "Digital X-rays (if needed)",
                    "Personalised treatment plan",
                    "No-pressure consultation",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <p className="text-sm font-bold text-slate-900 mb-1.5">Payment &amp; Financing</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We accept most major dental insurances and offer flexible financing options for larger treatments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance logos / tags */}
        {hasInsurances && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5 text-center">Insurance We Accept</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {clinic.insurances!.map((ins) => (
                <span
                  key={ins}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-full"
                >
                  {ins}
                </span>
              ))}
            </div>
            {clinic.phone && phoneHref && (
              <p className="text-center text-slate-400 text-sm mt-4">
                Don&apos;t see yours?{" "}
                <a href={phoneHref} className="text-blue-500 font-semibold hover:underline">
                  Call us at {clinic.phone} — we&apos;ll verify in minutes.
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
