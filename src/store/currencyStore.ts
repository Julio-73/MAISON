import { create } from "zustand";

export interface Currency {
  code: string; symbol: string; rate: number; locale: string;
}

export const currencies: Currency[] = [
  { code: "EUR", symbol: "€", rate: 1, locale: "es-ES" },
  { code: "USD", symbol: "$", rate: 1.09, locale: "en-US" },
  { code: "GBP", symbol: "£", rate: 0.86, locale: "en-GB" },
  { code: "JPY", symbol: "¥", rate: 164.5, locale: "ja-JP" },
  { code: "CHF", symbol: "CHF", rate: 0.96, locale: "de-CH" },
];

interface CurrencyState {
  current: Currency;
  setCurrency: (code: string) => void;
  format: (amountEur: number) => string;
}

export const useCurrency = create<CurrencyState>((set, get) => ({
  current: currencies[0],
  setCurrency: (code) => {
    const found = currencies.find(c => c.code === code);
    if (found) set({ current: found });
  },
  format: (amountEur) => {
    const { current } = get();
    const converted = amountEur * current.rate;
    const rounded = current.code === "JPY" ? Math.round(converted) : converted;
    try {
      return new Intl.NumberFormat(current.locale, {
        style: "currency", currency: current.code,
        minimumFractionDigits: current.code === "JPY" ? 0 : 0,
        maximumFractionDigits: current.code === "JPY" ? 0 : 0,
      }).format(rounded);
    } catch {
      return `${current.symbol}${rounded.toLocaleString()}`;
    }
  },
}));