import { useState } from "react"
import { Navbar, Container, Nav, Button } from "react-bootstrap" /*Container för hjälp av layout och omslutning, 
nav är komponent-biblotek för navigeringsmenyer */
import { NavLink } from "react-router-dom"
import { useCart } from "../context/CartContext.jsx"

export default function Hero() {
    const [showCart, setShowCart] = useState(false)
    const { cartItems, totalCount, addToCart, removeFromCart, deleteFromCart } = useCart()
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return ( /*Hero sectionen, navigeringen med hjälp av react-router-dom och bootstrap */
        <Navbar sticky="top" bg="light" expand="lg" className="shadow-lg mb-3"> 
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to="/" as={NavLink}/*Navlinks för hemsidan med hjälp av react-router-dom, det är en länk-komponent */
                    >
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
                <Button
                    style={{ width: "3rem", height: "3rem", position: "relative" }}
                    /*Shopping cart knappen och styling */
                    variant="outline-primary"
                    onClick={() => setShowCart(prev => !prev)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16"> 
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1.5 6A.5.5 0 0 1 13 10H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zm3.14 9a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm7-2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm0 2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z" />
                    </svg>
                    <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" /* Röda countern i shopping carten och styling  */
                        style={{ 
                            width: "1.5rem", 
                            height: "1.5rem", 
                            position: "absolute", 
                            top: "-0.5rem", 
                            right: "-0.5rem", 
                            color: "white" }}>
                        {totalCount}
                    </div>
                </Button>
                {showCart && (
                    <div style={styles.cartPanel}>
                        <div style={styles.cartHeader}>
                            <h5 style={styles.cartTitle}>Varukorg</h5>
                            <button type="button" style={styles.closePanel} onClick={() => setShowCart(false)}>
                                ×
                            </button>
                        </div>
                        {cartItems.length === 0 ? (
                            <p style={styles.emptyText}>Din varukorg är tom.</p>
                        ) : (
                            <>
                                <div style={styles.cartList}>
                                    {cartItems.map(item => (
                                        <div key={item.id} style={styles.cartRow}>
                                            <div style={styles.cartItemInfo}>
                                                {item.images?.[0] && (
                                                    <img src={item.images[0]} alt={item.title} style={styles.cartItemImage} />
                                                )}
                                                <div>
                                                    <div style={styles.cartItemTitle}>{item.title}</div>
                                                    <div style={styles.cartItemMeta}>
                                                        {item.quantity} × ${item.price.toFixed(2)} = ${(item.price * item.quantity).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={styles.cartRowButtons}>
                                                <button type="button" style={styles.cartSmallBtn} onClick={() => removeFromCart(item.id)}>-</button>
                                                <button type="button" style={styles.cartSmallBtn} onClick={() => addToCart(item)}>+</button>
                                                <button type="button" style={styles.deleteBtn} onClick={() => deleteFromCart(item.id)}>Ta bort</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={styles.cartTotalRow}>
                                    <span style={styles.totalLabel}>Totalt:</span>
                                    <span style={styles.totalValue}>${totalPrice.toFixed(2)}</span>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </Container>
        </Navbar>
    )
}

const styles = {
    cartPanel: {
        position: "absolute",
        top: "70px",
        right: "1rem",
        width: "320px",
        maxHeight: "70vh",
        overflowY: "auto",
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: "14px",
        boxShadow: "0 18px 48px rgba(0,0,0,0.18)",
        padding: "1rem",
        zIndex: 1050,
    },
    cartHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.75rem",
    },
    cartTitle: {
        margin: 0,
        fontSize: "1rem",
        fontWeight: 700,
    },
    closePanel: {
        border: "none",
        background: "transparent",
        fontSize: "1.25rem",
        lineHeight: 1,
        cursor: "pointer",
        color: "#333",
    },
    emptyText: {
        margin: 0,
        color: "#666",
        fontSize: "0.95rem",
    },
    cartList: {
        display: "grid",
        gap: "0.75rem",
        marginBottom: "1rem",
    },
    cartRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "0.75rem",
        padding: "0.75rem",
        borderRadius: "12px",
        background: "#f8f8f8",
    },
    cartItemInfo: {
        display: "flex",
        gap: "0.75rem",
        alignItems: "center",
        minWidth: 0,
    },
    cartItemImage: {
        width: "50px",
        height: "50px",
        objectFit: "cover",
        borderRadius: "10px",
        flexShrink: 0,
        background: "#fff",
        border: "1px solid #ddd",
    },
    cartItemTitle: {
        fontSize: "0.95rem",
        fontWeight: 600,
        marginBottom: "0.25rem",
    },
    cartItemMeta: {
        fontSize: "0.85rem",
        color: "#555",
    },
    cartRowButtons: {
        display: "grid",
        gap: "0.35rem",
        alignItems: "stretch",
    },
    cartSmallBtn: {
        width: "2rem",
        height: "2rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        background: "#fff",
        cursor: "pointer",
        fontWeight: 700,
    },
    deleteBtn: {
        padding: "0.45rem 0.65rem",
        borderRadius: "10px",
        border: "1px solid #f44336",
        background: "#f44336",
        color: "#fff",
        cursor: "pointer",
        fontSize: "0.82rem",
    },
    cartTotalRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "0.75rem",
        borderTop: "1px solid #e0e0e0",
    },
    totalLabel: {
        fontWeight: 700,
        color: "#222",
    },
    totalValue: {
        fontWeight: 700,
        color: "#222",
    },
}
