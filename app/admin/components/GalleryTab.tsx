"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, type GalleryPhoto } from "@/lib/supabase";

const MAX_PHOTOS = 6;

export default function GalleryTab() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");

  const fetchPhotos = useCallback(async () => {
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    setPhotos((data as GalleryPhoto[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPhotos(); }, [fetchPhotos]);

  async function handleUpload(file: File) {
    if (photos.length >= MAX_PHOTOS) return;
    setUploading(true);

    const filePath = `${Date.now()}_${file.name.replace(/\s/g, "_")}`;
    const { error: uploadErr } = await supabase.storage.from("gallery").upload(filePath, file, { upsert: false });

    if (uploadErr) {
      alert("Upload failed: " + uploadErr.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(filePath);

    await supabase.from("gallery").insert({
      image_url: urlData.publicUrl,
      file_path: filePath,
      caption: caption || null,
    });

    setCaption("");
    setUploading(false);
    fetchPhotos();
  }

  async function handleDelete(photo: GalleryPhoto) {
    if (!confirm("Delete this photo?")) return;
    await supabase.storage.from("gallery").remove([photo.file_path]);
    await supabase.from("gallery").delete().eq("id", photo.id);
    fetchPhotos();
  }

  if (loading) return <div className="text-center py-20 text-slate-400">Loading gallery...</div>;

  return (
    <div>
      {/* Upload Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 text-lg">Gallery Photos</h3>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${photos.length >= MAX_PHOTOS ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
            {photos.length} / {MAX_PHOTOS} photos
          </span>
        </div>

        {photos.length >= MAX_PHOTOS ? (
          <p className="text-slate-500 text-sm">Maximum {MAX_PHOTOS} photos reached. Delete one to upload a new photo.</p>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Caption (optional)</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Our lab equipment, Staff at work..."
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <label className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl cursor-pointer transition-colors ${uploading ? "bg-slate-100 text-slate-400" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                  e.target.value = "";
                }}
              />
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {uploading ? "Uploading..." : "Upload Photo"}
            </label>
          </div>
        )}
      </div>

      {/* Photos Grid */}
      {photos.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-200">
          No photos uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-white">
              <img src={photo.image_url} alt={photo.caption || "Gallery"} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <button
                  onClick={() => handleDelete(photo)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              {photo.caption && (
                <div className="p-2 text-xs text-slate-500 truncate">{photo.caption}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
