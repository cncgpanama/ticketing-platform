import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function mapStatusToUI(
  status: "AVAILABLE" | "SOLD_OUT" | "COMING_SOON"
): "available" | "sold-out" | "coming-soon" | "reserved" {
  switch (status) {
    case "AVAILABLE":
      return "available";
    case "SOLD_OUT":
      return "sold-out";
    case "COMING_SOON":
      return "coming-soon";
    default:
      return "available";
  }
}

const USD_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatUSD(amount: number) {
  return USD_FORMATTER.format(amount);
}

export function encodeHex(input: string): string {
  return Buffer.from(input).toString("hex");
}

