import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">
          Welcome to <span className="text-primary">NextNotes</span>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
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
        <div className="mt-12 rounded-lg shadow-lg overflow-hidden border border-border">
          <div className="bg-card p-4 border-b border-border text-left font-medium text-card-foreground">
            NextNotes Interface
          </div>
          <div className="flex h-64 bg-muted">
            <div className="w-1/3 border-r border-border bg-card">
              <div className="p-3 border-b border-border flex justify-between items-center">
                <div className="font-medium text-card-foreground">Notes</div>
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">+</div>
              </div>
              <div className="divide-y divide-border">
                <div className="p-3 bg-primary/10">
                  <div className="font-medium text-card-foreground">Meeting Notes</div>
                  <div className="text-sm text-muted-foreground truncate">Project timeline discussion...</div>
                </div>
                <div className="p-3">
                  <div className="font-medium text-card-foreground">Shopping List</div>
                  <div className="text-sm text-muted-foreground truncate">Groceries for dinner...</div>
                </div>
                <div className="p-3">
                  <div className="font-medium text-card-foreground">Ideas</div>
                  <div className="text-sm text-muted-foreground truncate">New features for the app...</div>
                </div>
              </div>
            </div>
            <div className="w-2/3 bg-card p-4">
              <div className="font-medium text-lg mb-3 text-card-foreground">Meeting Notes</div>
              <div className="text-muted-foreground text-sm">
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
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">Organize Your Thoughts</h2>
            <p className="text-muted-foreground mb-6">
              Create, edit, and organize your notes in one place. Access them anytime, anywhere.
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">Intuitive Interface</h2>
            <p className="text-muted-foreground mb-6">
              Familiar two-column layout makes it easy to browse and edit notes instantly.
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        
        <div className="mt-12 p-6 bg-primary/10 rounded-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4">Features</h2>
          <ul className="text-left space-y-3">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-foreground">Simple two-column interface like Mac Notes app</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-foreground">Create and edit notes instantly</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-foreground">Search through your notes quickly</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-foreground">Secure cloud storage with privacy protection (coming soon)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
