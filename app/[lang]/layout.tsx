import { notFound } from "next/navigation";

import { hasLocale, locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export default async function LangLayout({
  children,
  params,
  // eslint-disable-next-line
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  return <>{children}</>;
}
