"use client";

import { Button } from "@/components/ui/button";
import { mapStatusToUI } from "@/lib/utils";
import type { TicketTierUI } from "./types";
import { formatUSD } from "./utils";

interface TicketCardProps {
  dictionary: {
    useCouponCode: string;
    includes: string;
    roadmapNotice: string;
    soldOut: string;
    comingSoon: string;
  };
  tier: TicketTierUI;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  canIncrease: boolean;
}

export function TicketCard({
  dictionary,
  tier,
  quantity,
  onIncrease,
  onDecrease,
  canIncrease,
}: TicketCardProps) {
  const uiStatus = mapStatusToUI(tier.status);
  const price = Number(tier.price);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-3">
        <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
        {tier.tagline && (
          <p className="mt-0.5 text-sm font-semibold text-foreground">
            {tier.tagline}
          </p>
        )}
        {tier.discount && (
          <p className="text-sm font-semibold text-primary">{tier.discount}</p>
        )}
        {tier.couponCode && (
          <p className="text-sm text-muted-foreground">
            {dictionary.useCouponCode}
            <span className="font-medium text-foreground">
              {tier.couponCode}
            </span>
          </p>
        )}
      </div>

      <p
        className="text-sm leading-relaxed text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: tier.description }}
      />

      <div className="mt-4">
        <p className="text-sm font-medium text-foreground">
          {dictionary.includes}
        </p>
        <ul className="mt-2 flex flex-col gap-1.5 pl-5">
          {tier.features.map((feature) => (
            <li
              key={feature}
              className="list-disc text-sm text-muted-foreground"
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-sm italic text-muted-foreground">
        {dictionary.roadmapNotice}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-foreground">
          {formatUSD(price)}
        </span>

        {uiStatus === "sold-out" && (
          <Button variant="outline" disabled className="min-w-[100px]">
            {dictionary.soldOut}
          </Button>
        )}
        {uiStatus === "available" && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onDecrease}
              disabled={quantity <= 0}
            >
              -
            </Button>
            <span className="min-w-7 text-center text-sm font-semibold">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={onIncrease}
              disabled={!canIncrease}
            >
              +
            </Button>
          </div>
        )}
        {uiStatus === "coming-soon" && (
          <Button variant="outline" disabled className="min-w-[100px]">
            {dictionary.comingSoon}
          </Button>
        )}
      </div>
    </div>
  );
}
