//типизируем тута, мне так удобнее! более продакшн стиль
import type {ReactNode} from "react";

export type ShoppingCartProviderProps = {
	children: ReactNode;
}
export type CartItem = {
	id: number,
	quantity: number
}
export type StoreItem = {
	id: number,
	name: string
}

export type ShoppingCartContextType = {
	cartItems: CartItem[]
	cartQuantity: number
	searchItemText: string
	setSearchItemText: (text: string) => void
	filteredItems: StoreItem[]
	isSearchOpen: boolean
	openCart: () => void
	closeCart: () => void
	increaseItemQuantity: (id: number) => void
	decreaseItemQuantity: (id: number) => void
	deleteCartItem: (id: number) => void
	getItemQuantity: (id: number) => number
	isCartOpen: boolean
	openSearchComponent: () => void
	closeSearchComponent: () => void
}