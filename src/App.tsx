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

function App() {
	
	
	return (
		//провайдер контекста
		<>
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
		
		</>
	)
}

export default App

