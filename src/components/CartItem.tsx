import {Button, Stack} from "react-bootstrap";
import storeItems from "../data/items.json"
import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
type CartItemProps={
	id: number,
	quantity: number
}

export default function CartItem ({id, quantity}: CartItemProps) {
const {deleteCartItem} = useShoppingCart()
	const item = storeItems.find(el => el.id ===id)
	if(item ==null) return null
	return (
	

	<Stack direction='horizontal' gap={2} className='align-items-center justify-content-between'>
		<img src={item.imageUrl} alt={item.name} width={100}/>
		
		<div>
			{item.name}
		</div>
		<div>
			{item.price}
		</div>
		<div>
			{item.price * quantity}
		</div>
		<Button onClick={() => deleteCartItem(item.id)} variant='danger'>Remove</Button>
	</Stack>

	)
}