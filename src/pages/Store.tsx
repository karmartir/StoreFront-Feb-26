import storeItems from '../data/items.json'
import {Col, Form, Row} from "react-bootstrap";
import StoreItem from "../components/StoreItem.tsx";
const Store = () => {
	return (
		<div className="container w-85">
		<Form  className="mx-auto mb-4 w-75">
			<Form.Control
			 placeholder="Search for items"
			/>
		</Form>
			<Row className="justify-content-center  m-auto">
				{storeItems.map(item => (
				  <Col key={item.id} xs="auto" className="d-flex justify-content-center mb-4">
				    <StoreItem {...item}  />
				  </Col>
				))}
				
			</Row>
		</div>
	);
};

export default Store;