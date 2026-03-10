import {Col, Container, Form, Row} from "react-bootstrap";
import storeItems from '../data/items.json'
import StoreItem from "../components/StoreItem.tsx";
import {useEffect} from "react";
import {useShoppingCart} from "../hooks/useShoppingCart.ts";

const Store = () => {
	const {searchItemText, setSearchItemText, filteredItems, setFilteredItems, isSearchOpen} = useShoppingCart()
	
	
	// filtering items
	useEffect(() => {
		const filtered = storeItems.filter(item =>
		item.name.toLocaleLowerCase().includes(searchItemText.toLowerCase()))
		setFilteredItems(filtered)
	}, [searchItemText, setFilteredItems])

	return (
		<Container style={{maxWidth: '1200px'}}>
			{isSearchOpen && <Form className="mx-auto mb-4 w-75 bg-dark-subtle p-5 rounded-5 mb-5">
				<h1 className='text-center mb-5'>Search</h1>
				<Form.Control
					placeholder="Search for items"
					value={searchItemText}
					onChange={(e) => setSearchItemText(e.target.value)}
				/>
			</Form>}
			<>
			<Row xl={3} md={2} sm={1}  className="justify-content-center  m-auto">
				{filteredItems.map(item => (
				  <Col key={item.id} xs="auto" className="d-flex justify-content-center mb-4">
				    <StoreItem price={0} imageUrl={null} {...item}   />
				  </Col>
				))}
				
			</Row>
				</>
			</Container>
	);
};

export default Store;