import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import {Navbar} from './components'
import Routes from './routes'
import Footer from './components/Footer'

const App = () => {
  const cart =
    localStorage.getItem('cart') ||
    JSON.stringify({
      plants: [],
      status: 'In Cart'
    })
  localStorage.setItem('cart', cart)
  return (
    <div>
      <Navbar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
