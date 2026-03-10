import {Button, Image, Offcanvas} from "react-bootstrap";


import CartItem from "./CartItem.tsx";
import storeItems from "../data/items.json";
import {useShoppingCart} from "../hooks/useShoppingCart.ts";


export default function Cart() {
  const {isCartOpen, closeCart, cartItems, cartQuantity} = useShoppingCart()
 
  const totalPrice = cartItems.reduce((acc, cartItem) => {
    const item = storeItems.find(i => i.id === cartItem.id)
    return acc + (item?.price || 0) * cartItem.quantity
  }, 0)
  
 console.log('cartItems', cartItems)
  return (
  <>

    <Offcanvas
      show={isCartOpen}
      onHide={closeCart}
      placement='end'
      style={{width: "60%", padding: "40px"}}
    >

      <Offcanvas.Header closeButton >
        
          <Image style={{boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)'}} className='me-5 rounded-5' src='/images/logo.jpg' alt="logo" width={100} />
    
        { !cartQuantity
          ? <Offcanvas.Title className='ms-5 fw-bolder p-4 rounded-2 text-bg-warning'>Please, add some items to the cart</Offcanvas.Title>
          : (<Offcanvas.Title className='fw-bolder p-3 rounded-2 text-bg-warning'>Total: {cartQuantity} items in my cart:</Offcanvas.Title>)
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
      {cartQuantity !==0 && (<>
      <div style={{justifyContent: "space-between", display: "flex", padding: "10px", marginBottom: "10px"}}>
        <span className='fw-bolder p-3 rounded-2 text-bg-warning'> Total price: </span>
        <span className='fw-bolder p-3 rounded-2 text-bg-secondary'>${totalPrice}</span>
      </div>
        <Button variant='success'>Checkout</Button>
        </>
        )}
    </Offcanvas>
    
  </>
)
}
