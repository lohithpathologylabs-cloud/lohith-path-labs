"use client";

import { useEffect, useState } from "react";
import { supabase, type Test } from "@/lib/supabase";

const CATEGORY_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  Blood:   { color: "from-red-500 to-rose-400",      bg: "bg-red-50",    border: "border-red-100" },
  Thyroid: { color: "from-purple-500 to-violet-400", bg: "bg-purple-50", border: "border-purple-100" },
  ECG:     { color: "from-pink-500 to-rose-400",     bg: "bg-pink-50",   border: "border-pink-100" },
  Allergy: { color: "from-yellow-500 to-orange-400", bg: "bg-yellow-50", border: "border-yellow-100" },
  Other:   { color: "from-blue-500 to-cyan-400",     bg: "bg-blue-50",   border: "border-blue-100" },
};

const DEFAULT_STYLE = { color: "from-teal-500 to-cyan-400", bg: "bg-teal-50", border: "border-teal-100" };

const INITIAL_COUNT = 6;

export default function Services() {
  const [tests, setTests] = useState<Test[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    supabase
      .from("tests")
      .select("*")
      .eq("is_active", true)
      .order("category")
      .order("name")
      .then(({ data }) => setTests((data as Test[]) || []));
  }, []);

  const visible = showAll ? tests : tests.slice(0, INITIAL_COUNT);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Comprehensive Diagnostic{" "}
            <span className="gradient-text">Testing</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            From routine blood tests to specialized diagnostics — everything under one roof with unmatched accuracy.
          </p>
        </div>

        {/* Cards Grid */}
        {tests.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <p className="font-medium">Tests will appear here once added by the lab.</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((test) => {
                const style = CATEGORY_STYLES[test.category ?? ""] ?? DEFAULT_STYLE;
                return (
                  <div key={test.id} className={`${style.bg} border ${style.border} rounded-2xl p-6 card-hover flex flex-col`}>
                    {/* Category badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${style.color} text-white`}>
                        {test.category}
                      </span>
                      {test.price && (
                        <span className="text-lg font-bold text-slate-900">₹{test.price}</span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">{test.name}</h3>

                    {test.description && (
                      <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{test.description}</p>
                    )}

                    <div className="mt-auto pt-4">
                      <a
                        href={`/book?testId=${test.id}`}
                        className={`inline-flex items-center gap-2 bg-gradient-to-r ${style.color} text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-sm`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Book This Test
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {tests.length > INITIAL_COUNT && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 border-2 border-blue-200 text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
                >
                  {showAll ? (
                    <>Show Less <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></>
                  ) : (
                    <>Show More ({tests.length - INITIAL_COUNT} more) <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Not sure which test you need?</h3>
          <p className="text-blue-100 mb-6">Our experts are available to guide you — just give us a call or message on WhatsApp.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+919182147180" className="flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
            <a href="https://wa.me/919182147180?text=Hello%2C%20I%20need%20help%20selecting%20the%20right%20test" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
