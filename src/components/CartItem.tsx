import {Stack} from "react-bootstrap";
import storeItems from "../data/items.json"
type CartItemProps={
	id: number,
	quantity: number
}

export default function CartItem ({id, quantity}: CartItemProps) {
	const item = storeItems.find(el => el.id ===id)
	if(item ==null) return null
	return (
		<Stack direction='horizontal' gap={2}>
			<img src={item.imageUrl}/>

			<div>
				{item.name}
			</div>
			<div>
				{item.price}
			</div>
			<div>
				{item.price * quantity}
			</div>
		</Stack>
	)
}