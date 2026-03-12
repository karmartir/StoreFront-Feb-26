import { useParams } from "react-router-dom";
import storeItems from "../data/items.json";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useShoppingCart } from "../hooks/useShoppingCart.ts";

export function ClickedItemPage() {
	const id = Number(useParams().id)  // ✅ convert once
	const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, deleteCartItem } = useShoppingCart()
	const quantity = getItemQuantity(id)
	const item = storeItems.find(el => el.id === id)
	
	if (!item) return (
		<Container className="py-5 text-center text-muted">
			<h4>Item not found</h4>
		</Container>
	)
	
	const { price, name, imageUrl } = item
	
	return (
		<Container className="py-5" style={{ maxWidth: '900px' }}>
			<Row className="g-5 align-items-center">
				
				{/* Image column */}
				<Col md={6}>
					<div style={{ borderRadius: '16px', overflow: 'hidden', background: '#f8f9fa' }}>
						<img
							src={imageUrl || '/images/17.webp'}
							alt={name}
							style={{ width: '100%', height: '400px', objectFit: 'contain', padding: '1rem' }}
						/>
					</div>
				</Col>
				
				{/* Info column */}
				<Col md={6} className="d-flex flex-column gap-3">
					<div>
						<h2 className="fw-bold mb-1">{name}</h2>
						<h4 className="text-success fw-semibold">${price}</h4>
					</div>
					
					<hr />
					
					{quantity === 0 ? (
						<Button
							size="lg"
							variant="dark"
							onClick={() => increaseItemQuantity(id)}
						>
							Add to Cart
						</Button>
					) : (
						<div className="d-flex flex-column gap-2">
							<div className="d-flex align-items-center gap-3">
								<Button variant="outline-secondary" onClick={() => decreaseItemQuantity(id)}>−</Button>
								<span className="fs-5 fw-bold">{quantity} in cart</span>
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