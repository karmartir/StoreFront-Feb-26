import {Offcanvas} from "react-bootstrap";
import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
import CartItem from "./CartItem.tsx";


export default function Cart() {
  const {isCartOpen, closeCart, cartItems, cartQuantity} = useShoppingCart()
 
  return (
  <>

    <Offcanvas
      show={isCartOpen}
      onHide={closeCart}
      placement='end'
      style={{width: "60%"}}
    >
      <Offcanvas.Header closeButton>
        { !cartQuantity
          ? <Offcanvas.Title>Please, add some items to cart</Offcanvas.Title>
          : (<Offcanvas.Title> My cart:</Offcanvas.Title>)
        }
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            {...item}
          />
        ))}
      </Offcanvas.Body>
      <div>
        {/*//todo total price*/}
        
      </div>
    </Offcanvas>
    
  </>
)
}
