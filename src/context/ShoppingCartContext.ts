import { createContext,} from "react";
import type {ShoppingCartContextType} from "../types/types.ts";

// creating Context
export const ShoppingCartContext = createContext(
	{} as ShoppingCartContextType);

