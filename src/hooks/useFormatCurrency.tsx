import { useShoppingCart } from "./useShoppingCart";
import { useEffect, useState } from "react";

//Garen comment: Now my Intl.NumberFormat locale changes dynamically based on the selected currency, defaulting to "en-US" if the currency isn’t mapped.
export function useFormatCurrency() {
  const { currency } = useShoppingCart();
  const [rate, setRate] = useState<number>(1);

  useEffect(() => {
    if (currency === "USD") return;
    // fetch conversion rate from USD → selected currency
    fetch(`https://api.frankfurter.app/latest?from=USD&to=${currency}`)
      .then((res) => res.json())
      .then((data) => {
        const finalRes = data.rates[currency];
        if (finalRes) setRate(finalRes);
      })
      .catch((err) => console.error("Currency fetch error:", err));
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
