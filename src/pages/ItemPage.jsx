import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import '../pages/ItemPage.css'

export default function ItemPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { cartItems, addToCart, removeFromCart, deleteFromCart } = useCart()

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then(data => setProduct(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="itemPage-loading">Loading...</p>
  if (error) return <p className="itemPage-error">{error}</p>
  if (!product) return null

  const cartItem = cartItems.find(item => item.id === product.id)
  const qty = cartItem?.quantity || 0

  return (
    <div className="itemPage">
      <img src={product.images?.[0]} alt={product.title} className="itemPage-img" />
      <span className="itemPage-category">{product.category}</span>
      <h2>{product.title}</h2>
      <p className="itemPage-description">{product.description}</p>
      <div className="itemPage-priceRow">
        <strong className="itemPage-price">${product.price}</strong>
        <span className="itemPage-rating">★ {product.rating?.toFixed(1)}</span>
      </div>

      <div className="cartControls">
        <button type="button" className="cartBtn" onClick={() => removeFromCart(product.id)} disabled={qty === 0}>-</button>
        <span className="qty">{qty}</span>
        <button type="button" className="cartBtn" onClick={() => addToCart(product)}>+</button>
        <button type="button" className="removeBtn" onClick={() => deleteFromCart(product.id)}>Remove</button>
      </div>
    </div>
  )
}
