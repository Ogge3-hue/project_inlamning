import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext.jsx'

const SearchUI = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const { cartItems, addToCart, removeFromCart, deleteFromCart } = useCart()
  const cartTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearchTermChange = e => {
    const nextValue = e.target.value
    setSearchTerm(nextValue)

    if (!nextValue.trim()) {
      setProducts([])
      setHasSearched(false)
      setError(null)
    }
  }

  useEffect(() => {
    if (!searchTerm.trim()) {
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const req = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
        if (!req.ok) throw new Error('Något gick fel vid hämtning')
        const data = await req.json()
        setProducts(data.products)
        setHasSearched(true)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchTerm])

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Search for products in store</h1>
        <p style={styles.sub}>Search among all our products</p>
        {cartTotal > 0 && <p style={styles.cartStatus}>Det finns {cartTotal} artiklar i varukorgen just nu.</p>}

        <div style={styles.inputWrapper}>
          <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchTermChange}
            style={styles.input}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} style={styles.clearBtn}>✕</button>
          )}
        </div>

        {loading && (
          <div style={styles.statusRow}>
            <span style={styles.statusText}>Searching...</span>
          </div>
        )}

        {error && (
          <div style={styles.errorBox}>⚠ {error}</div>
        )}

        {!loading && hasSearched && products.length === 0 && (
          <p style={styles.statusText}>Inga produkter hittades för "{searchTerm}"</p>
        )}

        {products.length > 0 && (
          <>
            <p style={styles.resultCount}>{products.length} resultat</p>
            <div style={styles.grid}>
              {products.map(item => (
                <div key={item.id} style={styles.card}>
                  <div style={styles.imgWrapper}>
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      style={styles.img}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  </div>
                  <div style={styles.cardBody}>
                    <span style={styles.category}>{item.category}</span>
                    <h3 style={styles.title}>{item.title}</h3>
                    <p style={styles.desc}>{item.description}</p>
                    <div style={styles.footer}>
                      <span style={styles.price}>${item.price}</span>
                      <span style={styles.rating}>★ {item.rating?.toFixed(1)}</span>
                    </div>
                    <div style={styles.cartControls}>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        style={styles.cartBtn}
                        disabled={!cartItems.find(cartItem => cartItem.id === item.id)}
                      >
                        -
                      </button>
                      <span style={styles.qty}>
                        {cartItems.find(cartItem => cartItem.id === item.id)?.quantity || 0}
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        style={styles.cartBtn}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteFromCart(item.id)}
                        style={styles.removeBtn}
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}



const styles = {
  page: {
    minHeight: '100vh',
    background: '#f8f7f4',
    padding: '2rem 1rem',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  container: { maxWidth: '900px', margin: '0 auto',shadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '2rem', background: '#c0bfbf', borderRadius: '14px' },
  heading: { fontSize: '2rem', fontWeight: 700, margin: '0 0 4px', color: '#1a1a1a' },
  sub: { fontSize: '0.95rem', color: '#888', margin: '0 0 1.5rem' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '1.5rem' },
  icon: { position: 'absolute', left: '14px', width: '18px', height: '18px', color: '#aaa', pointerEvents: 'none' },
  input: {
    width: '100%', padding: '12px 44px', fontSize: '1rem',
    border: '1.5px solid #e0e0e0', borderRadius: '12px', outline: 'none',
    background: '#fff', color: '#1a1a1a', boxSizing: 'border-box',
  },
  clearBtn: { position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: '#aaa', padding: '4px' },
  statusRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' },
  statusText: { color: '#888', fontSize: '0.9rem' },
  errorBox: { background: '#fff0f0', border: '1px solid #fcc', color: '#c00', padding: '12px 16px', borderRadius: '10px', fontSize: '0.9rem', marginBottom: '1rem' },
  resultCount: { fontSize: '0.85rem', color: '#999', margin: '0 0 1rem' },
  cartStatus: { fontSize: '0.95rem', color: '#333', margin: '0 0 1rem', fontWeight: 600 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' },
  card: { background: '#fff', border: '1px solid #ebebeb', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  imgWrapper: { height: '180px', background: '#f5f5f5', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  img: { width: '60%', height: '100%', objectFit: 'cover' },
  cardBody: { padding: '14px', display: 'flex', flexDirection: 'column', flex: 1 },
  category: { fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#aaa', marginBottom: '4px', display: 'block' },
  title: { fontSize: '0.95rem', fontWeight: 600, margin: '0 0 6px', color: '#1a1a1a', lineHeight: 1.3 },
  desc: { fontSize: '0.82rem', color: '#888', lineHeight: 1.5, margin: '0 0 12px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cartControls: { display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' },
  cartBtn: { width: '2.4rem', height: '2.4rem', borderRadius: '10px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', fontSize: '1rem', fontWeight: 700 },
  qty: { minWidth: '2rem', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontWeight: 700, color: '#333' },
  removeBtn: { padding: '0.55rem 0.9rem', borderRadius: '10px', border: '1px solid #ff5b5b', background: '#ff5b5b', color: '#fff', cursor: 'pointer' },
  price: { fontWeight: 700, fontSize: '1rem', color: '#1a1a1a' },
  rating: { fontSize: '0.82rem', color: '#e6a817', fontWeight: 500 },
}

export default SearchUI