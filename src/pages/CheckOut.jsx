import { useCart } from '../context/CartContext.jsx'
import '../pages/CheckOut.css'

export default function Checkout() {
  const { cartItems, addToCart, removeFromCart, deleteFromCart, totalCount } = useCart()

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Tidig return — visar ett tomt-meddelande istället för en tom checkout-sida
  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cartItems.map(item => (
        <div key={item.id} className="checkout-item">
          <div><strong>{item.title}</strong><div>
          ${item.price} × {item.quantity}
        </div>
    </div>
          <div className="checkout-item-controls">
            <button className="miBtn" onClick={() => removeFromCart(item.id)}>-</button>
            <button className="addBtn" onClick={() => addToCart(item)}>+</button>
            <span>{item.quantity}</span>
            <button className="RemoveBtn" onClick={() => deleteFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="checkout-total">
        Total: {totalCount} items — ${totalPrice.toFixed(2)}
      </div>
    </div>
  )
}
