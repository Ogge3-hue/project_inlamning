import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext.jsx'
import '../Komponenter/HomeSidan/Home.css'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { cartItems, addToCart, removeFromCart, deleteFromCart } = useCart()

  useEffect(() => {
    const fetchRandom = async () => { //fetchar producter och randomiserar 6 stcken
      try {
        const req = await fetch('https://dummyjson.com/products?limit=100')
        if (!req.ok) throw new Error('Something went wrong...')
        const data = await req.json()
        const shuffled = data.products.sort(() => Math.random() - 0.5)
        setProducts(shuffled.slice(0, 6))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRandom()
  }, [])

  return ( // setup för korten och struktur på hemsidan
    <div className="homePage"> 
      <div className="homeContainer">
        <div className="homeHero">
          <h1>Welcome to ItemParadise</h1>
          <p>Here are 6 random products picked just for you</p>
        </div>

        {loading && <p className="homeStatus">Loading products...</p>}
        {error && <div className="homeError">⚠ {error}</div>}

        {products.length > 0 && (
          <div className="homeGrid">
            {products.map(item => (
              <div key={item.id} className="homeCard">
                <div className="homeImgWrapper">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="homeImg"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                </div>
                <div className="homeCardBody">
                  <span className="homeCategory">{item.category}</span>
                  <h3 className="homeTitle">{item.title}</h3>
                  <p className="homeDesc">{item.description}</p>
                  <div className="homeFooter">
                    <span className="homePrice">${item.price}</span>
                    <span className="homeRating">★ {item.rating?.toFixed(1)}</span>
                  </div>
                  <div className="homeCartControls">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="homeCartBtn"
                      disabled={!cartItems.find(c => c.id === item.id)}
                    >
                      -
                    </button>
                    <span className="homeQty">
                      {cartItems.find(c => c.id === item.id)?.quantity || 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(item)}
                      className="homeCartBtn"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteFromCart(item.id)}
                      className="homeRemoveBtn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
