"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher({ currentLocale, translations }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-lg font-semibold"
      >
        {translations.nav.language}
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white border-2 border-black min-w-[100px] z-50">
          <button
            onClick={() => changeLanguage("zh")}
            className="dropdown-item block w-full text-center px-4 py-2 text-base"
          >
            {translations.languages.zh}
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className="dropdown-item block w-full text-center px-4 py-2 text-base"
          >
            {translations.languages.en}
          </button>
          <button
            onClick={() => changeLanguage("fr")}
            className="dropdown-item block w-full text-center px-4 py-2 text-base"
          >
            {translations.languages.fr}
          </button>
        </div>
      )}
    </div>
  );
}
