import Link from "next/link";
import type { SanityClinic, SanityDentist, SanityService } from "@/types/dental-types";

interface SiteFooterProps {
  clinic?: SanityClinic | null;
  services?: SanityService[];
  dentist?: SanityDentist | null;
}

export function SiteFooter({ clinic, services, dentist }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();
  const name = clinic?.name || "DentalFlow";
  const phone = clinic?.phone;
  const email = clinic?.email;
  const street = clinic?.address?.street;
  const city = clinic?.address?.city;
  const state = clinic?.address?.state;
  const zip = clinic?.address?.zip;
  const phoneHref = phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : null;
  const hasAddress = street || city || state || zip;

  const quickLinks = [
    { label: dentist?.name ? `About ${dentist.name}` : "About Us", href: "#about" },
    { label: "Patient Reviews", href: "#reviews" },
    { label: "Location & Hours", href: "#contact" },
    { label: "Book Appointment", href: "#booking" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <footer className="bg-slate-900 text-white" id="footer" aria-label="Site footer">
      {/* Pre-footer CTA strip */}
      <div className="bg-blue-500 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xl font-extrabold text-white">Ready for a healthier smile?</p>
            <p className="text-blue-100 text-sm mt-1">
              New patients welcome{clinic?.emergencyNotice ? ` · ${clinic.emergencyNotice}` : ""}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {phone && phoneHref && (
              <a
                href={phoneHref}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/30"
                aria-label={`Call ${phone}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                </svg>
                {phone}
              </a>
            )}
            <Link
              href="#booking"
              className="flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform shadow"
            >
              Book Online
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
                <path d="M12 2C8.5 2 6 4.5 6 6c0 1 .4 2 1 2.8C5.7 9.8 5 11.3 5 13c0 3.3 2.7 7 5 8.5.4.3.7.5 1 .5.3 0 .6-.2 1-.5C14.3 20 17 16.3 17 13c0-1.7-.7-3.2-2-4.2.6-.8 1-1.8 1-2.8 0-2.5-2.5-4-4-4z" />
              </svg>
            </div>
            <div>
              <p className="text-base font-bold text-white leading-none">{name}</p>
              {city && state && (
                <p className="text-xs text-slate-400 leading-none mt-0.5">{city}, {state}</p>
              )}
            </div>
          </div>
          {hasAddress && (
            <address className="not-italic text-slate-400 text-sm leading-relaxed mb-4">
              {street && <>{street}<br /></>}
              {[city, state].filter(Boolean).join(", ")} {zip}
            </address>
          )}
          {phone && phoneHref && (
            <a
              href={phoneHref}
              className="block text-blue-400 font-semibold text-sm hover:text-blue-300"
              aria-label={`Phone number ${phone}`}
            >
              {phone}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="block text-slate-400 text-sm hover:text-white mt-1"
            >
              {email}
            </a>
          )}
        </div>

        {/* Services */}
        {services && services.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 6).map((s) => (
                <li key={s._id}>
                  <Link
                    href={`#service-card-${s._id}`}
                    className="text-slate-400 text-sm hover:text-white transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-slate-400 text-sm hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours & Social */}
        <div>
          {clinic?.hours && clinic.hours.length > 0 && (
            <>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Office Hours</h3>
              <ul className="space-y-2 text-slate-400 text-sm mb-6">
                {clinic.hours.map(({ day, time }) => (
                  <li key={day} className="flex justify-between gap-4">
                    <span>{day}</span>
                    <span className={time.toLowerCase().includes("emergency") ? "text-red-400" : "text-white"}>
                      {time}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
          <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Follow Us</h3>
          <div className="flex gap-3">
            {[
              {
                name: "Facebook",
                href: "#",
                path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
              },
              {
                name: "Instagram",
                href: "#",
                path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5a1 1 0 1 0 1 1 1 1 0 0 0-1-1zM21 8a9 9 0 0 0-9-9 9 9 0 0 0 9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9z",
              },
            ].map(({ name, href, path }) => (
              <a
                key={name}
                href={href}
                className="w-9 h-9 rounded-full bg-slate-700 hover:bg-blue-500 flex items-center justify-center transition-colors"
                aria-label={`Follow us on ${name}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar — NAP + legal */}
      <div className="border-t border-slate-800 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {currentYear} {name}
            {hasAddress && ` · ${[street, city, state, zip].filter(Boolean).join(", ")}`}
            {phone && ` · ${phone}`}
          </p>
          <div className="flex items-center gap-4">
            <a href="#privacy" id="footer-privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#hipaa" id="footer-hipaa" className="hover:text-white transition-colors">
              HIPAA Notice
            </a>
            <span>·</span>
            <a href="#terms" id="footer-terms" className="hover:text-white transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
