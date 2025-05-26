import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
function Header() {
  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo Name */}
          <div className="text-xl font-semibold">DevConnect</div>

          {/* Right side - Menu Items */}
          <nav className="space-x-6 hidden md:flex">
            <Link href="/" className="hover:text-gray-300 transition">
              Home
            </Link>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
          </nav>

          <div className="md:hidden"></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
