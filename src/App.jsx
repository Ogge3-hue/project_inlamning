import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
    </BrowserRouter>
  )
}
