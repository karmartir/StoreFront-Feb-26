import { useShoppingCart } from "./useShoppingCart";
import { useEffect, useState } from "react";

//Garen comment: Now my Intl.NumberFormat locale changes dynamically based on the selected currency, defaulting to "en-US" if the currency isn’t mapped.
export function useFormatCurrency() {
  const { currency } = useShoppingCart();
  const [rate, setRate] = useState<number>(1);

  useEffect(() => {
    if (currency === "USD") return;

    const fetchRate = async () => {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?from=USD&to=${currency}`,
        );
        if (!res.ok) throw new Error("Failed to fetch currency rate");

        const data = await res.json();
        const finalRate = data?.rates?.[currency];
        if (finalRate !== undefined) setRate(finalRate);
      } catch (err) {
        console.error("Currency fetch error:", err);
        setRate(1); // fallback
      }
    };
    fetchRate();
  }, [currency]);

  // locale mapping for supported currencies
  const localeMap: Record<string, string> = {
    USD: "en-US",
    EUR: "fr-FR",
    GBP: "en-GB",
    JPY: "ja-JP",
    CAD: "fr-CA",
  };
  // return a function that formats any value
  return (value: number) => {
    const converted = currency === "USD" ? value : value * rate;
    return new Intl.NumberFormat(localeMap[currency] || "en-US", {
      style: "currency",
      currency,
    }).format(converted);
  };
}
