import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Pages/Hero'
import About from './Pages/About'
import Contect from './Pages/Contect'
import Register from './Pages/Register'
import Login from './Pages/Login'
import AttendancePage from './Pages/AttendancePage'
import AddStudent from './Pages/AddStudent'
import React from 'react'


function App() {

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
        <Route path="/AddStudent" element={<AddStudent />} />
      </Routes>
    </Router>
  )
}

export default App
