const steps = [
  {
    step: "01",
    title: "Book Your Test",
    description: "Call us or send a WhatsApp message with the test you need. Our team will confirm your booking instantly.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Sample Collection",
    description: "Visit our lab or opt for our free home collection service. Our trained phlebotomist collects your sample safely.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Lab Analysis",
    description: "Your samples are analyzed using advanced equipment in our certified lab by experienced professionals.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Get Your Report",
    description: "Reports are delivered directly to your WhatsApp within 24 hours. Share easily with your doctor anytime.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Get Your Results in{" "}
            <span className="gradient-text">4 Simple Steps</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            We've made the process as simple and stress-free as possible — from booking to report delivery.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              {/* Step Number + Icon */}
              <div className="relative mb-5">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-slate-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {step.step}
                </div>
              </div>

              {/* Connector line (hidden on last item) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(25%*{i}+12.5%+2rem)] w-[calc(25%-4rem)] h-0.5 bg-gradient-to-r from-blue-400 to-cyan-300" />
              )}

              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Connector lines for desktop */}
        <div className="hidden lg:flex justify-between px-20 -mt-24 mb-16 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 mx-4 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-300 mt-8 opacity-40" />
          ))}
        </div>

        {/* Book Now Banner */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4 text-lg">Ready to get started? Book your test now!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919182147180?text=Hello%2C%20I%20want%20to%20book%20a%20test"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-lg shadow-green-200 hover:shadow-green-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Book on WhatsApp
            </a>
            <a
              href="tel:+919182147180"
              className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3.5 rounded-full transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
