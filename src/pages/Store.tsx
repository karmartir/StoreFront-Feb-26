import {Col, Form, Row} from "react-bootstrap";
import storeItems from '../data/items.json'
import StoreItem from "../components/StoreItem.tsx";
import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
import {useEffect} from "react";

const Store = () => {
	const {searchItemText, setSearchItemText, filteredItems, setFilteredItems} = useShoppingCart()
	
	useEffect(() => {
		const filtered = storeItems.filter(item =>
		item.name.toLocaleLowerCase().includes(searchItemText.toLowerCase()))
		setFilteredItems(filtered)
	}, [searchItemText, setFilteredItems])
	// console.log("filteredItems: ", filteredItems)
	return (
		<>
		<Form  className="mx-auto mb-4 w-75">
			<Form.Control
			 placeholder="Search for items"
			 value={searchItemText}
			 onChange={(e) => setSearchItemText(e.target.value)}
			/>
		</Form>
			<Row className="justify-content-center  m-auto">
				{filteredItems.map(item => (
				  <Col key={item.id} xs="auto" className="d-flex justify-content-center mb-4">
				    <StoreItem price={0} imageUrl={null} {...item}   />
				  </Col>
				))}
				
			</Row>
		
		</>
	);
};

export default Store;