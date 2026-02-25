import { notFound } from "next/navigation";

import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
// import { ScheduleSection } from "@/components/schedule-section";
// import { SpeakersSection } from "@/components/speakers-section";
// import { SponsorsSection } from "@/components/sponsors-section";
import { TicketWidget } from "@/components/ticket-widget";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale } from "@/lib/i18n/config";

// eslint-disable-next-line
export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar lang={lang} dictionary={dictionary.navbar} />

      <main className="relative isolate">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col gap-8 lg:col-span-8">
              <HeroSection dictionary={dictionary.hero} />

              <div className="space-y-16">
                <AboutSection dictionary={dictionary.about} />
                {/* To be considered in the */}
                {/* <SpeakersSection dictionary={dictionary.speakers} />
                <ScheduleSection dictionary={dictionary.schedule} />
                <SponsorsSection dictionary={dictionary.sponsors} /> */}
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <TicketWidget lang={lang} dictionary={dictionary.ticketWidget} />

                <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                  <h3 className="font-semibold text-foreground">
                    {dictionary.helpCard.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {dictionary.helpCard.bodyPrefix}{" "}
                    <a
                      href="mailto:organizers@kcdpanama.com"
                      className="font-medium text-primary hover:underline"
                    >
                      organizers@kcdpanama.com
                    </a>{" "}
                    {dictionary.helpCard.bodySuffix}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer dictionary={dictionary.footer} />
    </div>
  );
}
