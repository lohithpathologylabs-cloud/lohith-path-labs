"use client";

import { useEffect, useState } from "react";
import { supabase, type GalleryPhoto } from "@/lib/supabase";

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [selected, setSelected] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setPhotos((data as GalleryPhoto[]) || []));
  }, []);

  if (photos.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Our Lab
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            A Glimpse Inside{" "}
            <span className="gradient-text">Lohith Path Labs</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Modern equipment, hygienic environment, and a dedicated team — all for your health.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelected(photo)}
              className="relative group rounded-2xl overflow-hidden cursor-pointer card-hover"
            >
              <img
                src={photo.image_url}
                alt={photo.caption || "Lab photo"}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                {photo.caption && (
                  <div className="w-full px-4 py-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium">{photo.caption}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 text-white hover:text-slate-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={selected.image_url} alt={selected.caption || "Lab photo"} className="w-full rounded-2xl" />
            {selected.caption && (
              <p className="text-white text-center mt-3 text-sm">{selected.caption}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
