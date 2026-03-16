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
import { cartLogo } from "./cartLogo.tsx";
import { FaSearch } from "react-icons/fa";
import { useShoppingCart } from "../hooks/useShoppingCart.ts";

const Navbar = () => {
	const { openCart, cartQuantity, openSearchComponent, searchItemText, setSearchItemText, darkMode, toggleDarkMode, setCurrency } = useShoppingCart()
	
	return (
		<NavbarBs sticky='top' expand="lg" className="shadow-sm mb-5" data-bs-theme={darkMode ? "dark" : "light"}>
			<Container style={{ maxWidth: '1100px' }}>
				<NavbarBrand>
					<NavLink to='/'>
						<Image style={{ boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)' }} className='me-5 rounded-5' src='/images/logo.jpg' alt="logo" width={100} />
					</NavLink>
					
				</NavbarBrand>
				
				<NavbarToggle aria-controls="basic-navbar-nav" />
				<NavbarCollapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={NavLink} to="/store">Store</Nav.Link>
						<Nav.Link as={NavLink} to="/">Home</Nav.Link>
						<Nav.Link as={NavLink} to="/gallery">Gallery</Nav.Link>
						<Nav.Link as={NavLink} to="/about-us">About us</Nav.Link>
					</Nav>
				</NavbarCollapse>
				
				{/* search input */}
				{searchItemText && (
					<div className="d-flex me-2">
						<Form className="d-lg-flex d-sm-none">
							<input
								value={searchItemText}
								onChange={(e) => setSearchItemText(e.target.value)}
								className="form-control me-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
						</Form>
					</div>
				)}
				
				{/* search button */}
				<div
					className='d-none d-lg-flex rounded-circle position-relative'
					style={{ width: '3rem', height: '3rem', background: !searchItemText ? 'lightgray' : 'teal', borderRadius: '50%', justifyContent: 'center', alignItems: 'center', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.4)', cursor: 'pointer' }}
					onClick={() => openSearchComponent()}
				>
					<FaSearch size={20} color='white' />
				</div>
				
				{/* dark mode toggle */}
				<Button
					onClick={toggleDarkMode}
					className='rounded-circle ms-3 d-none d-lg-flex align-items-center justify-content-center'
					style={{ width: '3rem', height: '3rem', border: 'none', background: darkMode ? '#f0c040' : '#333', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.4)', fontSize: '18px' }}
				>
					{darkMode ? "☀️" : "🌙"}
				</Button>
				<select
					className='ms-3 d-none d-lg-flex align-items-center justify-content-center'
					style={{
						width: '3rem',
						height: '3rem',
						borderRadius: '50%',
						border: 'none',
						backgroundImage: "none",
						boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.4)',
						color: darkMode ? 'white' : 'black',
						fontSize: '1rem',
						cursor: 'pointer',
						textAlignLast: 'center',
						padding: 0,
						appearance: 'none',
						WebkitAppearance: 'none',
						MozAppearance: 'none',
					
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center right 0.5rem',
						backgroundSize: '0.65rem auto',
					}}
					onChange={(e) => setCurrency(e.target.value)}
					defaultValue="USD"
				>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
					<option value="JPY">JPY</option>
					<option value="GBP">GBP</option>
					<option value="CAD">CAD</option>
				</select>
				{/* cart button */}
				<div className="d-none d-lg-block">
					<Button
						onClick={openCart}
						className='rounded-circle ms-3 position-relative'
						style={{ width: '3rem', height: '3rem', background: cartQuantity ? "black" : "lightgray", border: 'none', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.4)' }}
					>
						<span style={{ color: 'white' }}>{cartLogo}</span>
						{cartQuantity > 0 && (
							<div className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
							     style={{ color: "white", width: '1.5rem', height: '1.5rem', position: 'absolute', bottom: 0, right: 0, transform: 'translate(35%, 35%)' }}
							>
								{cartQuantity}
							</div>
						)}
					</Button>
				</div>
			
			
			</Container>
		</NavbarBs>
	);
};

export default Navbar;