"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useCountdown } from "@/hooks/use-countdown";
import type { Locale } from "@/lib/i18n/config";

const EVENT_DATE_MS = new Date("2026-04-21").getTime();
type TicketWidgetDictionary = {
  title: string;
  description: string;
  countdownLabels: {
    days: string;
    hours: string;
    mins: string;
  };
  features: string[];
  registerNow: string;
  limitedTickets: string;
};

export function TicketWidget({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: TicketWidgetDictionary;
}) {
  const { days, hours, minutes } = useCountdown(EVENT_DATE_MS);

  return (
    <Card className="overflow-hidden border-2 border-primary shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
      <CardHeader className="bg-primary px-6 py-4 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className=" flex items-baseline gap-1">
            <CardTitle className="text-xl font-bold">
              <span className="text-xl font-bold">{dictionary.title}</span>
            </CardTitle>
          </div>
        </div>

        <CardDescription className="text-primary-foreground text-sm">
          {dictionary.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 pt-2">
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: dictionary.countdownLabels.days, value: days },
            { label: dictionary.countdownLabels.hours, value: hours },
            { label: dictionary.countdownLabels.mins, value: minutes },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center rounded-lg bg-muted p-2 text-center"
            >
              <span className="text-2xl font-bold tabular-nums text-primary">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <ul className="flex flex-col gap-3">
          {dictionary.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                <Check className="h-3 w-3 text-secondary" />
              </div>
              <span className="font-medium text-foreground/80">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          size="lg"
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base font-bold shadow-md transition-colors"
          asChild
        >
          <Link href={`/${lang}/register`}>{dictionary.registerNow}</Link>
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          {dictionary.limitedTickets}
        </p>
      </CardContent>
    </Card>
  );
}