import { Navbar, Container, Nav, Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export default function Hero() {
    return (
        <Navbar bg="light" expand="lg" className="shadow-lg mb-3">
            <Container>
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
                <Button style={{ width: "3rem", height: "3rem" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1.5 6A.5.5 0 0 1 13 10H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zm3.14 9a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm7-2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm0 2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z" />
                    </svg>
                </Button>
            </Container>
        </Navbar>
    )
}