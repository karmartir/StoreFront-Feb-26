import {useContext} from "react";
import {ShoppingCartContext} from "../context/ShoppingCartContext.ts";
import type {ShoppingCartContextType} from "../types/types.ts";

export function useShoppingCart(): ShoppingCartContextType {
	const context = useContext(ShoppingCartContext);
	if (!context) throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
	return context;
}