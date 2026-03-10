import {useCallback, useEffect, useMemo, useState} from "react";
import storeItems from "../data/items.json";
import type {CartItem, ShoppingCartProviderProps, StoreItem} from "../types/types.ts";
import { ShoppingCartContext } from "./ShoppingCartContext.ts";

// getting cartItems from local storage if it exists
const initialCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
//Context Provider with all our states and functions
export function ShoppingCartProvider({children}: ShoppingCartProviderProps ) {
	//states
	const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchItemText, setSearchItemText] = useState<string>('');
	const [filteredItems, setFilteredItems] = useState<StoreItem[]>(storeItems);
	
	
	//functions
	// getting TOTAL quantities also wrapping it in useMemo for performance optimization no need to recalculate every time
	const cartQuantity = useMemo(
		() => cartItems.reduce(
		(quantity, item) => quantity + item.quantity, 0), [cartItems]);
	
	// Open and close cart(корзину)
	const openCart = useCallback(() => setIsCartOpen(true), []);
	const closeCart = useCallback(() => setIsCartOpen(false), []);

	// Open and close search component (поисковик)
	const openSearchComponent = useCallback(() => setIsSearchOpen(true), []);
	const closeSearchComponent = useCallback(() => setIsSearchOpen(false), []);
	
	// getting ONE item quantity
	const getItemQuantity = useCallback((id: number) => {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	}, [cartItems]);
	
	// increase item quantity
	const increaseItemQuantity = useCallback((id: number) => {
		setCartItems((currCartItems) => {
			if (currCartItems.find((item) => item.id === id) == null) {
				return [...currCartItems, { id, quantity: 1 }];
			} else {
				return currCartItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	}, []);
	
	// decrease item quantity
	const decreaseItemQuantity = useCallback((id: number) => {
		setCartItems(currCartItems => {
			if (currCartItems.find(item => item.id === id)?.quantity === 1) {
				return currCartItems.filter(item => item.id !== id);
			} else {
				return currCartItems.map(item => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 }
					} else {
						return item;
					}
				});
			}
		});
	}, []);
	
	// delete item from cart
	const deleteCartItem = useCallback((id: number) => {
		setCartItems(currCartItems => currCartItems.filter(item => item.id !== id));
	}, []);
	// save cartItems to local storage on change cartItems
	useEffect(() => {
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
	}, [cartItems]);
	
	
	const value = useMemo(() => ({
		cartItems,
		cartQuantity,
		openCart,
		closeCart,
		deleteCartItem,
		increaseItemQuantity,
		decreaseItemQuantity,
		setIsSearchOpen,
		searchItemText,
		setSearchItemText,
		filteredItems,
		setFilteredItems,
		isCartOpen,
		isSearchOpen,
		getItemQuantity,
		openSearchComponent,
		closeSearchComponent
	}),  [cartItems, cartQuantity, searchItemText, filteredItems, isCartOpen, isSearchOpen, openCart, closeCart, openSearchComponent, closeSearchComponent, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, deleteCartItem]);
	
	return (
		<ShoppingCartContext.Provider value={value}>
			{children}
		</ShoppingCartContext.Provider>
	)
}
