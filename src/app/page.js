import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Welcome to <span className="text-blue-600">NextNotes</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          The simple and elegant way to manage your notes
        </p>
        
        {/* Hero CTA */}
        <div className="mt-8 flex justify-center">
          <Link href="/dashboard">
            <Button size="large" className="px-8 py-3 text-lg">
              Try Notes App Now
            </Button>
          </Link>
        </div>
        
        {/* App Screenshot/Mock */}
        <div className="mt-12 rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-white p-4 border-b border-gray-200 text-left font-medium">
            NextNotes Interface
          </div>
          <div className="flex h-64 bg-gray-50">
            <div className="w-1/3 border-r border-gray-200 bg-white">
              <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                <div className="font-medium">Notes</div>
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">+</div>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="p-3 bg-blue-50">
                  <div className="font-medium">Meeting Notes</div>
                  <div className="text-sm text-gray-500 truncate">Project timeline discussion...</div>
                </div>
                <div className="p-3">
                  <div className="font-medium">Shopping List</div>
                  <div className="text-sm text-gray-500 truncate">Groceries for dinner...</div>
                </div>
                <div className="p-3">
                  <div className="font-medium">Ideas</div>
                  <div className="text-sm text-gray-500 truncate">New features for the app...</div>
                </div>
              </div>
            </div>
            <div className="w-2/3 bg-white p-4">
              <div className="font-medium text-lg mb-3">Meeting Notes</div>
              <div className="text-gray-600 text-sm">
                <p>Project timeline discussion with the team:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Design phase: 2 weeks</li>
                  <li>Development: 4 weeks</li>
                  <li>Testing: 1 week</li>
                  <li>Launch: October 15th</li>
                </ul>
                <p className="mt-2">Follow up with Sarah about the design resources.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Organize Your Thoughts</h2>
            <p className="text-gray-600 mb-6">
              Create, edit, and organize your notes in one place. Access them anytime, anywhere.
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intuitive Interface</h2>
            <p className="text-gray-600 mb-6">
              Familiar two-column layout makes it easy to browse and edit notes instantly.
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/dashboard">
            <Button size="large">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="large">Sign In</Button>
          </Link>
        </div>
        
        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
          <ul className="text-left space-y-3">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Simple two-column interface like Mac Notes app</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Create and edit notes instantly</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Search through your notes quickly</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Secure cloud storage with privacy protection (coming soon)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
