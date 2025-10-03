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
      <header className="border-t-[3px] border-t-black border-b border-b-[#ccc] h-[78px] mb-2.5">
        <div className="flex justify-between items-center h-full px-5">
          <h1 className="logo m-0">
            <Link
              href={`/${locale}`}
              className="text-black no-underline hover:text-[#F35029] transition-colors duration-200"
            >
              {siteConfig.name}
            </Link>
          </h1>

          <nav>
            <ul className="flex list-none m-0 p-0 gap-6 items-center font-semibold">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-black no-underline hover:text-[#F35029] transition-colors duration-200"
                >
                  {translations.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/projects`}
                  className="text-black no-underline hover:text-[#F35029] transition-colors duration-200"
                >
                  {translations.nav.projects}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/blog`}
                  className="text-black no-underline hover:text-[#F35029] transition-colors duration-200"
                >
                  {translations.nav.blog}
                </Link>
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
                  <Link
                    href="/sign-in"
                    className="text-black no-underline hover:text-[#F35029] transition-colors duration-200"
                  >
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
