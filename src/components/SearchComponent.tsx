import {Offcanvas} from "react-bootstrap";
import Store from "../pages/Store.tsx";
import {useShoppingCart} from "../context/ShoppingCartContext.tsx";

export function SearchComponent(){
	const {isSearchOpen, closeSearchComponent} = useShoppingCart()
	

	return (
		<Offcanvas
			show={isSearchOpen}
			onHide={closeSearchComponent}
			placement='bottom'
			style={{width: "100%", height: "100%"}}
		>
			<Offcanvas.Header closeButton>
				{/*<Offcanvas.Title>Search Results:</Offcanvas.Title>*/}
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Store/>
			</Offcanvas.Body>

		</Offcanvas>
	)
}