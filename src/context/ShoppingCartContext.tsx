import {type Context, createContext, type ReactNode, useContext, useState} from "react";
import Cart from "../components/Cart.jsx.tsx";
import storeItems from "../data/items.json";
import {SearchComponent} from "../components/SearchComponent.tsx";

//типизируем 
type ShoppingCartProviderProps = {
	children: ReactNode;
}
type ShoppingCartContext = {
	cartItems: CartItem[],
	cartQuantity: number,
	searchItemText: string,
	setSearchItemText: (text: string) => void,
	filteredItems: StoreItem[],
	setFilteredItems: (items: StoreItem[]) => void,
	isSearchOpen: boolean,
	openCart: () => void,
	closeCart: () => void,
	increaseItemQuantity: (id: number) => void,
	decreaseItemQuantity: (id: number) => void,
	deleteCartItem: (id: number) => void,
	getItemQuantity: (id: number) => number,
	setIsSearchOpen: (open: boolean) => void,
	isCartOpen: boolean,
	openSearchComponent: () => void,
}
type CartItem = {
	id: number,
	quantity: number
}
type StoreItem = {
	id: number,
	name: string
}

// creating Context
const ShoppingCartContext: Context<ShoppingCartContext> = createContext(
  {} as ShoppingCartContext);


//custom hook
export function useShoppingCart(){
	 return useContext(ShoppingCartContext)
}

//Context Provider with all our states and functions
export function ShoppingCartProvider({children}: ShoppingCartProviderProps ) {
	//states
	const [cartItems, setCartItems] = useState<CartItem[]>([]); // todo use local storage
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const[searchItemText, setSearchItemText] = useState<string>('');
	const [filteredItems, setFilteredItems] = useState<StoreItem[]>(storeItems);
	
	
	//functions	
	// getting TOTAL quantities
	const cartQuantity = cartItems.reduce(
		(quantity, item) => quantity + item.quantity, 0);
	
	const openCart = () => setIsCartOpen(true)
	const closeCart = () => setIsCartOpen(false)

	const openSearchComponent = () => setIsSearchOpen(true)
	const closeSearchComponent = () => setIsSearchOpen(false)
	
	// getting ONE item quantity
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
			isCartOpen,
			isSearchOpen,
			getItemQuantity,
			openSearchComponent,
			}}>
			{children}
			<Cart/>
			<SearchComponent
				isSearchOpen={isSearchOpen}
				closeSearchComponent={closeSearchComponent}
			/>
		</ShoppingCartContext.Provider>
	)
}


