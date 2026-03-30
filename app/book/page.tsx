import type { Metadata } from "next";
import BookForm from "./BookForm";

export const metadata: Metadata = {
  title: "Book a Test",
  description:
    "Book a blood test, thyroid panel, ECG or any diagnostic test at Lohith Path Labs, Medak. Walk-in or home sample collection available.",
  alternates: { canonical: "https://lohith-advanced-pathlabs.vercel.app/book" },
};

export default function BookPage() {
  return <BookForm />;
}
