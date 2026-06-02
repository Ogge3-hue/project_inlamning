import { useState, useEffect } from 'react' // useState hanterar lokal state, useEffect kör kod när något förändras
import { useCart } from '../context/CartContext.jsx'// Hämtar kundvagnsfunktioner från den globala CartContext
import '../Komponenter/StoreSidan/Store.css'



const SearchUI = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false) // loading är true medan vi väntar på svar från API:et
  const [error, setError] = useState(null) // error lagrar eventuellt felmeddelande om något går snett
  const [hasSearched, setHasSearched] = useState(false)  // hasSearched blir true när en sökning har genomförts, används för att visa "inga resultat"

  const { cartItems, addToCart, removeFromCart, deleteFromCart } = useCart()// Plockar ut funktioner och data från kundvagnskontexten
  
  const cartTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Körs varje gång användaren skriver i sökfältet
  const handleSearchTermChange = e => {
    const nextValue = e.target.value
    setSearchTerm(nextValue)

    // Om fältet töms, återställ produktlistan och söksläget
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
        // Hämtar produkter från DummyJSON baserat på söktermen
        const req = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
        if (!req.ok) throw new Error('Something went wrong...')
        const data = await req.json()
        setProducts(data.products)
        setHasSearched(true)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }, 1000)// Väntar 1 sekund efter att användaren slutat skriva innan API-anropet skickas

    return () => clearTimeout(timer)
  }, [searchTerm])

  return (
    <div className="page">
      <div className="container">
        <h1 className="heading">Search for products in store</h1>
        <p className="sub">Search among all our products</p>

        {/* Visar antal artiklar i kundvagnen om den inte är tom */}
        {cartTotal > 0 && <p className="cartStatus">There is {cartTotal} articles in the cart now. </p>}

        
        <div className="inputWrapper">
          {/* SVG-ikon för förstoringsglas, enbart dekorativ */}
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="input"
          />
          {/* Remove-knapp visas bara om det finns text i fältet */}
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="clearBtn">✕</button>
          )}
        </div>

        {/* Laddningsindikator visas medan API-anropet pågår */}
        {loading && (
          <div className="statusRow">
            <span className="statusText">Searching...</span>
          </div>
        )}

        {/* Felmeddelande visas om något gick snett med hämtningen */}
        {error && (
          <div className="errorBox">⚠ {error}</div>
        )}

        {/* Visas om sökningen är klar men inga produkter hittades */}
        {!loading && hasSearched && products.length === 0 && (
          <p className="statusText">Nothing found "{searchTerm}"</p>
        )}

        {/* Produktgrid visas när det finns resultat */}
        {products.length > 0 && (
          <>
            <p className="resultCount">{products.length} Results</p>
            <div className="grid">
              {/* Loopar igenom varje produkt och skapar ett kort */}
              {products.map(item => (
                <div key={item.id} className="card">
                  {/* Produktbild – döljs om bilden inte kan laddas */}
                  <div className="imgWrapper">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="img"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  </div>
                  <div className="cardBody">
                    <span className="category">{item.category}</span>
                    <h3 className="title">{item.title}</h3>
                    <p className="desc">{item.description}</p>
                    {/* Pris och betyg i rad */}
                    <div className="footer">
                      <span className="price">${item.price}</span>
                      <span className="rating">★ {item.rating?.toFixed(1)}</span>
                    </div>
                    {/* Knappar för att justera antal i kundvagnen */}
                    <div className="cartControls">
                      {/* Minus-knapp inaktiveras om produkten inte finns i kundvagnen */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="cartBtn"
                        disabled={!cartItems.find(cartItem => cartItem.id === item.id)}
                      >
                        -
                      </button>
                      {/* Visar nuvarande antal av produkten i kundvagnen */}
                      <span className="qty">
                        {cartItems.find(cartItem => cartItem.id === item.id)?.quantity || 0}
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="cartBtn"
                      >
                        +
                      </button>
                      {/* Ta bort-knapp tar helt bort produkten ur kundvagnen */}
                      <button
                        type="button"
                        onClick={() => deleteFromCart(item.id)}
                        className="removeBtn"
                      >
                        Remove
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


export default SearchUI
