import { createContext, useContext, useEffect, useMemo, useState } from 'react' // UseMemo cachelagrar ett beräknat värde så att det inte räknas om i onödan vid varje render

// Skapar en React Context för att lagra och dela varukorgdata mellan komponenter
const CartContext = createContext(null)

export function CartProvider({ children }) {
  // State som håller reda på alla produkter i varukorgen
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart') // Local storage
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Funktion för att lägga till en produkt i varukorgen
  // Om produkten redan finns, ökas kvantiteten med 1
  // Om produkten är ny, läggs den till med kvantitet 1
  const addToCart = product => {
    setCartItems(prev => {
      // Söker efter produkten i den befintliga varukorgen
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        // Om produkten redan finns, uppdatera kvantiteten
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      // Om det är en ny produkt, lägg den till med kvantitet 1
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Funktion för att minska kvantiteten av en produkt i varukorgen med 1
  // Om kvantiteten blir 0, tas produkten bort helt från varukorgen
  const removeFromCart = productId => {
    setCartItems(prev =>
      prev
        // Minska kvantiteten för den valda produkten
        .map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        // Ta bort produkter som har 0 kvantitet
        .filter(item => item.quantity > 0),
    )
  }

  // Funktion för att ta bort en produkt helt från varukorgen oavsett kvantitet
  const deleteFromCart = productId => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  // Beräknar det totala antalet produkter i varukorgen
  // useMemo optimerar beräkningen så den bara körs när cartItems ändras
  const totalCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  // Returnerar CartContext.Provider som gör varukorgdata tillgänglig för alla child-komponenter
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, deleteFromCart, totalCount }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook för att få tillgång till varukorgdata från vilken komponent som helst
// Kaster ett error om den används utan CartProvider
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart måste användas inom en CartProvider')
  }
  return context
}
