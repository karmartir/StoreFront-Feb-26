import {Container, Image, Nav, Navbar as NavbarBs, NavbarBrand, NavbarCollapse, NavbarToggle} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
	const {isCartOpen, openCart, closeCart, setSearchItemText, isSearchOpen, openSearchComponent, closeSearchComponent} = useShoppingCart()
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setSearchItemText(e.target.value)
		if(isSearchOpen){
			openSearchComponent()
		}
		
	}
	return (
		<NavbarBs sticky='top' expand="lg" className="bg-light shadow-sm mb-5 vw-100" >
			<Container >
				<NavbarBrand>
					<NavLink to='/'>
						<Image className='me-5 shadow-sm rounded-5' src='/images/logo.jpg' alt="logo" width={120} />
					</NavLink>
				</NavbarBrand>
				
				<NavbarToggle aria-controls="basic-navbar-nav"/>
				<NavbarCollapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={NavLink} to="/store">Store</Nav.Link>
						<Nav.Link as={NavLink} to="/">Home</Nav.Link>
						<Nav.Link as={NavLink} to="/gallery">Gallery</Nav.Link>
						<Nav.Link as={NavLink} to="/about-us">About us</Nav.Link>
						
					
					</Nav>
				</NavbarCollapse>
			</Container>
		</NavbarBs>
	);
};

export default Navbar;