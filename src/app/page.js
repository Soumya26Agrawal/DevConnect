import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1A1A2E] via-[#2F2F4E] to-[#3C1E5F] text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-opacity-50 backdrop-blur-md">
        <h1 className="text-md font-bold">Connect To World</h1>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Connect. Share. Grow.
        </h2>
        <p className="max-w-xl text-lg sm:text-xl mb-6 text-gray-200">
          Welcome to DveConnect, the professional social network designed to
          help you build meaningful connections, showcase your work, and
          discover new opportunities.
        </p>
        <Link
          href="/sign-in"
          className="px-8 py-3 bg-purple-600 rounded-full text-lg font-semibold hover:bg-purple-700 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-[#2A1A4B]">
        <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-[#3E2C6E] p-6 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-2xl font-semibold mb-2">
              Professional Profile
            </h4>
            <p className="text-gray-300">
              Create a detailed profile to highlight your skills, experience,
              and achievements.
            </p>
          </div>
          <div className="bg-[#3E2C6E] p-6 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-2xl font-semibold mb-2">
              Network & Collaborate
            </h4>
            <p className="text-gray-300">
              Connect with peers, join groups, and collaborate on projects
              seamlessly.
            </p>
          </div>
          <div className="bg-[#3E2C6E] p-6 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-2xl font-semibold mb-2">Share Updates</h4>
            <p className="text-gray-300">
              Post updates, articles, and media to share your insights with your
              network.
            </p>
          </div>
          <div className="bg-[#3E2C6E] p-6 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-2xl font-semibold mb-2">
              Discover Opportunities
            </h4>
            <p className="text-gray-300">
              Browse job postings, freelance gigs, and partnership opportunities
              in your field.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-opacity-50 backdrop-blur-md py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} DveConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
