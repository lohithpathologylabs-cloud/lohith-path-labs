import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type Test = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  category: string | null;
  is_active: boolean;
  created_at: string;
};

export type Booking = {
  id: string;
  patient_name: string;
  phone: string;
  email: string | null;
  test_id: string | null;
  test_name: string;
  collection_type: "home" | "walkin";
  preferred_date: string | null;
  status: "pending" | "report_sent" | "completed";
  notes: string | null;
  created_at: string;
};

export type Report = {
  id: string;
  booking_id: string;
  file_path: string;
  file_url: string;
  expires_at: string;
  created_at: string;
};
