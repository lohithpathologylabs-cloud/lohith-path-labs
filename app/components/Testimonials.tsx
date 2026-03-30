"use client";

import { useState, useEffect } from "react";
import { supabase, type Review } from "@/lib/supabase";

const testimonials = [
  {
    name: "Ravi Kumar",
    location: "Medak",
    text: "Excellent service! I booked a blood test on WhatsApp and they came home the next morning. Report was on my phone within 24 hours. Highly professional staff.",
    rating: 5,
    test: "Blood Test Package",
    avatar: "RK",
  },
  {
    name: "Lakshmi Devi",
    location: "Hussainpur",
    text: "Very accurate thyroid test results. The staff explained everything clearly. Price is very reasonable compared to other labs. Will definitely recommend to everyone.",
    rating: 5,
    test: "Thyroid Panel",
    avatar: "LD",
  },
  {
    name: "Suresh Reddy",
    location: "Medak",
    text: "My father is elderly and can't travel. Lohith Path Labs did home collection — no extra charge! The phlebotomist was very gentle. Reports came on WhatsApp same day.",
    rating: 5,
    test: "Home Collection",
    avatar: "SR",
  },
  {
    name: "Priya Sharma",
    location: "Telangana",
    text: "Fast ECG testing with immediate results. The technician was very skilled and the equipment is modern. Very clean lab, hygienic environment. Great experience overall.",
    rating: 5,
    test: "ECG Testing",
    avatar: "PS",
  },
  {
    name: "Mohammed Farhan",
    location: "Medak",
    text: "Best pathology lab in the area. Got allergy testing done for my son. The report was very detailed and helped our doctor diagnose correctly. Thank you Lohith Path Labs!",
    rating: 5,
    test: "Allergy Panel",
    avatar: "MF",
  },
  {
    name: "Anitha Goud",
    location: "Hussainpur",
    text: "Booked through WhatsApp and the process was so smooth. Staff is friendly, results are accurate, and pricing is fair. This is now our family's go-to lab!",
    rating: 5,
    test: "Full Body Checkup",
    avatar: "AG",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const INITIAL_COUNT = 2;

// Map DB reviews to same shape as hardcoded ones
function mapReview(r: Review) {
  const initials = r.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return { name: r.name, location: r.location, text: r.text, rating: r.rating, test: r.test_name || "", avatar: initials };
}

export default function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const [dbReviews, setDbReviews] = useState<typeof testimonials | null>(null);

  useEffect(() => {
    supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        const list = (data as Review[]) || [];
        setDbReviews(list.length > 0 ? list.map(mapReview) : []);
      });
  }, []);

  // Use DB reviews if any exist, else fall back to hardcoded
  const source = dbReviews && dbReviews.length > 0 ? dbReviews : testimonials;
  const visible = showAll ? source : source.slice(0, INITIAL_COUNT);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Patient Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            What Our Patients{" "}
            <span className="gradient-text">Say About Us</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Trusted by thousands of patients in Medak and surrounding areas. Here's what they have to say.
          </p>
          {/* Overall Rating */}
          <div className="inline-flex items-center gap-3 mt-6 bg-white border border-slate-200 rounded-full px-6 py-2.5 shadow-sm">
            <StarRating count={5} />
            <span className="font-bold text-slate-900">5.0</span>
            <span className="text-slate-400 text-sm">· 200+ Reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {visible.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 card-hover flex flex-col">
              {/* Quote Icon */}
              <svg className="w-8 h-8 text-blue-200 mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-4">"{t.text}"</p>

              {/* Tag */}
              <span className="inline-block text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded-full font-medium mb-4 w-fit">
                {t.test}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t.location}
                  </div>
                </div>
                <div className="ml-auto">
                  <StarRating count={t.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 border-2 border-blue-200 text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
          >
            {showAll ? (
              <>Show Less <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></>
            ) : (
              <>Show More Reviews <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
