import { useCart } from '../context/CartContext.jsx'

export default function Checkout() {
  const { cartItems, removeFromCart, deleteFromCart, totalCount } = useCart()

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Your cart is empty</h2>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem' }}>
      <h2>Checkout</h2>
      {cartItems.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '0.75rem 0' }}>
          <div>
            <strong>{item.title}</strong>
            <div>${item.price} × {item.quantity}</div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button onClick={() => removeFromCart(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => deleteFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>
        Total: {totalCount} items — ${totalPrice.toFixed(2)}
      </div>
    </div>
  )
}
