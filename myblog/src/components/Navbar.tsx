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
    <div className="flex justify-end items-center px-6 py-5 gap-6">
      <LanguageSwitcher currentLocale={locale} translations={translations} />
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={`/${locale}/sign-in`} className="text-lg font-semibold">
          {translations.nav.signIn}
        </Link>
      )}
    </div>
  );
}
