import {type Context, createContext, type ReactNode, useContext, useEffect, useMemo, useState} from "react";
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
	closeSearchComponent: () => void,
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
// getting cartItems from local storage if it exists
const initialCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
//Context Provider with all our states and functions
export function ShoppingCartProvider({children}: ShoppingCartProviderProps ) {
	//states
	const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const[searchItemText, setSearchItemText] = useState<string>('');
	const [filteredItems, setFilteredItems] = useState<StoreItem[]>(storeItems);
	
	
	//functions	
	// getting TOTAL quantities also wrapping it in useMemo for performance optimization no need to recalculate every time
	const cartQuantity = useMemo(
		() => cartItems.reduce(
		(quantity, item) => quantity + item.quantity, 0), [cartItems]);
	
	// Open and close cart(корзину)
	const openCart = () => setIsCartOpen(true)
	const closeCart = () => setIsCartOpen(false)

	// Open and close search component (поисковик)
	const openSearchComponent = () => setIsSearchOpen(true)
	const closeSearchComponent = () => setIsSearchOpen(false)
	
	// getting ONE item quantity
	const getItemQuantity = (id: number) => {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	};
	
	// increase item quantity
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
// decrease item quantity
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
	
	// delete item from cart
	const deleteCartItem = (id: number) => {
		setCartItems(currCartItems => currCartItems.filter(item => item.id !== id));
	}
	// save cartItems to local storage on change cartItems
	useEffect(() => {
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
	}, [cartItems]);
	
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
			closeSearchComponent
			}}>
			{children}
			<Cart/>
			<SearchComponent/>
		</ShoppingCartContext.Provider>
	)
}
