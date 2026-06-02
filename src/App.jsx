import {Routes, Route} from "react-router-dom"
import { Container } from "react-bootstrap"

import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Store from "./pages/Store.jsx"
import Hero from "./Komponenter/HeroNav/Hero.jsx"
import Checkout from "./pages/CheckOut.jsx"
import ItemPage from "./pages/ItemPage.jsx"


function App() {
  return (
    <>
      <Hero />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/store" element={<Store/>} />
          <Route path="/item/:id" element={<ItemPage/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      </Container>
    </>
  )
}

export default App
