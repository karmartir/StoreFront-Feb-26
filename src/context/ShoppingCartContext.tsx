import {createContext, type ReactNode, useContext, useState} from "react";
import Cart from "../components/Cart.jsx.tsx";
import storeItems from "../data/items.json";
type ShoppingCartProviderProps = {
	children: ReactNode;
}
type CartItem = {
	id: number,
	quantity: number
}
type ShoppingCartContextType = {
	cartItems: CartItem[],
	isCartOpen: boolean,
	isSearchOpen: boolean,
	setIsSearchOpen: (open: boolean) => void,
	searchItemText: string,
	setSearchItemText: (text: string) => void,
	filteredItems: typeof storeItems,
	setFilteredItems: (items: typeof storeItems) => void,
	getItemQuantity: (id: number) => number,
	cartQuantity: number,
	openCart: () => void,
	closeCart: () => void,
	increaseCartItem: (id: number) => void,
	decreaseCartItem: (id: number) => void,
	deleteCartItem: (id: number) => void,
}
const ShoppingCartContext = createContext<ShoppingCartContextType>(
  {} as ShoppingCartContextType
);

export { ShoppingCartContext };

export function ShoppingCartProvider({children}: ShoppingCartProviderProps ) {
	//states
	const [cartItems, setCartItems] = useState<CartItem[]>([]); // todo use local storage
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const[searchItemText, setSearchItemText] = useState<string>('');
	const [filteredItems, setFilteredItems] = useState<typeof storeItems>(storeItems);
	//functions
	
	const cartQuantity = cartItems.reduce(
		(quantity, item) => quantity + item.quantity,
		0
	);
	
	const openCart = () => setIsCartOpen(true)
	const closeCart = () => setIsCartOpen(false)
	
	const openSearchComponent = () => setIsSearchOpen(true)
	const closeSearchComponent = () => setIsSearchOpen(false)
	
	const getItemQuantity = (id: number) => {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	};
	
	
	const increaseCartItem = (id: number) => {
		setCartItems((currentItems) => {
			if (currentItems.find((item) => item.id === id) === undefined) {
				return [...currentItems, { id, quantity: 1 }];
			} else {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	};
	const decreaseCartItem = (id: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (!existing) return prev;

      if (existing.quantity === 1) {
        return prev.filter(item => item.id !== id);
      }

      return prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
	}
	const deleteCartItem = (id: number) => {
		
		setCartItems(prev => prev.filter(item => item.id !== id));
	}
	return (
		<ShoppingCartContext.Provider value={{
			cartItems,
			isCartOpen,
			isSearchOpen,
			setIsSearchOpen,
			searchItemText,
			setSearchItemText,
			filteredItems,
			setFilteredItems,
			cartQuantity,
			openCart,
			closeCart,
			getItemQuantity,
			increaseCartItem,
			decreaseCartItem,
			deleteCartItem}}>
			{children}
			<Cart isCartOpen={isCartOpen}/>
		</ShoppingCartContext.Provider>
	)
}
export function useShoppingCart(){
	const context = useContext(ShoppingCartContext)
	return context
}

