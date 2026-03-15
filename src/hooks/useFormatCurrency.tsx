import {useShoppingCart} from "./useShoppingCart.ts";


export function useFormatCurrency() {
	const {currency} = useShoppingCart()
	return (value: number) => new Intl.NumberFormat("en", {
		style: "currency",
		currency,
	}).format(value);
}