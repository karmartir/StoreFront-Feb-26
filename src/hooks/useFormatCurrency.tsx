import { useShoppingCart } from "./useShoppingCart";
import { useEffect, useState } from "react";

//Garen comment: I updated the hook so the Intl.NumberFormat locale now changes dynamically based on the selected currency, defaulting to "en-US" if the currency isn’t mapped.
export function useFormatCurrency() {
	const { currency } = useShoppingCart();
	const [rate, setRate] = useState<number>(1);
	
	useEffect(() => {
		if (currency === "USD") {
			// avoid synchronous state change during render
			setTimeout(() => setRate(1), 0);
			return;
		}
		// fetch conversion rate from USD → selected currency
		fetch(`https://api.frankfurter.app/latest?from=USD&to=${currency}`)
			.then((res) => res.json())
			.then((data) => {
				const r = data.rates[currency];
				if (r) setRate(r);
			})
			.catch((err) => console.error("Currency fetch error:", err));
	}, [currency]);
	
	// locale mapping for supported currencies
	const localeMap: Record<string, string> = {
		USD: "en-US",
		EUR: "de-DE",
		GBP: "en-GB",
		JPY: "ja-JP"
	};
	// return a function that formats any value
	return (value: number) => {
		const converted = value * rate;
		return new Intl.NumberFormat(localeMap[currency] || "en-US", {
			style: "currency",
			currency,
		}).format(converted);
	};
}
/*export function useFormatCurrency() {
	const {currency} = useShoppingCart()
	return (value: number) => new Intl.NumberFormat("en", {
		style: "currency",
		currency,
	}).format(value);
}
*/
