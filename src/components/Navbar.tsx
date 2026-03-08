import {
	Container,
	Image,
	Nav,
	Navbar as NavbarBs,
	NavbarBrand,
	NavbarCollapse,
	NavbarToggle,
	Button, Form
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import {cartLogo} from "./cartLogo.tsx";
import {FaSearch} from "react-icons/fa";

const Navbar = () => {
	const {openCart, cartQuantity, openSearchComponent, searchItemText, setSearchItemText} = useShoppingCart()

	return (
		<NavbarBs sticky='top' expand="lg" className="bg-light shadow-sm mb-5 vw-100" >
			<Container >
				<NavbarBrand>
					<NavLink to='/'>
						<Image className='me-5 shadow-sm rounded-5' src='/images/logo.jpg' alt="logo" width={100} />
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
				{/*form for search*/}
				<div className="d-flex me-2">
					<Form className="d-flex">
						<input 	value={searchItemText}
						        onChange={(e) => setSearchItemText(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
					</Form>
				</div>
			<div
				className='d-none d-lg-flex rounded-circle position-relative'
				style={{width: '3rem', height: '3rem', background: !searchItemText ? 'lightgray' : 'teal', borderRadius: '50%', justifyContent: 'center', alignItems: 'center'}}
			onClick={() => openSearchComponent()}
			>
				<FaSearch size={20} color='white'/>
			</div>
					<div className="d-none d-lg-block">
						<Button
							onClick={openCart}
							className='rounded-circle ms-3 position-relative'
							style={{width: '3rem', height: '3rem', background: cartQuantity ? "black" : "lightgray", border: 'none', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.4)'}}
							>
							
							<span style={{color: 'white'}}>{cartLogo}</span>
							
							{/*Картинка svg корзины*/}
							{ cartQuantity > 0 && (
							<div className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
							     style={{
								     color: "white", width: '1.5rem', height: '1.5rem', position: 'absolute',
								     bottom: 0, right: 0, transform: 'translate(35%, 35%)'
							     }}
							>
								{cartQuantity}
								{/*динамически cart quantity*/}
							</div>
							)}
						</Button>
					</div>
					
			</Container>
		</NavbarBs>
	);
};

export default Navbar;