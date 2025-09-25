export const locales = ["zh", "en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  zh: "中文",
  en: "English",
  fr: "Français",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function getTranslations(locale: Locale) {
  try {
    const translations = await import(`./locales/${locale}.json`);
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for ${locale}`, error);

    const fallback = await import(`./locales/${defaultLocale}.json`);
    return fallback.default;
  }
}
