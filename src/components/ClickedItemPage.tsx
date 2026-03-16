import { useParams } from "react-router-dom";
import storeItems from "../data/items.json";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useShoppingCart } from "../hooks/useShoppingCart.ts";
import {useFormatCurrency} from "../hooks/useFormatCurrency.tsx";

export function ClickedItemPage() {
	const id = Number(useParams().id)  // ✅ convert once
	const {darkMode, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, deleteCartItem} = useShoppingCart()
	const formatCurrency = useFormatCurrency()
	const quantity = getItemQuantity(id)
	const item = storeItems.find(el => el.id === id)
	
	if (!item) return (
		<Container className="py-5 text-center text-muted">
			<h4>Item not found</h4>
		</Container>
	)
	
	const {price, name, imageUrl, description} = item
	
	const textColor = darkMode ? "white" : "black";
	const priceColor = darkMode ? "#0d6efd" : "green"; // or keep success class
	return (
		<Container className="py-5" style={{maxWidth: '900px'}}>
			<Row className="g-5 align-items-center">
				
				{/* Image column */}
				<Col md={6}>
					<div  style={{borderRadius: '16px', overflow: 'hidden'}}>
						<img
							src={imageUrl || '/images/17.webp'}
							alt={name}
							style={{width: '100%', height: '400px', objectFit: 'contain', padding: '1rem'}}
						/>
					</div>
				</Col>
				
				{/* Info column */}
				<Col md={6} className="d-flex flex-column gap-3 align-items-start">
					<div className="d-flex flex-column gap-1" >
						<h2 className="fw-bold mb-1" style={{ color: textColor }}>{name}</h2>
						<h4 style={{ color: priceColor }}>{formatCurrency(price)}</h4>
						<span style={{ color: textColor }}>{description}</span>
						<p style={{ color: textColor }}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus beatae consequuntur ea fugiat iste labore laboriosam laborum, odit rem reprehenderit saepe tenetur voluptatem voluptatum? Doloremque exercitationem ipsum iste sapiente sit.
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus beatae consequuntur ea fugiat iste labore laboriosam laborum, odit rem reprehenderit saepe tenetur voluptatem voluptatum? Doloremque exercitationem ipsum iste sapiente sit.
						</p>
					</div>
					
					<hr/>
					
					{quantity === 0 ? (
						<Button size="lg" variant="outline-primary" onClick={() => increaseItemQuantity(id)}>
							Add to Cart
						</Button>
					) : (
						<div className="d-flex flex-column gap-2">
							<div className="d-flex align-items-center gap-3">
								<Button variant="outline-secondary" onClick={() => decreaseItemQuantity(id)}>−</Button>
								<span className="fs-5 fw-bold text-body">{quantity} in cart</span>
								<Button variant="outline-secondary" onClick={() => increaseItemQuantity(id)}>+</Button>
							</div>
							<Button variant="danger" onClick={() => deleteCartItem(id)}>
								Remove from Cart
							</Button>
						</div>
					)}
				</Col>
			
			</Row>
		</Container>
	)
}