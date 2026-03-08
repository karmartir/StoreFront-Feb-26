import {Button, Offcanvas} from "react-bootstrap";
import {useShoppingCart} from "../context/ShoppingCartContext.tsx";

import CartItem from "./CartItem.tsx";
import storeItems from "../data/items.json";


export default function Cart() {
  const {isCartOpen, closeCart, cartItems, cartQuantity} = useShoppingCart()
 
  const totalPrice = cartItems.reduce((acc, cartItem) => {
    const item = storeItems.find(i => i.id === cartItem.id)
    return acc + (item?.price || 0) * cartItem.quantity
  }, 0)
  return (
  <>

    <Offcanvas
      show={isCartOpen}
      onHide={closeCart}
      placement='end'
      style={{width: "60%", padding: "60px"}}
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
      <div style={{justifyContent: "space-between", display: "flex", padding: "10px", marginBottom: "10px"}}>
        {/*//todo total price*/}
        
        <span className='fw-bolder p-3 rounded-2 text-bg-warning'> Total price: </span>
        <span className='fw-bolder p-3 rounded-2 text-bg-secondary'>${totalPrice}</span>
      </div>
        <Button variant='success'>Checkout</Button>
    </Offcanvas>
    
  </>
)
}
