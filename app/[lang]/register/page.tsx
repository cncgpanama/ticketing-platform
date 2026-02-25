import { notFound } from "next/navigation";

import { RegistrationFlow } from "@/components/registration-flow";
import { getTicketTiers } from "@/lib/actions/ticket.actions";
import { environment } from "@/lib/constants/environment";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function RegisterPage({
  params,
  // eslint-disable-next-line
}: PageProps<"/[lang]/register">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const ticketTypes = await getTicketTiers();
  const dictionary = await getDictionary(lang);

  return (
    <RegistrationFlow
      lang={lang}
      dictionary={dictionary.registration}
      ticketTiers={ticketTypes}
      attendeInitialData={environment.ATTENDEE_FORM_FIELDS}
    />
  );
}
