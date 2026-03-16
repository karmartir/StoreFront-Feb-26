import {useShoppingCart} from "../hooks/useShoppingCart.ts";


const Home = () => {
	const {darkMode} = useShoppingCart()
	const textColor = darkMode ? "white" : "black";
	return (
		<div className="container">
			<h1 className="text-center" style={{color: textColor}}>Welcome to our store</h1>
			<p style={{color: textColor}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nibh sit amet dignissim lacinia, nulla nisl rhoncus nibh, eu euismod mi nibh vel odio. Sed eu nisl nisl.
				Nulla ultricies nisl ut tincidunt scelerisque. Sed mattis, nibh vitae dictum malesuada, ex velit blandit nunc, id sagittis velit nunc vel nunc.
				Sed euismod, nibh sit amet dignissim lacinia, nulla nisl rhoncus nibh, eu euismod mi nibh vel odio. Sed eu nisl nisl.
				Nulla ultricies nisl ut tincidunt scelerisque. Sed mattis, nibh vitae dictum malesuada, ex velit blandit nunc, id sagittis velit nunc vel nunc.
				Sed euismod, nibh sit amet dignissim lacinia, nulla nisl rhoncus nibh, eu euismod mi nibh vel odio. Sed eu nisl nisl.
				Nulla ultricies nisl ut tincidunt scelerisque. Sed mattis, nibh vitae dictum malesuada, ex velit blandit nunc, id sagittis velit nunc vel nunc.
			</p>
		</div>
	);
};
export default Home;