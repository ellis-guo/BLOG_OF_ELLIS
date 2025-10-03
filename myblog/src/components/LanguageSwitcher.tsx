"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher({ currentLocale, translations }: any) {
  // Control dropdown open/close state
  const [isOpen, setIsOpen] = useState(false);

  // Next.js router to change pages
  const router = useRouter();

  // Get current page path (e.g., "/en/blog")
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    // Replace current language in URL with new language
    // Example: "/en/blog" becomes "/zh/blog"
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative">
      {/* Language button - shows "Language" / "语言" / "Langue" */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        {translations.nav.language}
      </button>

      {/* Dropdown menu - only shows when isOpen is true */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg min-w-[120px]">
          {/* Chinese option - always shows "中文" */}
          <button
            onClick={() => changeLanguage("zh")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {translations.languages.zh}
          </button>
          {/* English option - always shows "English" */}
          <button
            onClick={() => changeLanguage("en")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {translations.languages.en}
          </button>
          {/* French option - always shows "Français" */}
          <button
            onClick={() => changeLanguage("fr")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {translations.languages.fr}
          </button>
        </div>
      )}
    </div>
  );
}
