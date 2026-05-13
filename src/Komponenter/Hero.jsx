import { Navbar, Container, Nav, Button } from "react-bootstrap" /*Container för hjälp av layout och omslutning, 
nav är komponent-biblotek för navigeringsmenyer */
import { NavLink } from "react-router-dom"

export default function Hero() {
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
                <Button style={{ width: "3rem", height: "3rem", position: "relative" }}/*Shopping cart knappen och styling */
                variant="outline-primary">
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
                        0
                    </div>
                </Button>
            </Container>
        </Navbar>
    )
}