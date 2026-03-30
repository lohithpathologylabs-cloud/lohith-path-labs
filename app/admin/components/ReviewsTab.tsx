"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, type Review } from "@/lib/supabase";

const MAX_REVIEWS = 6;
const emptyForm = { name: "", location: "", text: "", rating: "5", test_name: "" };

export default function ReviewsTab() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [nameError, setNameError] = useState("");

  const fetchReviews = useCallback(async () => {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    setReviews((data as Review[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (/[0-9]/.test(form.name)) {
      setNameError("Name should not contain numbers");
      return;
    }
    setSaving(true);
    await supabase.from("reviews").insert({
      name: form.name,
      location: form.location,
      text: form.text,
      rating: parseInt(form.rating),
      test_name: form.test_name || null,
    });
    setSaving(false);
    setShowForm(false);
    setForm(emptyForm);
    setNameError("");
    fetchReviews();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this review?")) return;
    await supabase.from("reviews").delete().eq("id", id);
    fetchReviews();
  }

  if (loading) return <div className="text-center py-20 text-slate-400">Loading reviews...</div>;

  return (
    <div>
      {/* Add Form */}
      {showForm ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <h3 className="font-bold text-slate-900 text-lg mb-4">Add Review</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Patient Name <span className="text-red-400">*</span></label>
                <input type="text" required value={form.name}
                  onChange={(e) => { const v = e.target.value.replace(/[0-9]/g, ""); setForm((p) => ({ ...p, name: v })); setNameError(v !== e.target.value ? "Name should not contain numbers" : ""); }}
                  placeholder="e.g. Ravi Kumar"
                  className={`w-full border rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${nameError ? "border-red-400" : "border-slate-200"}`} />
                {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Location <span className="text-red-400">*</span></label>
                <input type="text" required value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                  placeholder="e.g. Medak"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Test Name (optional)</label>
                <input type="text" value={form.test_name} onChange={(e) => setForm((p) => ({ ...p, test_name: e.target.value }))}
                  placeholder="e.g. Blood Test"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Rating</label>
                <select value={form.rating} onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {[5, 4, 3].map((r) => <option key={r} value={r}>{"⭐".repeat(r)} ({r}/5)</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Review Text <span className="text-red-400">*</span></label>
              <textarea required rows={3} value={form.text} onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
                placeholder="What did the patient say?"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
                {saving ? "Saving..." : "Add Review"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setForm(emptyForm); setNameError(""); }}
                className="border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold px-6 py-2.5 rounded-xl transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowForm(true)}
            disabled={reviews.length >= MAX_REVIEWS}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Review
          </button>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${reviews.length >= MAX_REVIEWS ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
            {reviews.length} / {MAX_REVIEWS}
          </span>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-200">
          No reviews added yet. Hardcoded reviews will show on the website.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900">{r.name}</span>
                    <span className="text-slate-400 text-xs">· {r.location}</span>
                    {r.test_name && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{r.test_name}</span>}
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm">"{r.text}"</p>
                </div>
                <button onClick={() => handleDelete(r.id)}
                  className="text-slate-300 hover:text-red-400 transition-colors p-1 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
