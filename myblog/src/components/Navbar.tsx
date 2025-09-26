"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavbarProps {
  locale: string;
  translations: any;
}

export default function Navbar({ locale, translations }: NavbarProps) {
  const { isSignedIn } = useUser();

  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo/Home link */}
        <Link href={`/${locale}`} className="text-2xl font-bold">
          Ellis Guo
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-8">
          <Link href={`/${locale}/about`}>{translations.nav.about}</Link>
          <Link href={`/${locale}/projects`}>{translations.nav.projects}</Link>
          <Link href={`/${locale}/blog`}>{translations.nav.blog}</Link>

          {/* Language switcher */}
          <LanguageSwitcher
            currentLocale={locale}
            translations={translations}
          />

          {/* User authentication */}
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href="/sign-in">{translations.nav.signIn}</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
