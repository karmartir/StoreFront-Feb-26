import {Offcanvas} from "react-bootstrap";
import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
import CartItem from "./CartItem.tsx";


export default function Cart() {
  const {isCartOpen, closeCart, cartItems} = useShoppingCart()
  return (
<>
    <Offcanvas
      show={isCartOpen}
      onHide={closeCart}
      placement='end'
      style={{width: "80%"}}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title> My cart:</Offcanvas.Title>
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
        //todo total price
      </div>
    </Offcanvas>
  </>)
}
