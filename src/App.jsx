import { useEffect } from "react"
import {Routes, Route} from "react-router-dom"
import { Container } from "react-bootstrap"

import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Store from "./pages/Store.jsx"
import Hero from "./Komponenter/Hero.jsx"


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
        </Routes>
      </Container>
    </>
  )
}

export default App
