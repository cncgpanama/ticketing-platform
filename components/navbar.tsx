"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n/config";

type NavbarDictionary = {
  links: Array<{ label: string; href: string }>;
  toggleMenuAriaLabel: string;
  languageLabel: string;
  languageOptions: {
    en: string;
    es: string;
  };
};

export function Navbar({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: NavbarDictionary;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const getPathWithoutLocale = (path: string) => {
    const segments = path.split("/");
    const maybeLocale = segments[1];

    if (!maybeLocale || !hasLocale(maybeLocale)) {
      return path;
    }

    const remainingPath = `/${segments.slice(2).join("/")}`;
    return remainingPath === "/" ? "/" : remainingPath.replace(/\/$/, "");
  };

  const handleLocaleChange = (nextLocale: Locale) => {
    const pathWithoutLocale = getPathWithoutLocale(pathname);
    const nextPath =
      pathWithoutLocale === "/"
        ? `/${nextLocale}`
        : `/${nextLocale}${pathWithoutLocale}`;
    const currentHash = window.location.hash;

    router.push(`${nextPath}${currentHash}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            <span className="text-lg font-bold">C</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            CNCG Panama Ticker
          </span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8">
          <ul className="flex items-center gap-6">
            {dictionary.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${lang}${link.href}`}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{dictionary.languageLabel}</span>
              <select
                className="rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground"
                value={lang}
                onChange={(event) =>
                  handleLocaleChange(event.target.value as Locale)
                }
                aria-label={dictionary.languageLabel}
              >
                <option value="en">{dictionary.languageOptions.en}</option>
                <option value="es">{dictionary.languageOptions.es}</option>
              </select>
            </label>
          </div>
        </nav>

        <button
          type="button"
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={dictionary.toggleMenuAriaLabel}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col gap-4 py-4">
            {dictionary.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${lang}${link.href}`}
                  className="block text-base font-medium text-foreground transition-colors hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            <label className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{dictionary.languageLabel}</span>
              <select
                className="rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground"
                value={lang}
                onChange={(event) =>
                  handleLocaleChange(event.target.value as Locale)
                }
                aria-label={dictionary.languageLabel}
              >
                <option value="en">{dictionary.languageOptions.en}</option>
                <option value="es">{dictionary.languageOptions.es}</option>
              </select>
            </label>
          </div>
        </div>
      )}
    </header>
  );
}
