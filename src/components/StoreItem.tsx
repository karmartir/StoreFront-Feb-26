import {Button, Card, CardText} from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
	id: number,
	price: number,
	name: string,
	imageUrl: string,
}

function StoreItem({id, price, name, imageUrl}: StoreItemProps) {
	const {getItemQuantity, increaseItemQuantity, decreaseItemQuantity, deleteCartItem} = useShoppingCart()

	const quantity = getItemQuantity(id)
	return (
		<Card className={"w-[300px] h-[400px] flex-shrink-0"}>
			<Card.Img
				variant="top"
				src={imageUrl}
				className="mb-1 object-fit-cover bg-dark radius-20"
				style={{height: '300px'}}
			/>
			<Card.Body className="flex flex-col text-center">
				<Card.Title><strong>{name.toUpperCase()}</strong></Card.Title>
				<CardText>Price: ${price}</CardText>
				
				{/*<Card.Text>*/}
				{/*	Some quick example text to build on the card title and make up the*/}
				{/*	bulk of the card's content.*/}
				{/*</Card.Text>*/}
				<div >
					{quantity=== 0 ? (<Button onClick={() => increaseItemQuantity(id)} className="w-100 " variant="secondary">Add to cart</Button>)
						: (
							<div className="d-flex flex-column justify-content-around align-items-center ">
								<div className="d-flex justify-content-around align-items-center gap-2 mb-2 w-100">
									<Button variant="secondary" onClick={() => decreaseItemQuantity(id)}>-</Button>
									<span>{quantity}</span>
									<Button variant="secondary" onClick={() => increaseItemQuantity(id)}>+</Button>
								</div>
								<Button variant='danger' onClick={() => deleteCartItem(id)}>Remove</Button>
							</div>
						)
					}
				</div>
			
			</Card.Body>
		</Card>
	);
}

export default StoreItem;