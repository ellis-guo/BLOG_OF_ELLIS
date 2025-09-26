"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher({ currentLocale, translations }: any) {
  console.log("LanguageSwitcher rendered!", currentLocale, translations);

  // Control dropdown menu state, closed by default
  const [isOpen, setIsOpen] = useState(false);

  // It's Next.js router to change pages
  const router = useRouter();

  // Get current page path ("/en/blog")
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    // "/en/blog" → "/zh/blog"
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Language button */}
      <button onClick={() => setIsOpen(!isOpen)}>
        {translations.nav.language}
      </button>

      {/* Dropdown menu - only shows when isOpen is true */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow">
          <button
            onClick={() => changeLanguage("zh")}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            {translations.languages.zh}
          </button>
          {/* English option - always shows "English" */}
          <button
            onClick={() => changeLanguage("en")}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            {translations.languages.en}
          </button>
          {/* French option - always shows "Français" */}
          <button
            onClick={() => changeLanguage("fr")}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            {translations.languages.fr}
          </button>
        </div>
      )}
    </div>
  );
}
