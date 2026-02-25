import { redirect } from "next/navigation";

import { defaultLocale, hasLocale } from "@/lib/i18n/config";

export default async function PaymentStatusPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const success = query.success === "true";
  const langParam = typeof query.lang === "string" ? query.lang : "";
  const lang = hasLocale(langParam) ? langParam : defaultLocale;

  redirect(`/${lang}/payments/status?success=${success ? "true" : "false"}`);
}