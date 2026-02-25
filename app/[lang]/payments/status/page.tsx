import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function PaymentStatusPage({
  params,
  searchParams,
  // eslint-disable-next-line
}: PageProps<"/[lang]/payments/status">) {
  const { lang } = await params;
  const query = await searchParams;

  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);
  const success = query.success === "true";
  const message = success
    ? dictionary.payments.status.successMessage
    : dictionary.payments.status.failureMessage;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        {success ? (
          <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-green-500" />
        ) : (
          <XCircle className="mx-auto mb-6 h-16 w-16 text-red-500" />
        )}

        <h1
          className={`mb-2 text-2xl font-bold ${success ? "text-green-700" : "text-red-700"}`}
        >
          {success
            ? dictionary.payments.status.successTitle
            : dictionary.payments.status.failureTitle}
        </h1>

        <p className="mb-8 text-gray-600">{message}</p>

        <Link
          href={`/${lang}`}
          className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {dictionary.payments.status.returnHome}
        </Link>
      </div>
    </div>
  );
}
