import {Button, Stack} from "react-bootstrap";
import storeItems from "../data/items.json"
import {useShoppingCart} from "../hooks/useShoppingCart.ts";
import {useFormatCurrency} from "../hooks/useFormatCurrency.tsx";


type CartItemProps = {
	id: number,
	quantity: number
}

export default function CartItem({id, quantity}: CartItemProps) {
	const {deleteCartItem} = useShoppingCart()
	const formatCurrency = useFormatCurrency()
	const item = storeItems.find(el => el.id === id)
	if (item == null) return null
	const {name, price, imageUrl} = item

	const formattedPrice = formatCurrency(price)
	const totalPrice = formatCurrency(price * quantity)
	return (
		
		
		<Stack direction='horizontal' gap={2} className='align-items-center justify-content-between'>
			<img src={imageUrl} alt={name} width={100}/>
			
			<div>
				{name}
			</div>
			<div>
				price: {formattedPrice}
			</div>
			<div>
				total: x{quantity} = {totalPrice}
			</div>
			<Button onClick={() => deleteCartItem(id)} variant='danger'>Remove</Button>
		</Stack>
	
	)
}