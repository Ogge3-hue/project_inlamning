import { useState } from "react"
import { Navbar, Container, Nav, Button } from "react-bootstrap"// Navbar, Container, Nav och Button är färdiga Bootstrap-komponenter för navigering
import { NavLink } from "react-router-dom" // NavLink från react-router-dom skapar navigeringslänkar utan att ladda om sidan
import { useCart } from "../../context/CartContext.jsx" // Hämtar kundvagnsfunktioner och data från den globala CartContext
import "./Hero.css"


export default function Hero() {
    const [showCart, setShowCart] = useState(false)// showCart styr om kundvagnspanelen är öppen eller stängd

    const { cartItems, totalCount, addToCart, removeFromCart, deleteFromCart } = useCart()

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)  // Räknar ut totalpriset genom att summera pris × antal för varje artikel

    return (
        // sticky="top" gör att navbaren följer med när man scrollar
        <Navbar sticky="top" bg="light" expand="lg" className="shadow-lg mb-3">
            <Container>
                {/* Navigationslänkar till sidans olika sidor */}
                <Nav className="me-auto">
                    <Nav.Link to="/" as={NavLink}>
                        Home
                    </Nav.Link>
                    <Nav.Link to="/about" as={NavLink}>
                        About Us
                    </Nav.Link>
                    <Nav.Link to="/contact" as={NavLink}>
                        Contact
                    </Nav.Link>
                    <Nav.Link to="/store" as={NavLink}>
                        Store
                    </Nav.Link>
                </Nav>

                {/* Kundvagnsknapp – togglar panelen öppen/stängd vid klick */}
                <Button
                    className="cartButton"
                    variant="outline-primary"
                    onClick={() => setShowCart(prev => !prev)}
                >
                    {/* SVG-ikon för kundvagn */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1.5 6A.5.5 0 0 1 13 10H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zm3.14 9a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm7-2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm0 2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z" />
                    </svg>
                    {/* Röd badge som visar totalt antal artiklar i kundvagnen */}
                    <div className="cartBadge rounded-circle bg-danger d-flex justify-content-center align-items-center">
                        {totalCount}
                    </div>
                </Button>

                {showCart && (
                    <div className="cartPanel">
                        <div className="cartHeader">
                            <h5 className="cartTitle">Cart</h5>
                            <button type="button" className="closePanel" onClick={() => setShowCart(false)}>
                                ×
                            </button>
                        </div>

                        {/* Om kundvagnen är tom visas ett meddelande, annars visas artikellistan */}
                        {cartItems.length === 0 ? (
                            <p className="emptyText">Your cart is empty</p>
                        ) : (
                            <>
                                {/* Loopar igenom och visar varje artikel i kundvagnen */}
                                <div className="cartList">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="cartRow">
                                            {/* Produktbild och textinfo */}
                                            <div className="cartItemInfo">
                                                {item.images?.[0] && (
                                                    <img src={item.images[0]} alt={item.title} className="cartItemImage" />
                                                )}
                                                <div>
                                                    <div className="cartItemTitle">{item.title}</div>
                                                    {/* Visar antal, styckpris och radsumma */}
                                                    <div className="cartItemMeta">
                                                        {item.quantity} × ${item.price.toFixed(2)} = ${(item.price * item.quantity).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Knappar för att öka, minska eller ta bort artikeln */}
                                            <div className="cartRowButtons">
                                                <button type="button" className="cartSmallBtn" onClick={() => removeFromCart(item.id)}>-</button>
                                                <button type="button" className="cartSmallBtn" onClick={() => addToCart(item)}>+</button>
                                                <button type="button" className="deleteBtn" onClick={() => deleteFromCart(item.id)}>Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Totalrad längst ner i panelen */}
                                <div className="cartTotalRow">
                                    <span className="totalLabel">Totalt:</span>
                                    <span className="totalValue">${totalPrice.toFixed(2)}</span>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </Container>
        </Navbar>
    )
}
