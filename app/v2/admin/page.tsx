"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import LoginForm from "@/app/admin/components/LoginForm";
import V2BookingsTab from "./components/BookingsTab";
import TestsTab from "@/app/admin/components/TestsTab";
import GalleryTab from "@/app/admin/components/GalleryTab";
import ReviewsTab from "@/app/admin/components/ReviewsTab";
import BioTab from "@/app/admin/components/BioTab";
import UsersTab from "@/app/admin/components/UsersTab";

type Tab = "bookings" | "tests" | "gallery" | "reviews" | "profile" | "users";
type Role = "admin" | "staff";

const ADMIN_TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "bookings", label: "Bookings", icon: "📋" },
  { key: "tests",    label: "Tests",    icon: "🧪" },
  { key: "gallery",  label: "Gallery",  icon: "🖼️" },
  { key: "reviews",  label: "Reviews",  icon: "⭐" },
  { key: "profile",  label: "Profile",  icon: "👤" },
  { key: "users",    label: "Users",    icon: "🔐" },
];

const STAFF_TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "bookings", label: "Bookings", icon: "📋" },
];

export default function V2AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>("bookings");

  useEffect(() => {
    async function fetchRole(userId: string) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();
      setRole((profile?.role as Role) ?? "staff");
    }

    // Resolve immediately from local session — no waiting for network event
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      if (sessionUser) await fetchRole(sessionUser.id);
      setChecking(false);
    });

    // Keep listening for login / logout changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      if (sessionUser) {
        await fetchRole(sessionUser.id);
      } else {
        setRole(null);
      }
      setChecking(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (checking) {
    return (
      <div className="min-h-screen hero-bg flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) return <LoginForm />;

  const tabs = role === "admin" ? ADMIN_TABS : STAFF_TABS;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="hero-bg px-4 pt-6 pb-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-bold text-sm">Lohith Path Labs</div>
              <div className="text-blue-300 text-xs">Admin Panel</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-blue-200 text-sm">{user.email}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 ${
                role === "admin"
                  ? "bg-yellow-400/20 text-yellow-300"
                  : "bg-white/10 text-blue-200"
              }`}>
                {role === "admin" ? "Admin" : "Staff"}
              </span>
            </div>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-3 py-1.5 rounded-full transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {tabs.length > 1 && (
          <div className="max-w-5xl mx-auto mt-6 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-colors shrink-0 ${
                  tab === t.key ? "bg-white text-blue-700 shadow" : "bg-white/10 hover:bg-white/20 text-white"
                }`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-6 pb-16">
        {tab === "bookings" && <V2BookingsTab />}
        {tab === "tests"    && role === "admin" && <TestsTab />}
        {tab === "gallery"  && role === "admin" && <GalleryTab />}
        {tab === "reviews"  && role === "admin" && <ReviewsTab />}
        {tab === "profile"  && role === "admin" && <BioTab />}
        {tab === "users"    && role === "admin" && <UsersTab />}
      </div>
    </div>
  );
}
