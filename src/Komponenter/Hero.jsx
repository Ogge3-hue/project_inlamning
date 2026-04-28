import React from "react";
import { NavLink } from "react-router-dom";

export default function Hero() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/Veiws/About.jsx">About</NavLink>
                    <NavLink to="/Veiws/Contact.jsx">Contact</NavLink>
                    <NavLink to="/Veiws/Products.jsx">Products</NavLink>
                    <NavLink to="/Veiws/Checkout.jsx">Checkout</NavLink>
                </li>
            </ul>
        </nav>
    )
}