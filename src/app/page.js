import Link from 'next/link';
import { Button } from "@/components/ui/button";
import TryAppButton from "@/components/TryAppButton.jsx";
//mport { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Your Notes,{" "}
              <span className="text-blue-600">Organized and Secure</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              NextNotes helps you capture your thoughts, organize your ideas, and
              access them from anywhere. Built with Next.js and Supabase for
              maximum performance and security.
            </p>
            <div className="space-x-4">
              <TryAppButton />
              <Link
                href="/signup"
                className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 text-lg"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 NextNotes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
