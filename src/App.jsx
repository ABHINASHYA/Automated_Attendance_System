import { useState } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import React from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <Hero />
    </>
  )
}

export default App
