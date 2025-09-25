"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar({ locale }: { locale: string }) {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link href={`/${locale}`} className="text-2xl font-bold">
          Ellis Guo
        </Link>

        <div className="flex items-center gap-8">
          <Link href={`/${locale}/about`}>About</Link>
          <Link href={`/${locale}/projects`}>Projects</Link>
          <Link href={`/${locale}/blog`}>Blog</Link>

          {isSignedIn ? <UserButton /> : <Link href="/sign-in">Sign In</Link>}
        </div>
      </div>
    </nav>
  );
}
