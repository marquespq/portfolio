import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en } from "./locales/en";
import { pt } from "./locales/pt";

export type Locale = "en" | "pt";
export type Content = typeof en;

const dictionaries: Record<Locale, Content> = { en, pt };

interface LanguageContextValue {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: Content;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Locale>(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "pt") return saved;
    return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
  });

  useEffect(() => {
    const t = dictionaries[lang];
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
