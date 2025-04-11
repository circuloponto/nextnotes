import Link from 'next/link';
import TryAppButton from "@/components/TryAppButton.jsx";
import { ThemeToggle } from "@/components/ThemeToggle";

// Mark the page as static
export const dynamic = 'force-static';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Your Notes,{" "}
              <span className="text-foreground">Organized and Secure</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              NextNotes helps you capture your thoughts, organize your ideas, and
              access them from anywhere. Built with Next.js and Supabase for
              maximum performance and security.
            </p>
            <div className="space-x-4 mb-16">
              <TryAppButton />
              <Link
                href="/signup"
                className="inline-block bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 text-lg"
              >
                Sign Up
              </Link>
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-left p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Rich Text Editing</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create beautiful notes with our powerful rich text editor. Format text,
                  add lists, and more.
                </p>
              </div>
              <div className="text-left p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Smart Organization</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Keep your notes organized with tags, folders, and powerful search
                  capabilities.
                </p>
              </div>
              <div className="text-left p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Secure Storage</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your notes are encrypted and securely stored. Access them from any
                  device, anytime.
                </p>
              </div>
            </div>

            {/* How It Works Section */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold mb-8">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white dark:bg-gray-200 text-black dark:text-gray-900 rounded-full flex items-center justify-center text-xl font-bold mb-4 border border-gray-200 dark:border-gray-700">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Create your free account in seconds
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white dark:bg-gray-200 text-black dark:text-gray-900 rounded-full flex items-center justify-center text-xl font-bold mb-4 border border-gray-200 dark:border-gray-700">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Create Notes</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start writing and organizing your thoughts
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white dark:bg-gray-200 text-black dark:text-gray-900 rounded-full flex items-center justify-center text-xl font-bold mb-4 border border-gray-200 dark:border-gray-700">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Access Anywhere</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your notes sync across all your devices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 NextNotes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 