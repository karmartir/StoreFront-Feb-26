import {Button, Card, CardText} from "react-bootstrap";
import {useShoppingCart} from "../hooks/useShoppingCart.ts";
import {NavLink} from "react-router-dom";


type StoreItemProps = {
	id: number,
	price: number,
	name: string,
	imageUrl: string | null,
}

function StoreItem({id, price, name, imageUrl}: StoreItemProps) {
	const {getItemQuantity, increaseItemQuantity, decreaseItemQuantity, deleteCartItem} = useShoppingCart()

	const quantity = getItemQuantity(id)
	
	return (
		<>
	
		
	
		<Card className={"w-[300px] h-[400px] flex-shrink-0"}>
			<NavLink to={`/clickedItem/${id}`}>
			<Card.Img
				variant="top"
				src={imageUrl ? imageUrl : '/images/17.webp'}
				className="mb-1 object-fit-cover bg-dark radius-20"
				style={{height: '300px'}}
			/>
		</NavLink>
			<Card.Body className="flex flex-col text-center">
				<Card.Title><strong>{name.toUpperCase()}</strong></Card.Title>
				<CardText>Price: ${price}</CardText>

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
		
		</>
	);
}

export default StoreItem;