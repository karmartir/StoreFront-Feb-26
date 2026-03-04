import {Offcanvas} from "react-bootstrap";

type SearchComponentProps = {
	isSearchOpen: boolean,
	closeSearchComponent: () => void
}


export function SearchComponent({isSearchOpen, closeSearchComponent}: SearchComponentProps){
	return (
		<Offcanvas show={isSearchOpen} onHide={closeSearchComponent}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Search Results:</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				Some text as placeholder. In real life you can have the elements you
				have chosen. Like, text, images, lists, etc.
			</Offcanvas.Body>
		</Offcanvas>
	)
}