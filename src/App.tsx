import './App.css'
import Navbar from "./components/Navbar.tsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from "react-bootstrap";

import Gallery from "./pages/Gallery.tsx";
import Store from "./pages/Store.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import {SearchComponent} from "./components/SearchComponent.tsx";
import Cart from "./components/Cart.tsx";
import {ClickedItemPage} from "./components/ClickedItemPage.tsx";
import {useShoppingCart} from "./hooks/useShoppingCart.ts";

function App() {
	
	const {darkMode} = useShoppingCart()
	return (
		//провайдер контекста
		<div data-bs-theme={darkMode ? 'dark' : 'light'} className="bg-body" style={{minHeight: '100vh'}}>
			<Navbar/>
			<Container>
				
				<Routes>
					<Route path='/' element={<Home/>}/>
					<Route path='store' element={<Store/>}/>
					<Route path='gallery' element={<Gallery/>}/>
					<Route path='about-us' element={<AboutUs/>}/>
					<Route path="clickedItem/:id" element={<ClickedItemPage/>}/>
				</Routes>
				{/* Cart and SearchComponent rendered here */}
				<Cart/>
				<SearchComponent/>
			
			</Container>
		
		</div>
	)
}

export default App

