"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils'; 

const navItems = [
  { label: 'Library', href: '/' },
  { label: 'Add New', href: '/books/new' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <header className="w-full fixed z-50 bg-[#fdfbf7] border-b border-gray-200">
      <div className="wrapper h-20 flex justify-between items-center py-4">
        {/* Logo Section */}
        <Link href="/" className="flex gap-2 items-center">
          <Image 
            src="/assets/logo.png" 
            alt="Bookified Logo" 
            width={42} 
            height={26} 
          />
          <span className="font-bold text-xl hidden sm:block font-serif tracking-tight">
            Bookified
          </span>
        </Link>
        
        {/* Navigation Links */}
        <nav className="flex items-center gap-7">
          <div className="flex gap-7 items-center w-fit">
            {navItems.map(({ label, href }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              
              return (
                <Link 
                  key={label} 
                  href={href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:opacity-70",
                    isActive ? "text-black font-semibold border-b-2 border-black pb-1" : "text-gray-600"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Authentication Section */}
          <div className="flex gap-4 items-center pl-4 border-l border-gray-300">
            <SignedIn>
              {user?.firstName && (
                <Link href="/subscriptions" className="text-sm font-medium hover:underline hidden sm:block">
                  {user.firstName}
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            
            <SignedOut>
              <Link href="/sign-in" className="bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                Sign In
              </Link>
            </SignedOut>
          </div>
        </nav>
      </div>
    </header>
  );
}