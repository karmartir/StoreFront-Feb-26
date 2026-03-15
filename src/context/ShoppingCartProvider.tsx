import {useState} from "react";
import storeItems from "../data/items.json";
import type {CartItem, ShoppingCartProviderProps} from "../types/types.ts";
import {ShoppingCartContext} from "./ShoppingCartContext.ts";
import {useLocalStorage} from "../hooks/useLocalStorage.ts";


export function ShoppingCartProvider({children}: ShoppingCartProviderProps) {
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cartItems', []);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchItemText, setSearchItemText] = useState<string>('');
	const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);
	const [currency, setCurrency] = useState<string>('GBP');
	const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);
 
	const filteredItems = storeItems.filter(item =>
	item.name.toLowerCase().includes(searchItemText.toLowerCase()));
	
	const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0);
	
	const openCart = () => setIsCartOpen(true);
	const closeCart = () => setIsCartOpen(false);
	
	const openSearchComponent = () => setIsSearchOpen(true);
	const closeSearchComponent = () => setIsSearchOpen(false);
	
	const getItemQuantity = (id: number) => {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	};
	
	const increaseItemQuantity = (id: number) => {
		setCartItems((curr) => {
			if (curr.find((item) => item.id === id) == null) {
				return [...curr, {id, quantity: 1}];
			}
			return curr.map((item) =>
				item.id === id ? {...item, quantity: item.quantity + 1} : item
			);
		});
	};
	
	const decreaseItemQuantity = (id: number) => {
		setCartItems((curr) => {
			if (curr.find((item) => item.id === id)?.quantity === 1) {
				return curr.filter((item) => item.id !== id);
			}
			return curr.map((item) =>
				item.id === id ? {...item, quantity: item.quantity - 1} : item
			);
		});
	};
	
	const deleteCartItem = (id: number) => {
		setCartItems((curr) => curr.filter((item) => item.id !== id));
	};
	
	return (
		<ShoppingCartContext.Provider value={{
			cartItems,
			cartQuantity,
			openCart,
			closeCart,
			deleteCartItem,
			increaseItemQuantity,
			decreaseItemQuantity,
			searchItemText,
			setSearchItemText,
			filteredItems,
			isCartOpen,
			isSearchOpen,
			getItemQuantity,
			openSearchComponent,
			closeSearchComponent,
			darkMode,
			toggleDarkMode,
			currency,
			setCurrency,
		}}>
			{children}
		</ShoppingCartContext.Provider>
	);
}