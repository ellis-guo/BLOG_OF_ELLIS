"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import LanguageSwitcher from "./LanguageSwitcher";
import { siteConfig } from "@/config/site";

interface NavbarProps {
  locale: string;
  translations: any;
}

export default function Navbar({ locale, translations }: NavbarProps) {
  const { isSignedIn } = useUser();

  return (
    <div className="max-w-[1024px] min-w-[300px] mx-auto px-0 pt-5">
      <header className="border-t-[3px] border-t-black border-b border-b-[#ccc] min-h-[78px] mb-2.5">
        <div className="flex flex-wrap justify-center md:justify-between items-center min-h-[78px] px-5 gap-4">
          <h1 className="logo m-0 whitespace-nowrap w-full md:w-auto text-center md:text-left">
            <Link href={`/${locale}`}>{siteConfig.name}</Link>
          </h1>

          <nav className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center list-none m-0 p-0 gap-6 items-center font-semibold">
              <li>
                <Link href={`/${locale}/about`}>{translations.nav.about}</Link>
              </li>
              <li>
                <Link href={`/${locale}/projects`}>
                  {translations.nav.projects}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`}>{translations.nav.blog}</Link>
              </li>

              <li>
                <LanguageSwitcher
                  currentLocale={locale}
                  translations={translations}
                />
              </li>

              <li>
                {isSignedIn ? (
                  <UserButton />
                ) : (
                  <Link href={`/${locale}/sign-in`}>
                    {translations.nav.signIn}
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
