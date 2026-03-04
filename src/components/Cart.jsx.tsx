type CartProps = {
  isCartOpen: boolean;
};
export default function Cart({ isCartOpen }: CartProps) {
  return <>{isCartOpen && <div>Cart</div>}</>;
}
