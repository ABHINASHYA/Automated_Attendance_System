import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import About from './Components/About'
import Contect from './Components/Contect'
import Register from './Components/Register'
import Login from './Components/Login'
import AttendancePage from './Components/AttendancePage'
import React from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contect />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AttendancePage" element={<AttendancePage />} />
      </Routes>
    </Router>
  )
}

export default App
