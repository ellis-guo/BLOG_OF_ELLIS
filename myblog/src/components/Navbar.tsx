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
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center px-6 py-5 gap-6 ">
      <LanguageSwitcher currentLocale={locale} translations={translations} />
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={`/${locale}/sign-in`} className="text-lg font-semibold">
          {translations.nav.signIn}
        </Link>
      )}
    </nav>
  );
}
