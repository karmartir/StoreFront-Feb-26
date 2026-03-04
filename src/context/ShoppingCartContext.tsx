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
	deleteCartItem: (id: number) => void,
	increaseItemQuantity: (id: number) => void,
	decreaseItemQuantity: (id: number) => void,
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
	
	
	const increaseItemQuantity = (id: number) => {
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
	};
	const decreaseItemQuantity = (id: number) => {
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
  }
		  
	const deleteCartItem = (id: number) => {
		setCartItems(currCartItems => currCartItems.filter(item => item.id !== id));
	}
	return (
		<ShoppingCartContext.Provider value={{
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
			cartQuantity,
			isCartOpen,
			isSearchOpen,
			getItemQuantity,
			}}>
			{children}
			<Cart isCartOpen={isCartOpen}/>
		</ShoppingCartContext.Provider>
	)
}
export function useShoppingCart(){
	const context = useContext(ShoppingCartContext)
	return context
}

