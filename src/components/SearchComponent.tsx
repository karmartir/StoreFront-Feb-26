import {Offcanvas} from "react-bootstrap";
import Store from "../pages/Store.tsx";

type SearchComponentProps = {
	isSearchOpen: boolean,
	closeSearchComponent: () => void
}


export function SearchComponent({isSearchOpen, closeSearchComponent}: SearchComponentProps){
	return (
		<Offcanvas
			show={isSearchOpen}
			onHide={closeSearchComponent}
			placement='end'
			style={{width: "70%"}}
		>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Search Results:</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Store/>
			</Offcanvas.Body>

		</Offcanvas>
	)
}