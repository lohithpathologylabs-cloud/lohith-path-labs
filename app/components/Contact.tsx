export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Get in Touch With{" "}
            <span className="gradient-text">Our Team</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Have questions or ready to book? Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — Contact Info */}
          <div className="space-y-6">
            {/* Phone */}
            <a
              href="tel:+919182147180"
              className="flex items-center gap-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white p-5 rounded-2xl card-hover group"
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-blue-100 text-xs font-medium uppercase tracking-wide mb-1">Call Us Anytime</div>
                <div className="text-xl font-bold">+91 91821 47180</div>
                <div className="text-blue-200 text-sm">Available Mon – Sat, 7AM – 8PM</div>
              </div>
              <svg className="w-5 h-5 ml-auto opacity-60 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919182147180?text=Hello%2C%20I%20want%20to%20book%20a%20test%20at%20Lohith%20Path%20Labs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-5 rounded-2xl card-hover group"
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <div className="text-green-100 text-xs font-medium uppercase tracking-wide mb-1">WhatsApp Us</div>
                <div className="text-xl font-bold">Book via WhatsApp</div>
                <div className="text-green-200 text-sm">Instant booking confirmation</div>
              </div>
              <svg className="w-5 h-5 ml-auto opacity-60 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/lohithpathlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white p-5 rounded-2xl card-hover group"
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <div className="text-pink-100 text-xs font-medium uppercase tracking-wide mb-1">Follow Us</div>
                <div className="text-xl font-bold">@lohithpathlabs</div>
                <div className="text-pink-200 text-sm">Updates & health tips</div>
              </div>
              <svg className="w-5 h-5 ml-auto opacity-60 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Location */}
            <div className="flex items-start gap-5 bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">Our Location</div>
                <div className="text-lg font-bold text-slate-900">Hussainpur, Medak</div>
                <div className="text-slate-500 text-sm">Telangana, India</div>
              </div>
            </div>
          </div>

          {/* Right — Map + Hours */}
          <div className="space-y-6">
            {/* Map Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30459.756398!2d77.9!3d17.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbe4f9e22b0f3b%3A0x0!2sMedak%2C%20Telangana!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lohith Path Labs Location"
              />
            </div>

            {/* Hours */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Working Hours
              </h3>
              <div className="space-y-3">
                {[
                  { day: "Monday – Friday", time: "7:00 AM – 8:00 PM", open: true },
                  { day: "Saturday", time: "7:00 AM – 6:00 PM", open: true },
                  { day: "Sunday", time: "8:00 AM – 2:00 PM", open: true },
                ].map((row) => (
                  <div key={row.day} className="flex items-center justify-between py-2 border-b border-slate-200 last:border-0">
                    <span className="text-slate-700 text-sm font-medium">{row.day}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900 text-sm font-semibold">{row.time}</span>
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <p className="text-blue-700 text-xs font-medium">
                  💡 Home collection available all days — call to schedule!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
